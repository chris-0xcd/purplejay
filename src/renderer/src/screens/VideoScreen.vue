<script setup>
import { onMounted, onUnmounted, reactive, ref, shallowRef } from 'vue'
import { useRoute } from 'vue-router'
import { usePluginService } from '../plugins/pluginService'
import LiveChat from '../components/LiveChat.vue'
import { VideoPlayer } from '@videojs-player/vue'
import { useElementSize } from '@vueuse/core'

import VideoComments from '../components/VideoComments.vue'

const route = useRoute()
const ps = usePluginService()

const playerOuterWidth = ref('100%')
const playerOuterHeight = ref('100%')
const player = shallowRef()
const state = shallowRef()
const video = ref({
  videoUrl: ''
})
const sources = reactive([])
const videoLoading = false

const truncateComment = ref(true)
const videoColumn = ref(null)
const chatItems = ref([])

const html5 = {
  vhs: {
    overrideNative: true
  },
  nativeAudioTracks: false,
  nativeVideoTracks: false
}

async function loadInitial() {
  const videoDetails = await ps.getContentDetails(route.query.pluginId, route.query.url)
  video.value = videoDetails

  console.log(videoDetails)

  if (videoDetails.isLive) {
    sources.push([
      {
        src: videoDetails.live.url,
        type:
          videoDetails.live.plugin_type === 'HLSSource' // assumes live sources are either HLS or DASH
            ? 'application/x-mpegURL'
            : 'application/dash+xml'
      }
    ])

    await initializeChat()
  } else if (videoDetails.video.plugin_type === 'UnMuxVideoSourceDescriptor') {
    // for unmuxed video build a dash file as the video player doesn't otherwise support unmuxed sources
    const dataurl =
      'data:application/dash+xml;charset=utf-8;base64,' +
      btoa(await ps.getVideoDash(route.query.pluginId, videoDetails.id.value))
    sources.push([
      {
        src: dataurl,
        type: 'application/dash+xml'
      }
    ])
  } else {
    for (const videoSource of videoDetails.video.videoSources) {
      sources.push([
        {
          src: videoSource.url,
          type: videoSource.container
        }
      ])
    }
  }
}

async function initializeChat() {
  const live = await ps.getLiveEvents(route.query.pluginId, route.query.url)

  const updateChat = async () => {
    await live.nextPage()

    console.log(live.pager.results)
    if (live.pager.results.length) {
      for (const entry of live.pager.results) {
        if (entry.type === 1) { // handle chat messages, todo: handle other types
          entry.id = chatItems.value.length
          chatItems.value.push(entry)
        }
      }
    }
    if (live.hasMorePagers()) {
      setTimeout(updateChat, live.pager.nextRequest)
    }
  }

  if (live.hasMorePagers()) {
    setTimeout(updateChat, live.pager.nextRequest)
  }
}

function updatePlayerSize() {
  let aspect = 16 / 9;
  if (state.value?.videoWidth && state.value?.videoHeight) {
    aspect = state.value?.videoWidth / state.value?.videoHeight
  }
  let availableWidth = document.body.clientWidth

  console.log(availableWidth)
  console.log(document.body.scrollWidth)
  console.log('/...')
  if (video.value?.isLive) {
    availableWidth -= 400
  }
  console.log(availableWidth)
  const availableHeight = document.body.clientHeight - 230
  console.log(availableHeight)
  const calculatedHeight = availableWidth / aspect

  if (calculatedHeight > availableHeight) {
    playerOuterHeight.value = availableHeight + 'px'
  } else {
    playerOuterHeight.value = calculatedHeight + 'px'
  }
  playerOuterWidth.value = availableWidth + 'px'
}

function onWindowResize() {
  updatePlayerSize()
}

onMounted(async () => {
  window.addEventListener('resize', onWindowResize)
  updatePlayerSize()
  await loadInitial()
  updatePlayerSize()
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
})

function handleMounted(payload) {
  state.value = payload.state
  player.value = payload.player
}

// once metadata is loaded we should have the video size which is used to calculate the player size
function loadedmetadata() {
  updatePlayerSize()
}

function showFullDescription() {
  truncateComment.value = !truncateComment.value
}
</script>

<template>
  <v-container class="pa-0" :fluid="true">
    <v-row>
      <v-col cols="12">

        <v-skeleton-loader
          class="flex-column"
          type="card-avatar, article, actions"
          :loading="videoLoading"
          tile
          large
        >

          <div class="d-flex">
            <v-sheet :width="playerOuterWidth" :height="playerOuterHeight">
              <video-player
                class="video-player, vjs-big-play-centered"
                :html5="html5"
                :sources="sources"
                :fill="true"
                controls
                @mounted="handleMounted"
                @loadedmetadata="loadedmetadata"
              />
            </v-sheet>
            <LiveChat v-if="video?.isLive" width="400" :height="playerOuterHeight" :items="chatItems"></LiveChat>
          </div>

          <v-card class="w-100">
            <v-card-title class="pb-0">{{ video.name }}</v-card-title>
            <div id="btns" class="d-flex flex-wrap justify-space-between">
              <v-card-subtitle class="pt-0 pb-0 subtitle-1" style="line-height: 2.4em">
                {{ video.viewCount }} views
                <v-icon>mdi-circle-small</v-icon>
                {{ video.datetime }}
              </v-card-subtitle>
              <v-card-actions class="pt-0 pl-0 grey--text">
                <v-btn text="">
                  <v-icon class="pr-2">mdi-thumb-up</v-icon>
                  {{ video?.rating?.likes }}
                </v-btn>
                <v-btn v-if="video?.rating?.type === 2" text="">
                  <v-icon class="pr-2">mdi-thumb-down</v-icon>
                  {{ video?.rating?.dislikes }}
                </v-btn>
                <!--<v-btn text=""><v-icon>mdi-share</v-icon>Share</v-btn>-->
                <!--<v-btn text=""><v-icon>mdi-playlist-plus</v-icon>Save</v-btn>-->
              </v-card-actions>
            </div>
          </v-card>
          <v-container :fluid="true">
            <v-row>
              <v-col cols="6" sm="6" md="5" lg="5">
                <v-card class="transparent" flat>
                  <v-list-item
                    three-line
                    router
                    :to="{
                      path: '/channel',
                      query: { pluginId: route.query.pluginId, url: video.author?.url }
                    }"
                  >
                    <v-avatar size="50">
                      <v-img :src="video.author?.thumbnail"></v-img>
                    </v-avatar>
                    <v-list-item-title class="font-weight-medium mb-1">{{ video.author?.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ video.author?.subscribers }} subscribers</v-list-item-subtitle>
                  </v-list-item>
                </v-card>
              </v-col>
              <!--<v-col cols="6" sm="6" md="4" lg="4">
                <div class="d-flex justify-end align-center">
                  <v-btn class="red white--text mt-6" tile large depressed>Subscribed</v-btn>
                  <v-btn icon class="ml-5 mt-6">
                    <v-icon>mdi-bell</v-icon>
                  </v-btn>
                </div>
              </v-col>-->
              <v-col cols="12">
                <pre id="video-description" :class="{ 'video-description-open': !truncateComment }">{{
                    video.description
                  }}</pre>
                <v-btn text class="remove-hover-bg" @click="showFullDescription">{{
                    truncateComment ? 'Show More' : 'Show Less'
                  }}
                </v-btn>
              </v-col>
              <v-col cols="12">
                <p class="mb-0">Comments</p>
                <VideoComments :video="video"></VideoComments>
              </v-col>
            </v-row>
          </v-container>
        </v-skeleton-loader>
      </v-col>

    </v-row>

  </v-container>
</template>

<style scoped lang="less">
video {
  max-width: 100%;
  width: 100%;
}

#video-description {
  white-space: pre-wrap;
  max-height: 45px;
  overflow: hidden;
}

.video-description-open {
  max-height: initial !important;
}

#btns {
  border-bottom: 1px solid #e0d8d8;

  button {
    color: #7f7f7f;
  }
}

button.v-btn.remove-hover-bg {
  background-color: initial !important;

  &:hover {
    background-color: #f9f9f9;
  }
}
</style>

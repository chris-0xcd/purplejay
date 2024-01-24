<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import { usePluginService } from '../plugins/pluginService'
import { Comments } from '../grayjay/polycentric'

const ps = usePluginService()

const props = defineProps({
  video: {
    type: Object,
    default: () => {}
  },
  // todo: very dumb way of doing this but I don't feel like properly wrapping the comments pager right now
  usePolycentric: {
    type: Boolean,
    default: () => true
  }
})


function init () {
  return {
    commentPager: null,
    subCommentPagers: new Map(),
    nextSubCommentPagerId: -1,
    comments: ref([]),
  }
}

let poly = init()
let platform = init()

function curHandler() {
  return props.usePolycentric ? poly : platform
}


watch(
  () => props.video,
  async (newVideo) => {
    /*if (!newPager) {
      items.list = []
      loading.value = true
      return
    }
    await loadInitial(newPager)*/
    if (newVideo) {
      poly = init()
      platform = init()
      await loadCommentsInitial(newVideo)
    }
  }
)

onMounted(async () => {
  if (props.video) {
    await loadCommentsInitial(props.video)
  }
})

async function loadCommentsInitial(video) {
  if (!video?.id?.pluginId) {
    return
  }

  const handler = curHandler()
  if (handler.commentPager) {
    return
  }
  if (props.usePolycentric) {
    handler.commentPager = new Comments()
    await handler.commentPager.loadInitial(video.id.value)
  } else {
    handler.commentPager = await ps.getComments(video.id.pluginId, video.url)
  }

  handler.comments.value = handler.commentPager.pager.results
  handler.subCommentPagers = new Map()
}

async function loadComments({ done }) {
  const handler = curHandler()

  if (!handler.commentPager || !handler.commentPager.hasMorePagers()) {
    console.log('empty')
    done('empty')
    return
  }

  console.log('load comments')
  await handler.commentPager.nextPage()
  console.log(handler.commentPager.pager.results)
  handler.comments.value.push(...handler.commentPager.pager.results)
  done('ok')
}

async function moreReplies(comment) {
  const handler = curHandler()
  if (!comment.subCommentPagerId) {
    return
  }
  const pager = handler.subCommentPagers.get(comment.subCommentPagerId)
  if (!pager.hasMorePagers()) {
    return
  }

  await pager.nextPage()
  comment.subComments.push(...pager.pager.results)
}

function commentHasMoreReplies(comment) {
  const handler = curHandler()
  if (!comment.subCommentPagerId) {
    return false
  }
  const pager = handler.subCommentPagers.get(comment.subCommentPagerId)
  if (!pager.hasMorePagers()) {
    return false
  }
  return pager.hasMorePagers()
}

async function openReply(comment) {
  const handler = curHandler()
  console.log('openReply')
  console.log(comment)
  comment.openReplies = true
  if (!comment.subComments) {
    console.log(JSON.stringify(comment))

    let subCommentsPager
    if (props.usePolycentric) {
      subCommentsPager = new Comments()
      await subCommentsPager.loadInitialByRef(comment.reference)
    } else {
      subCommentsPager = await ps.getSubComments(
        props.video.id.pluginId,
        JSON.stringify(comment)
      )
    }

    comment.subComments = [...subCommentsPager.pager.results]
    comment.subCommentPagerId = handler.nextSubCommentPagerId++
    handler.subCommentPagers.set(comment.subCommentPagerId, subCommentsPager)
  }
}

const test = ref([])
</script>

<template>
  <v-infinite-scroll
    class="overflow-hidden"
    :items="curHandler().comments.value"
    :onLoad="loadComments"
  >
    <v-card
      v-for="(item, index) in curHandler().comments.value"
      :key="index"
      class="transparent"
      flat
    >
      <v-list-item three-line class="pl-0 mt-2">
        <v-avatar v-if="item.author.thumbnail" size="50">
          <v-img :src="item.author.thumbnail"></v-img>
        </v-avatar>
        <div>
          <v-list-item-title class="font-weight-medium caption mb-1">
            {{ item.author.name }}
            <span class="font-weight-light grey--text">{{ item.date }}</span>
          </v-list-item-title>
          <v-list-item-subtitle class="black--text text--darken-4 caption">{{ item.message }}</v-list-item-subtitle>
          <div v-if="item.replyCount" @click.self="openReply(item)">
            {{ item.replyCount }} Replies
          </div>
          <div v-if="item.openReplies && item.subComments">
            <div v-for="(subComment, subIndex) in item.subComments" :key="subIndex">
              <v-list-item>
                <v-avatar v-if="subComment.author.thumbnail" size="50">
                  <v-img :src="subComment.author.thumbnail"></v-img>
                </v-avatar>
                <v-list-item-title class="font-weight-medium caption mb-1">
                  {{ subComment.author.name }}
                  <span class="font-weight-light grey--text">{{ subComment.date }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{ subComment.message }}</v-list-item-subtitle>
              </v-list-item>
            </div>
            <v-btn
              v-if="commentHasMoreReplies(item)"
              text
              small
              :ripple="false"
              @click.stop="moreReplies(item)"
            >More ...
            </v-btn>
          </div>
        </div>
      </v-list-item>
    </v-card>
  </v-infinite-scroll>
</template>

<style scoped lang="less">

</style>

<script>
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  }
}
</script>

<script setup>
import { useTimeAgo } from '../plugins/timeAgo.js'

const timeAgo = useTimeAgo()

// srcset would require width but quality specifies height, just get the highest resolution image for now
function bestSource(sources) {
  if (!sources) {
    return ''
  }
  return sources.sort((a, b) => b.quality - a.quality)[0].url
}
</script>

<template>
  <v-skeleton-loader type="card-avatar" :loading="video.loading">
    <v-card
      v-if="!video.loading"
      class="content-bg card w-100"
      :flat="true"
      tile
      router
      :to="{ path: '/video', query: { pluginId: video?.id?.pluginId, url: video.url } }"
    >
      <v-img min-width="100%" :aspect-ratio="16 / 9" :src="bestSource(video?.thumbnails?.sources)" ></v-img>
      <v-row no-gutters class="flex-nowrap" >
        <v-list-item :active="false" class="pl-2 pt-3" router :to="{ path: '/channel', query: { pluginId: video?.id?.pluginId, url: video?.author?.url } }">
          <v-avatar class="mt-3"><v-img class="elevation-6" :src="video?.author?.thumbnail"></v-img></v-avatar>
        </v-list-item>

        <v-col style="min-width: 0;" class="overflow-hidden flex-grow-1">
          <v-card-title class="pl-2 pt-3 subtitle-1 font-weight-bold">
            {{ video.name }}
          </v-card-title>

          <v-card-text class="pl-2 pb-0">
            {{ video?.author?.name }}
          </v-card-text>
          <v-card-text class="pl-2 pt-0">
            {{ video.viewCount }} views<v-icon>mdi-circle-small</v-icon>{{ timeAgo.format(new Date(video.datetime * 1000)) }}
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-skeleton-loader>
</template>

<style scoped lang="less">

</style>

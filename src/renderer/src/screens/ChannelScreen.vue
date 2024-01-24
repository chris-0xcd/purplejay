<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import VideoList from '../components/VideoList.vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { usePluginService } from '../plugins/pluginService'

const tab = ref(null)

const route = useRoute()
const ps = usePluginService()

const channel = ref(null)
const pager = shallowRef(null)

async function pageLoad(route) {
  pager.value = ps.getChannelContents(route.query.pluginId, route.query.url)
  channel.value = await ps.getChannel(route.query.pluginId, route.query.url)
}

onBeforeRouteUpdate(async (to, from) => {
  if (to.query.url !== from.query.url || to.query.pluginId !== from.query.pluginId) {
    await pageLoad(to)
  }
})

onMounted(async () => {
  await pageLoad(route)
})
</script>

<template>
  <v-container fluid>
    <div class="d-flex justify-center pl-3 pr-3">
      <v-img id="channel-banner" :src="channel?.banner" max-width="1300" max-height="250"></v-img>
    </div>
    <div class="nav-bgcolor">
      <div id="channel-header">
        <v-container fluid class="py-0 pa-3">
          <v-card class="transparent" flat>
            <v-list-item three-line>
              <v-avatar size="80">
                <v-img :src="channel?.thumbnail"></v-img>
              </v-avatar>
              <v-list-item-title class="headline mb-1">{{ channel?.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ channel?.subscribers }} subscribers</v-list-item-subtitle>
            </v-list-item>
          </v-card>
        </v-container>
      </div>
    </div>
    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
      <v-tab value="videos">Videos</v-tab>
      <v-tab value="channels">Channels</v-tab>
      <v-tab value="support">Support</v-tab>
      <v-tab value="about">About</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item value="videos">
        <video-list :pager="pager"></video-list>
      </v-window-item>
      <v-window-item value="channels">
        <v-container fluid>
          Not Implemented
        </v-container>
      </v-window-item>
      <v-window-item value="support">
        <v-container fluid>
          Not Implemented
        </v-container>
      </v-window-item>
      <v-window-item value="about">
        <v-container fluid>
          <pre>{{ channel?.description }}</pre>
        </v-container>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<style scoped lang="less"></style>

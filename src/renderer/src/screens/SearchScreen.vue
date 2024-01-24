<script setup>
import { useRoute } from 'vue-router'
import { onMounted, shallowRef } from 'vue'
import { usePluginService } from '../plugins/pluginService'
import { onBeforeRouteUpdate } from 'vue-router'
import VideoList from '../components/VideoList.vue'

const route = useRoute()
const ps = usePluginService()

const search = shallowRef(null)

async function pageLoad(searchTerm) {
  search.value = ps.search(searchTerm)
}

onMounted(async () => {
  await pageLoad(route.query.search)
})

onBeforeRouteUpdate(async (to, from) => {
  if (to.query.search !== from.query.search) {
    await pageLoad(to.query.search)
  }
})
</script>

<template>
  <video-list :pager="search"></video-list>
</template>

<style scoped lang="less"></style>

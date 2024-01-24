<script setup>
import { shallowRef, onMounted } from 'vue'
import { usePluginService } from '../plugins/pluginService'
import VideoList from '../components/VideoList.vue'

const ps = usePluginService()
const home = shallowRef(null)

async function loadInitial() {
  home.value = ps.getHome()
}

onMounted(async () => {
  await loadInitial()
})
</script>

<template>
  <video-list :pager="home"></video-list>
</template>

<style scoped lang="less"></style>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'
import VideoCard from './VideoCard.vue'

const props = defineProps({
  pager: {
    type: Object,
    default: () => null
  }
})

let items = reactive({ list: [] })
const loading = ref(true)

async function loadInitial(pager) {
  loading.value = true

  items.list = pager.getItems()

  await pager.fetchPage()

  loading.value = false
}

onMounted(async () => {
  if (props.pager) {
    await loadInitial(props.pager)
  }
})

async function loadPage({ done }) {
  if (!props.pager || !props.pager.hasMorePagers()) {
    done('empty')
    return
  }

  await props.pager.fetchPage()
  done('ok')
}

watch(
  () => props.pager,
  async (newPager) => {
    if (!newPager) {
      items.list = []
      loading.value = true
      return
    }
    await loadInitial(newPager)
  }
)
</script>

<template>
  <v-container fluid>
    <v-infinite-scroll class="overflow-hidden" :items="items.list" :onLoad="loadPage">
      <v-row>
        <v-col v-for="(item, index) in items.list" :key="index" cols="12" sm="6" md="4" lg="3">
          <video-card :video="loading ? { loading: true } : item.value"></video-card>
        </v-col>
      </v-row>
    </v-infinite-scroll>
  </v-container>
</template>

<style scoped lang="less"></style>

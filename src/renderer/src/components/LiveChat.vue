<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  height: {
    type: String
  }
})

const vscroll = ref(null)
const scroller = ref(null)

import { ref, watch, nextTick, onMounted } from 'vue'

watch(
  () => props.items,
  async (newItems, oldValue) => {
    console.log(newItems)
    await nextTick()
    if (scroller.value) {
      scroller.value.scrollToBottom()
      console.log(newItems.length)
      //vscroll.value.scrollToIndex(newItems.length-1)
    }
  },
  { deep: true }
)

onMounted(async () => {
  console.log(vscroll)
})

//const items = ref(new Array(100).fill({text: 'Lorem Ipsum Doloris'}));
</script>

<template>
  <v-card class="d-flex flex-column" title="Chat" variant="outlined" :height="props.height">
    <DynamicScroller
      ref="scroller"
      :items="items"
      :min-item-size="54"
      class="scroller"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[
            item.message,
          ]"
          :data-index="index"
        >
          <div class="avatar">
            <!--<img
              :src="item.avatar"
              :key="item.avatar"
              alt="avatar"
              class="image"
            >-->
          </div>
          <div class="text">{{ item.message }}</div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <!--
    <v-virtual-scroll ref="vscroll" :items="props.items">
      <template #default="{ item }">
        <v-list-item>{{ item.message }}</v-list-item>
      </template>
    </v-virtual-scroll>
    -->
  </v-card>
</template>

<style scoped lang="less"></style>

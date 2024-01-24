<script setup>
import {ref, watch} from 'vue'
import {usePluginService} from '../../plugins/pluginService'
import router from '../../router'

const searchText = ref()
const searchPreviewText = ref()
const autocompleteItems = ref([])

const ps = usePluginService()

function search() {
  console.log('search... ' + searchPreviewText.value + ' | ' + searchText.value)
  router.push({path: '/search', query: {search: searchPreviewText.value}})
}

function menuChange(value) {
  console.log('menu: ' + value)
}

function modelValueChange(value) {
  console.log('modeValue:')
  console.log(value)
  search()
}

function keydown(event) {
  if (event.key !== 'Enter') {
    return
  }
  searchText.value = searchPreviewText.value
  console.log(event)
  search()
  event.target.blur()
}

watch(searchPreviewText, async (newSearch, oldValue) => {
  if (newSearch.trim() !== '') {
    autocompleteItems.value = await ps.searchSuggestions(newSearch)
  } else {
    autocompleteItems.value = []
  }
})
</script>

<template>
  <nav id="navbar">
    <v-app-bar class="white" :flat="true" app clipped-left>
      <v-autocomplete
        v-model:search="searchPreviewText"
        v-model="searchText"
        :flat="true"
        :items="autocompleteItems"
        hide-details
        single-line
        clearable
        append-inner-icon="mdi-magnify"
        placeholder="Search"
        variant="outlined"
        density="compact"
        close-text="test"
        class="ma-2"
        @click:append-inner="search"
        @update:menu="menuChange"
        @update:model-value="modelValueChange"
        @keydown="keydown"
      ></v-autocomplete>
    </v-app-bar>
  </nav>
</template>

<style scoped lang="less"></style>

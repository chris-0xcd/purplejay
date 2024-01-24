<script setup>

import { ref, provide } from "vue";
import NavBar from './NavBar.vue'
import { useRoute } from 'vue-router'
import { usePluginService } from '../../plugins/pluginService'

const pluginService = usePluginService()
const route = useRoute()

const snackbar = ref(false)
const snackbarText = ref('')
const timeout = 2000

const pluginState = pluginService.getState()

provide('addMessage', (value) => {
  snackbar.value = false

  setTimeout(() => {
    snackbar.value = true
    snackbarText.value = value
  }, 250)
})
</script>

<template>
  <v-app>
    <!-- <HeaderLayout /> -->
    <NavBar />
    <v-main>
      <slot v-if="route.path === '/plugins' || pluginState.enabledPlugins.length >= 1" />
      <v-container v-if="route.path !== '/plugins' && pluginState.enabledPlugins.length < 1">
        Please <router-link :to="{ path: '/plugins' }">install and enable</router-link> at least one
        plugin!
      </v-container>
    </v-main>
    <v-bottom-navigation>
      <v-btn value="home" router :to="{ path: '/' }">
        <v-icon>mdi-home</v-icon>
        <span>Home</span>
      </v-btn>
      <v-btn value="plugins" router :to="{ path: '/plugins' }">
        <v-icon>mdi-puzzle</v-icon>
        <span>Plugins</span>
      </v-btn>
    </v-bottom-navigation>

    <v-snackbar v-model="snackbar" :timeout="timeout">
      {{ snackbarText }}

      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<style scoped lang="less">
</style>

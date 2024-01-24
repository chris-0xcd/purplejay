<script setup>
import { shallowRef, onMounted, ref, inject } from 'vue'
import draggable from 'vuedraggable'
import PluginInfo from '../components/PluginInfo.vue'
import { usePluginService } from '../plugins/pluginService'

const pluginService = usePluginService()
const addMessage = inject('addMessage')

const newPluginUrl = ref('')
const dialog = ref(false)
const currentPluginData = shallowRef(null)
const pluginData = ref({})
let currentPlugin = null

async function addPlugin() {
  // attempt to download plugin and display plugin dialog
  try {
    let pluginUrl = newPluginUrl.value.trim()
    const urlPrefix = 'grayjay://plugin/'
    if (pluginUrl.startsWith(urlPrefix)) {
      pluginUrl = pluginUrl.substring(urlPrefix.length)
    }
    const newPlugin = await pluginService.downloadNewPlugin(pluginUrl)

    currentPlugin = newPlugin
    currentPluginData.value = newPlugin.getInformation()

    dialog.value = true
  } catch (e) {
    addMessage(e)
  }

  newPluginUrl.value = ''
}

async function installPlugin() {
  await pluginService.installPlugin(currentPlugin)
  await pluginSettings(currentPlugin.id)
}

async function uninstallPlugin() {
  await pluginService.uninstallPlugin(currentPlugin.id)
  dialog.value = false
  updateState()
}

async function pluginSettings(id) {
  const plugin = pluginService.getPlugin(id)

  currentPlugin = plugin
  currentPluginData.value = plugin.getInformation()

  dialog.value = true
}

async function disablePlugin(id) {
  await pluginService.disablePlugin(id)
  updateState()
}

async function enablePlugin(id) {
  await pluginService.enablePlugin(id)
  updateState()
}

function updateState() {
  pluginData.value = pluginService.getState()
}

function dialogClosed() {
  updateState()
}

onMounted(async () => {
  updateState()
})
</script>

<template>
  <v-container>
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      @update:modelValue="(value) => value || dialogClosed()"
    >
      <template v-slot:default="{ isActive }">
        <PluginInfo
          :plugin="currentPluginData"
          @install-plugin="installPlugin"
          @uninstall-plugin="uninstallPlugin"
          @close-dialog="isActive.value = false"
        ></PluginInfo>
      </template>
    </v-dialog>
    <div>
      <v-text-field
        v-model="newPluginUrl"
        append-inner-icon="mdi-plus"
        label="Add new plugin by URL"
        variant="solo-filled"
        @click:append-inner="addPlugin"
      ></v-text-field>
    </div>
    <div>Enabled</div>
    <draggable v-model="pluginData.enabledPlugins" item-key="id">
      <template #item="{ element: plugin }">
        <v-card variant="outlined" class="my-2 pl-2">
          <div class="d-flex flex-no-wrap">
            <v-avatar class="pt-2" size="40" rounded="0"><v-img :src="plugin.icon"></v-img></v-avatar>
            <div class="flex-grow-1">
              <v-card-title style="line-height: 1.2rem" class="text-subtitle-1 pb-0">{{
                plugin.name
              }}</v-card-title>
              <v-card-subtitle>{{ plugin.description }}</v-card-subtitle>
            </div>
            <div>
              <v-btn rounded="0" variant="tonal" class="h-100" @click="pluginSettings(plugin.id)">
                Settings
              </v-btn>
              <v-btn rounded="0" variant="tonal" class="h-100" @click="disablePlugin(plugin.id)">
                Disable
              </v-btn>
            </div>
          </div>
        </v-card>
      </template>
    </draggable>
    <div>Disabled</div>

    <v-card
      v-for="(plugin) in pluginData.availablePlugins"
      :key="plugin.id"
      variant="outlined"
      class="my-2 pl-2"
    >
      <div class="d-flex flex-no-wrap">
        <v-avatar class="pt-2" size="40" rounded="0"><v-img :src="plugin.icon"></v-img></v-avatar>
        <div class="flex-grow-1">
          <v-card-title style="line-height: 1.2rem" class="text-subtitle-1 pb-0">{{
            plugin.name
          }}</v-card-title>
          <v-card-subtitle>test</v-card-subtitle>
        </div>
        <div>
          <v-btn rounded="0" variant="tonal" class="h-100" @click="pluginSettings(plugin.id)">
            Settings
          </v-btn>
          <v-btn rounded="0" variant="tonal" class="h-100" @click="enablePlugin(plugin.id)">
            Enable
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped lang="less"></style>

<script setup>
const props = defineProps({
  plugin: {
    type: Object,
    default: () => null
  }
})
const emit = defineEmits(['installPlugin', 'uninstallPlugin', 'closeDialog'])

function installPluginClick() {
  emit('installPlugin')
}

function uninstallPluginClick() {
  emit('uninstallPlugin')
}

function closeDialogClick() {
  emit('closeDialog')
}
</script>

<template>
  <v-sheet>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="closeDialogClick">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Plugin</v-toolbar-title>
    </v-toolbar>
    <v-card variant="flat" rounded="0" :title="plugin?.name">
      <template #prepend>
        <v-avatar rounded="0">
          <v-img :src="plugin?.icon"></v-img>
        </v-avatar>
      </template>
      <template #subtitle> By {{ plugin?.configuration?.author }} </template>
      <v-card-subtitle>{{ plugin?.description }}</v-card-subtitle>

      <v-list>
        <v-list-item title="Version">
          <template #subtitle>{{ plugin?.configuration?.version }}</template>
        </v-list-item>
        <v-list-item title="Platform URL">
          <template #subtitle>{{ plugin?.configuration?.platformUrl }}</template>
        </v-list-item>
        <v-list-item title="Repository URL">
          <template #subtitle>{{ plugin?.configuration?.repositoryUrl }}</template>
        </v-list-item>
        <v-list-item title="Signature">
          <template #subtitle><span :class="{'text-red-accent-4' : !plugin?.signatureValid, 'text-green-accent-4': plugin?.signatureValid} ">{{ plugin?.signatureStatus }}</span></template>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="installPluginClick" v-if="!plugin?.installed" block variant="tonal" class="bg-green">Install</v-btn>
        <v-btn @click="uninstallPluginClick" v-if="plugin?.installed" block variant="tonal" class="bg-red">Uninstall</v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<style scoped lang="less"></style>

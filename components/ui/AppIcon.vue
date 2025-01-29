<template>
  <div>
    <i :class="type === 'primevue' ? `pi pi-${props.icon}` : 'material-symbols-outlined'">{{ type === 'material' ? `${props.icon}` : '' }}</i>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  icon: string | undefined
  type: "material" | "primevue"
}>()
</script>

<style>

</style>
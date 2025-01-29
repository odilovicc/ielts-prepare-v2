<template>
  <div class="layouts-default-wrapper">
    <div class="layouts-default-asidebar">
      <AppNavbar v-if="deviceType === IDeviceType.DESKTOP"/>
      <AppMobilebar v-else/>
    </div>
    <div class="layouts-default-content">
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceType } from '~/composable/device';
import { IDeviceType } from '~/types/helpers';

const {deviceType} = useDeviceType()

definePageMeta({
  layoutTransition: {
    name: 'slide-in'
  }
})
</script>
<style src="~/assets/stylus/layouts.styl"></style>
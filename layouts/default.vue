<template>
  <div class="layouts-default-wrapper">
    <div class="layouts-default-asidebar">
      <AppNavbar v-if="deviceType === IDeviceType.DESKTOP"/>
      <AppMobilebar v-else/>
    </div>
    <div class="layouts-default-content">
      <div class="dashboard-header-container">
        <h1>Welcome, <span>{{ username }}</span>. How's goin' on?</h1>
        <AppButton icon-type="material" prefix-icon="notifications"/>
      </div>
      <div class="layouts-default-content-content">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useDeviceType } from '~/composable/device';
import { IDeviceType } from '~/types/helpers';

const {deviceType} = useDeviceType()
const authStore = useAuthStore()
const {username} = storeToRefs(authStore)

definePageMeta({
  layoutTransition: {
    name: 'slide-in'
  }
})
</script>
<style src="~/assets/stylus/layouts.styl"></style>
<template>
  <nav class="mobile-navbar-wrapper">
    <div class="mobile-navbar-left">
      <nuxt-link :to="{name: el.to}" class="mobile-navbar-link" v-for="el in userLinks[0]">
        <AppIcon
          :type="!!el.materialIcon ? 'material' : 'primevue'"
          :icon="el.icon || el.materialIcon"
          class="mobile-navbar-link-icon"
        />
        <span class="mobile-navbar-link-label">{{ el.tooltip }}</span>
      </nuxt-link>
    </div>
    <div class="mobile-navbar-active">
      <AppIcon
        type="material"
        icon="home"
        class="mobile-navbar-link-icon"
      />
    </div>
    <div class="mobile-navbar-right">
      <nuxt-link :to="{name: el.to}" class="mobile-navbar-link" v-for="el in userLinks[1]">
        <AppIcon
          :type="!!el.materialIcon ? 'material' : 'primevue'"
          :icon="el.icon || el.materialIcon"
          class="mobile-navbar-link-icon"
        />
        <span class="mobile-navbar-link-label">{{ el.tooltip }}</span>
      </nuxt-link>
    </div>
  </nav>
</template>
<script setup lang="ts">
import { useDeviceType } from "~/composable/device";
import { type IAsidebarLinks } from "~/types/helpers";
import { RouterPaths } from "~/types/router";


const userLinks = ref<IAsidebarLinks[][]>([
  [
    {
      to: RouterPaths.READING,
      tooltip: "Reading",
      materialIcon: "book",
    },
    {
      to: RouterPaths.LISTENING,
      tooltip: "Listening",
      materialIcon: "headphones",
    },
  ],
  [
    {
      to: RouterPaths.WRITING,
      tooltip: "Writing",
      materialIcon: "edit",
    },
    {
      to: RouterPaths.DEV_TEST,
      tooltip: "AI",
      materialIcon: "book_4_spark",
    },
  ],
]);
</script>

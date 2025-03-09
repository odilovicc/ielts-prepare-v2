<template>
  <nav class="mobile-navbar-wrapper">
     <div class="mobile-navbar-links">
      <nuxt-link :to="{name: el.to}" class="mobile-navbar-link" v-for="el in userLinks">
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


const userLinks = ref<IAsidebarLinks[]>([
    {
      to: RouterPaths.DASHBOARD,
      tooltip: "Home",
      materialIcon: "house",
    },
    {
      to: RouterPaths.READING,
      tooltip: "Reading",
      materialIcon: "book",
    },
    {
      to: RouterPaths.WRITING,
      tooltip: "Writing",
      materialIcon: "edit",
    },
    {
      to: RouterPaths.AI,
      tooltip: "AI",
      materialIcon: "book_4_spark",
    },
    {
      to: RouterPaths.SETTINGS,
      tooltip: "Settings",
      materialIcon: "settings",
    },
]);
</script>

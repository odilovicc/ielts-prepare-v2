<template>
  <div class="bg-[var(--primary-color)]">
    <div
      class="container flex justify-center items-center mx-auto w-full h-screen"
    >
      <AppCard :title="pageTitle" class="min-w-[50vw]">
        <template #content>
          <NuxtPage />
        </template>
      </AppCard>
    </div>
  </div>

  <PrimeToast/>
</template>
<script setup lang="ts">
import useFirebaseClient from "~/composable/firebase";
import { RouterPaths } from "~/types/router";
import PrimeToast from 'primevue/toast'

const route = useRoute();

const pageTitle = computed(() => {
  switch (route.name) {
    case RouterPaths.LOGIN:
      return "Авторизация";
    case RouterPaths.REGISTER:
      return "Регистрация";
  }
});

onMounted(() => {
  if (!useFirebaseClient().auth.currentUser) {
    navigateTo({ name: RouterPaths.LOGIN });
  }
  else {
    navigateTo({ name: RouterPaths.DASHBOARD });
  }

});
</script>

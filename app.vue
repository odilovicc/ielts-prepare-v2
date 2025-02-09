<template>
  <NuxtLayout>
    <Transition>
      <NuxtPage/>
    </Transition>
    <Toast/>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { onAuthStateChanged } from 'firebase/auth';
import useFirebaseClient from './composable/firebase';
import { RouterPaths } from './types/router';
import { readData } from './composable/dbActions';

const {auth} = useFirebaseClient()
const authStore = useAuthStore()
const mainStore = useMainStore()
const {vueApp} = useNuxtApp();

const {notifications} = storeToRefs(mainStore)
const {username, isAuthenticated, userData} = storeToRefs(authStore)

await onAuthStateChanged(auth, (user) => {
  if(user === null) navigateTo({name: RouterPaths.AUTH})

  username.value = user?.displayName
  isAuthenticated.value = true
  readData()
    .then((data) => userData.value = data)
})

watch(notifications, (messages) => {
  if(messages.length > 0) {
    messages.map((item) => {
      vueApp.config.globalProperties.$toast.add({
        severity: item.severity,
        summary: item.title,
        detail: item.body,
        life: 3000
      })
    })
    mainStore.clearNotifications()
  }
}, {
  deep: true
})
</script>
<style src="~/assets/stylus/theme/app.styl"></style>
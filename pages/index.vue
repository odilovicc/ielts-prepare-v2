<template>
    <div class="dashboard-header-container">
        <h1>Welcome, <span>{{ username }}</span>. How's goin' on?</h1>
        <AppButton icon-type="material" prefix-icon="notifications"/>
    </div>
    <WidgetsContainer/>
</template>
<script setup lang="ts">

const authStore = useAuthStore()

const {username} = storeToRefs(authStore)
</script>
<style src="~/assets/stylus/pages/dashboard.styl"></style>
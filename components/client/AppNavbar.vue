<template>
    <div class="asidebar-wrapper">
        <div class="asidebar-logo">IP</div>
        <div class="asidebar-links-container">
            <div class="asidebar-link" v-for="el in links" @click="$router.push({name: el.to})" v-tooltip="el.tooltip">
                <AppIcon :type="!!el.materialIcon ? 'material' : 'primevue'" :icon="el.icon || el.materialIcon"/>
            </div>
        </div>
        <div class="asidebar-options-container">
            <div class="asidebar-link" v-for="el in navbarOptions" @click="$router.push({name: el.to})" v-tooltip="el.tooltip">
                <AppIcon :type="!!el.materialIcon ? 'material' : 'primevue'" :icon="el.icon || el.materialIcon"/>
            </div>
            <div class="asidebar-link" @click="signOutUser" v-tooltip="`Sign out`">
                <AppIcon type="material" icon="logout"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { signOut } from 'firebase/auth';
import useFirebaseClient from '~/composable/firebase';
import type { IAsidebarLinks } from '~/types/helpers';
import { RouterPaths } from '~/types/router';

const {auth} = useFirebaseClient()


const links = ref<IAsidebarLinks[]>([
    {
        to: RouterPaths.DASHBOARD,
        tooltip: "Home",
        materialIcon: "home"
    },
    {
        to: RouterPaths.READING,
        tooltip: "Reading",
        materialIcon: "book"
    },
    {
        to: RouterPaths.LISTENING,
        tooltip: "Listening",
        materialIcon: "headphones"
    },
    {
        to: RouterPaths.WRITING,
        tooltip: "Writing",
        materialIcon: "edit"
    },
    {
        to: RouterPaths.AI,
        tooltip: "AI",
        materialIcon: "book_4_spark"
    },
])

const navbarOptions = ref<IAsidebarLinks[]>([
    {
        to: RouterPaths.DEV_TEST,
        tooltip: "Settings",
        materialIcon: "settings"
    },
    {
        to: RouterPaths.DEV_TEST,
        tooltip: "Profile",
        materialIcon: "person"
    },
])

function signOutUser() {
    signOut(auth)
        .then(() => navigateTo({name: RouterPaths.AUTH}))
}
</script>
<style src="~/assets/stylus/components/ui/asidebar.styl"></style>
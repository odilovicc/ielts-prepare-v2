<template>
    <div class="settings-wrapper">
        <h1 class="settings-title">Settings</h1>

        <div class="settings-content">
            <div class="settings-card mb-4">
                <h1 class="settings-card-title">Change your nickname</h1>
                <AppFormInputText v-model="nickname" class="mb-3" placeholder="Name"/>
                <AppButton label="Change" type="secondary" :disabled="!nickname" @click="onUserNicknameChanged"/>
            </div>
            <div class="settings-card">
                <h1 class="settings-card-title">Additional settings</h1>
                <AppButton icon-type="material" prefix-icon="logout" label="Log out" @click="onLogOut"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { signOut } from 'firebase/auth'
import useFirebaseClient from '~/composable/firebase'
import { RouterPaths } from '~/types/router'


const {changeUsername} = useAuthStore()
const {addNotification} = useMainStore()
const {auth} = useFirebaseClient()
const nickname = ref<string>("")


async function onUserNicknameChanged() {
    await changeUsername(nickname.value)
        .then((data) => {
            addNotification({
                title: data,
                severity: "success" 
            })
        })
        .catch((err) => {
            addNotification({
                title: err,
                severity: "error"
            })
        })
}

function onLogOut() {
    signOut(auth)
        .then(() => navigateTo({name: RouterPaths.AUTH}))
}
</script>
<style src="~/assets/stylus/pages/settings.styl"></style>
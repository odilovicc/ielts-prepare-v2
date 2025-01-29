<template>
    <div class="writing-wrapper">
        <h1 class="page-title">Writing</h1>
        <p class="page-description">Write your essay here and get feedback from AI here!</p>

        <div class="writing-editor-container">
            <PrimeEditor v-model="userEssay" editorStyle="height: 100%"/>
        </div>
        <AppButton label="Get a feedback!" @click="onSendToAi" :disabled="isLoading" :loading="isLoading"/>

        <div class="aiFeedback-container" v-if="!isResponseHidden">
            <div class="aiFeedback-header">
                <AppIcon type="material" icon="network_intelligence"/>
                <span>AI{{ isLoading ? ' is thinking' : `'s answer` }}</span>
            </div>
            <div class="aiFeedback-body">
                <div v-html="aiFeedback" v-if="aiFeedback"/>
                <p v-else>Loading....</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import PrimeEditor from 'primevue/editor';

const store = useWritingStore()
const toast = useToast()

const {generateFeedback} = store
const {isLoading} = storeToRefs(store)
const userEssay = ref()
const aiFeedback = ref()
const isResponseHidden = ref(true)

function onSendToAi() {
    isResponseHidden.value = false
    toast.add({
        life: 3000,
        severity: "info",
        summary: "Please wait, AI is giving an answer"
    })
    generateFeedback(userEssay.value)
        .then((data) => aiFeedback.value = data)
        .catch((err) => {
           toast.add({
                life: 3000,
                severity: "error",
                summary: err
            })
        })
}
</script>
<style src="~/assets/stylus/pages/writing.styl"></style>
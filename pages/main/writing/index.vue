<template>
    <div class="writing-wrapper">
        <h1 class="page-title">Writing</h1>
        <p class="page-description">Write your essay here and get feedback from AI here!</p>

        <div class="writing-editor-container">
            <div id="quillEditor" ref="quillEditorRef"></div>
        </div>
        <AppButton label="Get a feedback!" type="secondary" @click="onSendToAi" :disabled="isLoading" :loading="isLoading"/>

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
import Quill, { type QuillOptions } from 'quill';
import { onMounted, ref } from 'vue';

const store = useWritingStore();
const toast = useToast();
const editorRef = ref(null); // Реф для доступа к DOM-элементу

const { generateFeedback } = store;
const { isLoading } = storeToRefs(store);
const userEssay = ref<string>(''); // Храним текст эссе как строку
const aiFeedback = ref<string>(''); // Храним ответ от AI
const isResponseHidden = ref(true);

// Переменная для хранения инстанса Quill
let quillInstance: Quill | null = null;

onMounted(() => {
    // Инициализация Quill Editor
    quillInstance = new Quill('#quillEditor', {
        theme: 'snow',
        placeholder: 'Write your essay here...',
        modules: {
            toolbar: [
                [{ 'font': [] }],
                ['bold', 'underline'],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'header': [1, 2, false] }],
            ],
        },
    });

    // Отслеживаем изменения в редакторе и обновляем userEssay
    quillInstance.on('text-change', () => {
        userEssay.value = quillInstance?.getText().trim() || ''; // Получаем текст без HTML
    });
});

function onSendToAi() {
    if (!userEssay.value) {
        toast.add({
            life: 3000,
            severity: 'error',
            summary: 'Please write an essay before submitting!',
        });
        return;
    }

    isResponseHidden.value = false;
    toast.add({
        life: 3000,
        severity: 'info',
        summary: 'Please wait, AI is giving an answer',
    });

    // Отправляем текст эссе на проверку
    generateFeedback(userEssay.value)
        .then((data) => {
            aiFeedback.value = data;
        })
        .catch((err) => {
            toast.add({
                life: 3000,
                severity: 'error',
                summary: err.message || 'Error occurred while generating feedback',
            });
        });
}
</script>

<style src="~/assets/stylus/pages/writing.styl"></style>
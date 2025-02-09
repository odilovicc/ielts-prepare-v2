<template>
    <div class="chatbot-page-container">
      <h1 class="page-title">AI</h1>
      <p class="page-description">
        You can ask anything from our Chatbot: exam, problems, essay feedback or any writing task examples!
      </p>
  
      <div class="chatbot-container">
        <div ref="messageContainer" class="chatbot-message-container">
          <template v-for="(el, index) in chatHistory" :key="index">
            <template v-if="el.role === 'user'">
              <div class="chatbot-message-user">
                <p>{{ el.content }}</p>
              </div>
            </template>
            <template v-else-if="el.role === 'assistant'">
              <div v-if="el.content !== 'loading'" class="chatbot-message-ai">
                <p>{{ el.content }}</p>
              </div>
              <AppLoader v-else />
            </template>
          </template>
        </div>
        <div class="chatbot-input-container">
          <AppFormInputText
            :disabled="isLoading"
            v-model="userMessage"
            placeholder="Type here..."
            class="w-full chatbot-input-input"
          />
          <AppButton
            @click="onSendPrompt"
            :disabled="isLoading"
            class="chatbot-input-button"
            icon-type="material"
            prefix-icon="send"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { useChatbotStore } from '~/stores/chatbot';
  import { storeToRefs } from 'pinia';
  
  const { sendUserMessage } = useChatbotStore();
  const { chatHistory } = storeToRefs(useChatbotStore());
  const userMessage = ref('');
  const isLoading = ref<boolean>(false);
  const messageContainer = ref<HTMLElement | null>(null); // Ссылка на контейнер сообщений
  
  // Функция для прокрутки контейнера вниз
  const scrollToBottom = () => {
    if (messageContainer.value) {
      messageContainer.value.scrollTo({
        top: messageContainer.value.scrollHeight,
        behavior: 'smooth',
      });
    }
  };
  
  function onSendPrompt() {
    if (!userMessage.value.trim()) return; // Не отправляем пустые сообщения
  
    isLoading.value = true;
  
    // Добавляем временное сообщение с лоадером
    chatHistory.value.push({ role: 'assistant', content: 'loading' });
  
    // Прокручиваем вниз после добавления сообщения с лоадером
    nextTick(() => {
      scrollToBottom();
    });
  
    sendUserMessage(userMessage.value)
      .then((response) => {
        console.log('Ответ от чат-бота:', response);
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      })
      .finally(() => {
        isLoading.value = false;
  
        // Удаляем временное сообщение с лоадером
        const loadingMessageIndex = chatHistory.value.findIndex(
          (msg) => msg.content === 'loading'
        );
        if (loadingMessageIndex !== -1) {
          chatHistory.value.splice(loadingMessageIndex, 1);
        }
  
        userMessage.value = '';
  
        // Прокручиваем вниз после получения ответа
        nextTick(() => {
          scrollToBottom();
        });
      });
  }
  </script>
  
  <style src="~/assets/stylus/pages/chatbot.styl"></style>
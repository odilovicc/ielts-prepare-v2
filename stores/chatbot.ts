// stores/chatbot.ts
import { defineStore } from 'pinia';
import { sendPrompt } from '~/utils/gemini';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export const useChatbotStore = defineStore('chatbot', () => {
    const isLoading = ref<boolean>(false);

    // История чата
    const chatHistory = ref<ChatMessage[]>([]);

    // Кэш для сохранения ответов на запросы
    const responseCache = new Map<string, string>();

    // Функция для отправки сообщения пользователя
    async function sendUserMessage(message: string): Promise<string> {
        isLoading.value = true;

        // Добавляем сообщение пользователя в историю чата
        chatHistory.value.push({ role: 'user', content: message });

        // Проверяем, есть ли ответ в кэше
        if (responseCache.has(message)) {
            const cachedResponse = responseCache.get(message);
            chatHistory.value.push({ role: 'assistant', content: cachedResponse! });
            isLoading.value = false;
            return cachedResponse!;
        }

        try {
            // Отправляем запрос к Gemini
            const response = await sendPrompt(`${message}`);

            // Сохраняем ответ в кэше
            responseCache.set(message, response);

            // Добавляем ответ ассистента в историю чата
            chatHistory.value.push({ role: 'assistant', content: response });

            isLoading.value = false;
            return response;
        } catch (error) {
            console.error("Ошибка при отправке сообщения:", error);
            isLoading.value = false;
            throw error;
        }
    }

    // Функция для очистки истории чата
    function clearChatHistory() {
        chatHistory.value = [];
    }

    return {
        sendUserMessage,
        chatHistory,
        clearChatHistory,
        isLoading,
    };
});
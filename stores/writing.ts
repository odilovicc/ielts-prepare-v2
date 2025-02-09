import { defineStore } from 'pinia';
import { sendPrompt } from '~/utils/gemini';

export const useWritingStore = defineStore('writing', () => {
    const isLoading = ref<boolean>(false);

    // Функция для генерации фидбека
    async function generateFeedback(essay: string): Promise<string> {
        isLoading.value = true;

        const prompt = `
      As an IELTS examinator, give a feedback for this essay. 
      Mention its vocabulary, grammar mistakes, and give an approximate score.
      (While giving your feedback, use HTML tags: 
      <h1> for titles with class "prompt-title" and 
      <p> for descriptions with class "prompt-description". 
      P.S. Don't include any head or title, just the body of your answer in HTML tags):
      ${essay}
    `;

        try {
            const response = await sendPrompt(prompt);
            return response;
        } catch (error) {
            console.error("Ошибка при генерации фидбека:", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    }

    return {
        generateFeedback,
        isLoading,
    };
});
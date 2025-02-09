import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCZIMYm29dRU2WUSm7Q7sZVQJhHu7T57nk"
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Функция для отправки запроса к Gemini
export const sendPrompt = async (prompt: string): Promise<string> => {
    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();

        // Очистка ответа (если нужно)
        const cleanedResponse = response
            .replace(/```html/g, '') // Убираем ```html
            .replace(/```/g, '');   // Убираем оставшиеся ```

        return cleanedResponse;
    } catch (error) {
        console.error("Ошибка при запросе к Gemini:", error);
        throw error;
    }
};

import { GoogleGenerativeAI as gayAi } from "@google/generative-ai"

export const useWritingStore = defineStore('writing', () => {

    const isLoading = ref<boolean>(false)
    const runtimeConfig = useRuntimeConfig()
    const gayAiKey = runtimeConfig.public.GOOGLE_KEY
    const genAi = new gayAi(gayAiKey)
    const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

    async function generateFeedback(essay: any) {
        isLoading.value = true;
        let prompt = `As an IELTS examinator, give a feedback for this essay. Mention its vocabulary, grammar mistakes and give approximate score (While giving your feedback, give it using HTML tags: h1 for titles with class prompt-title and <p> for giving an description with class prompt-description. P.S don't need any head,title, just body of your answer in html tags): 
            ${essay}`;
        return new Promise((resolve, reject) => {
            model.generateContent(prompt)
                .then((data) => {
                    let cleanedResponse = data.response.text()
                        .replace(/```html/g, '') // Убираем ```html
                        .replace(/```/g, '');   // Убираем оставшиеся ```
                    resolve(cleanedResponse);
                })
                .catch((err) => {
                    console.error(err);
                    reject(err);
                })
                .finally(() => (isLoading.value = false));
        });
    }
    
    return {
        generateFeedback,
        isLoading
    }
})
import { until } from "@vueuse/core";

export const useDictionaryStore = defineStore('dictionary', () => {
    const baseUrl = (endpoint: string) => `https://api.dictionaryapi.dev/api/v2/entries/en/${endpoint}`;
    const loadingRequest = ref<boolean>(false);

    async function fetchWord(word: string) {
        loadingRequest.value = true;

        try {
            const { data, error, status } = useFetch(baseUrl(word), {
                method: "GET",
                onResponseError({ response }) {
                    throw new Error(response._data?.title || "Unknown error");
                },
                onRequestError({ error }) {
                    throw new Error(error.message || "Request failed");
                },
            });

            // Дожидаемся обновления данных
            await until(() => status.value).toBe("success");

            if (error.value) {
                throw new Error(error.value.message || "Unknown error");
            }

            return data.value; // Возвращаем успешные данные
        } catch (err) {
            console.error("Fetch error:", err);
            throw err; // Пробрасываем ошибку дальше
        } finally {
            loadingRequest.value = false;
        }
    }

    return {
        fetchWord,
    };
});

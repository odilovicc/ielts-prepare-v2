<template>
    <div class="widget-container widget-dictionary">
        <AppIcon class="widget-icon" type="material" icon="book"/>
        <h1 class="widget-title">Vocabulary</h1>
        <p class="widget-description">Having trouble with finding translation of word? Find it from our Dictionary!</p>

        <div class="widget-dictionary-input-group">
            <AppFormInputText v-model="searchingWord" placeholder="Search..."/>
        <AppButton prefix-icon="search" type="surface" icon-type="material" @click="getWord"/>
        </div>
        <div class="widget-dictionary-result-wrapper">
            <div class="widget-dictionary-result" v-for="el in parsedData">
                <h1 class="widget-dictionary-result-word">{{ el.word }}</h1>
                <div class="widget-dictionary-result-definition" v-for="(element, idx) in el.definitions">
                    <p>{{idx + 1}}. {{ element.definitions[0] }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

const toast = useToast()

const searchingWord = ref()
const {fetchWord} = useDictionaryStore()
const result = ref([])

const parsedData = computed(() => {
    return result.value.map((response) => ({
    word: response.word,
    definitions: response.meanings.map((meaning) => ({
            definitions: meaning.definitions.map((def) => def.definition)
        }))
    }));
})

function getWord() {
    fetchWord(searchingWord.value)
        .then((data) => result.value = data)
        .catch(err => {
            toast.add({
                life: 3000,
                severity: "error",
                summary: err
            })
        })
}
</script>
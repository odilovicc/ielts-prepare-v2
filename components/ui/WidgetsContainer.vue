<template>
    <div class="widgets-container" ref="widContainer">
        <WidgetListening/>
        <WidgetAI/>
        <WidgetTodo/>
        <WidgetDictionary/>
    </div>
</template>
<script setup lang="ts">

const WidgetListening = defineAsyncComponent(() => import("./widgets/Listening.vue"))
const WidgetAI = defineAsyncComponent(() => import("./widgets/Ai.vue"))
const WidgetTodo = defineAsyncComponent(() => import("./widgets/Todo.vue"))
const WidgetDictionary = defineAsyncComponent(() => import("./widgets/Dictionary.vue"))


</script>
<style src="~/assets/stylus/components/ui/widgetscontainer.styl"></style>
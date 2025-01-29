<template>
	<div class="app-sorry">
		<img src="/images/image.png" />
		<p>{{ sorryText }}</p>
	</div>
</template>
<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		sorryText?: string;
	}>(),
	{
		sorryText: "Not found",
	},
);
</script>

<style scoped>
.app-sorry {
	display: flex;
	flex-direction: column;
    gap: 5px;
	align-items: center;
	text-align: center;

	img {
		width: 40px;
		height: 40px;
	}

	p {
		font-size: 14px;
		font-weight: 500;
	}
}
</style>

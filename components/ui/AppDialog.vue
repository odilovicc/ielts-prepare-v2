<template>
	<PDialog
		v-model:visible="visible"
		:modal="modal"
		:style="dialogStyle"
		:header="title"
		:draggable="draggable"
		:resizable="resizable"
		:closable="closable"
		v-bind="$attrs"
		@close="handleClose"
	>
		<slot></slot>
		<Divider class="mb-0" v-if="dividerFooter" />
		<template #footer v-if="dividerFooter">
			<slot
				name="footer"
				v-bind="{
					close: handleClose,
				}"
			></slot>
		</template>
	</PDialog>
</template>

<script setup lang="ts">
import type {IAppDialog} from "~/types/helpers";

const PDialog = defineAsyncComponent(() => import("primevue/dialog"));
const props = withDefaults(
	defineProps<{
		title?: string;
		modal?: boolean;
		draggable?: boolean;
		resizable?: boolean;
		closable?: boolean;
		width?: string;
		dividerFooter?: boolean;
	}>(),
	{
		dividerFooter: false,
		modal: true,
		closable: true
	},
);

const emit = defineEmits<{
	change: [key: string, visible: boolean];
}>();

const visible = ref(false);

const dialogStyle = computed(() => ({
	width: props.width || "50vw",
}));


const open = () => {
	visible.value = true;
	emit("change", "OPEN", visible.value);
};

const close = () => {
	visible.value = false;
	emit("change", "CLOSE", visible.value);
};

const handleClose = () => {
	close();
};

defineExpose<IAppDialog>({
	open,
	close,
	testFunc: () => visible.value,
});
</script>

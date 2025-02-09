<template>
    <div class="widget-container widget-todo">
        <AppIcon type="material" icon="checklist" class="widget-icon" />
        <h1 class="widget-title">
            Todo list
            <AppButton icon-type="material" class="widget-todo-add" type="surface" prefix-icon="add"
                @click="addTodoDialogVisible = true" />
        </h1>

        <div class="widget-todo-wrapper">

            <template v-if="incompleteTodos.length > 0">
                <div class="widget-todo-container" v-for="(el, idx) in incompleteTodos" :key="idx">
                    <h1 class="widget-todo-title">{{ idx + 1 }}. {{ el.title }}</h1>

                    <div class="widget-todo-actions">
                        <AppButton class="widget-todo-markdone" icon-type="material" prefix-icon="check"
                            @click="onMarkTodoAsDone(el)" />
                        <AppButton class="widget-todo-info" icon-type="material" prefix-icon="info"
                            @click="showTodoInfo(el)" />
                        <AppButton class="widget-todo-delete" type="danger" icon-type="material" prefix-icon="delete"
                            @click="onDeleteTodo(el)" />
                    </div>
                </div>
            </template>
            <template v-else>
                <AppSorry class="widget-todo-sorry" />
            </template>
        </div>
    </div>

    <!-- Диалог для информации о задаче -->
    <AppDialog ref="infoDialogVisible" :closable="true" header="Todo Info">
        <template #default>
            <p><strong>Title:</strong> {{ selectedTodo?.title }}</p>
            <p><strong>Description:</strong> {{ selectedTodo?.description }}</p>
            <p><strong>Status:</strong> {{ selectedTodo?.done ? "Done" : "Pending" }}</p>
        </template>
    </AppDialog>

    <!-- Диалог для добавления задачи -->
    <AppDialog :visible="addTodoDialogVisible" header="Add todo">
        <template #default>
            <AppForm :fields="addTodoFields" :submit-action="onAddTodo" ref="addTodoRef" :form-loading="isLoading">
                <template #footer="{ disabled, submitAction }">
                    <div class="flex gap-5">
                        <AppButton type="primary-outlined" :disabled="disabled" :loading="disabled" label="Cancel"
                            @click="addTodoDialogVisible = false" />
                        <AppButton label="Add" :disabled="disabled" :loading="disabled" @click="submitAction" />
                    </div>
                </template>
            </AppForm>
        </template>
    </AppDialog>
</template>
  
  <script setup lang="ts">
  import { type FormField, FormFieldType, ValidationRuleType } from "~/types/form";
  import type { IAnyObject } from "~/types/helpers";
  
  const store = useTodoStore();
  const toast = useToast();
  const { fetchUserTodos, addUserTodo, markTodoAsDone, deleteTodo } = store;
  const { userTodos } = storeToRefs(store);
  
  const addTodoDialogVisible = ref(false);
  const infoDialogVisible = ref();
  const selectedTodo = ref(null);
  const isLoading = ref(false);
  const incompleteTodos = computed(() => {
  return userTodos.value?.filter(todo => !todo.done) || [];
});

  
  const addTodoFields = ref<FormField[][]>([
    [
      {
        label: "Title",
        key: "title",
        type: FormFieldType.TEXT,
        validationRules: [ValidationRuleType.REQUIRED],
      },
      {
        label: "Description",
        key: "description",
        type: FormFieldType.TEXT,
        validationRules: [ValidationRuleType.REQUIRED],
      },
    ],
  ]);
  
  function onAddTodo(fields: IAnyObject) {
    isLoading.value = true;
    addUserTodo(fields)
      .then((data) => {
        toast.add({ life: 3000, severity: "success", summary: data });
        fetchUserTodos();
      })
      .catch((err) => {
        toast.add({ life: 3000, severity: "error", summary: err });
      })
      .finally(() => {
        isLoading.value = false;
        addTodoDialogVisible.value = false;
      });
  }
  
  function onMarkTodoAsDone(idx: number) {
    deleteTodo(idx).then(() => {
      toast.add({ life: 3000, severity: "success", summary: "Задача завершена!" });
    });
  }
  
  function onDeleteTodo(idx: number) {
    deleteTodo(idx).then(() => {
      toast.add({ life: 3000, severity: "success", summary: "Задача удалена!" });
    });
  }
  
  function showTodoInfo(todo: IAnyObject) {
    selectedTodo.value = todo;
    infoDialogVisible.value.open();
  }
  
  onMounted(() => {
    fetchUserTodos().catch((err) => {
      toast.add({ life: 3000, severity: "error", summary: err });
    });
  });
  </script>
  
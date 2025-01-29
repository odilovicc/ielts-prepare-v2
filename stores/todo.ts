import { getDatabase, update } from "firebase/database";
import { readData, writeData, updateData, buildPath, getCurrentUserId } from "~/composable/dbActions";
import type { ITodoBody } from "~/types/helpers";

export const useTodoStore = defineStore("todo", () => {
  const userTodos = ref<ITodoBody[] | null>([]);
  const authStore = useAuthStore();
  const { userData } = storeToRefs(authStore);
  const db = getDatabase()

  // Получить все задачи пользователя
  async function fetchUserTodos() {
    try {
      const data = await readData("/userInfo/todos/");
      userTodos.value = data || [];
    } catch (err) {
      console.error("Ошибка получения задач:", err);
      throw err;
    }
  }

  // Добавить задачу
  function addUserTodo(todo: ITodoBody) {
    return new Promise(async (resolve, reject) => {
      try {
        const newTodo = { ...todo, done: false };
        await writeData(newTodo, "/userInfo/todos/");
        await fetchUserTodos(); // Обновляем список после добавления
        resolve("Задача добавлена!");
      } catch (err) {
        reject(err);
      }
    });
  }

  // Пометить задачу завершённой
  async function markTodoAsDone(idx: number) {
    try {
      const todos = [...(userTodos.value || [])];
      console.log(todos[idx]);
  
      if (todos[idx]) {
        todos[idx].done = true;
        
        await getCurrentUserId()
        console.log("pathBefore");
        const path = await buildPath("/userInfo/todos/");
        console.log("path", path);
        console.log("idx", idx);
  
        if (typeof path === "string" && path.length > 0) { // Только если path - строка
          const todoPath = `${path}/${idx}`;
          console.log("todoPath", todoPath);
          await update(ref(db, todoPath), { done: true });
          await fetchUserTodos(); // Обновляем список
        } else {
          console.error("Ошибка: path имеет некорректное значение", path);
        }
      }
    } catch (err) {
      console.error("Ошибка завершения задачи:", err);
    }
  }
  
  
  async function deleteTodo(idx: number) {
    try {
      const todos = [...(userTodos.value || [])];
      todos.splice(idx, 1);
      await updateData(todos, "userInfo/todos"); // Передаем массив todos
      await fetchUserTodos(); // Обновляем список
    } catch (err) {
      console.error("Ошибка удаления задачи:", err);
    }
  }

  return {
    fetchUserTodos,
    userTodos,
    addUserTodo,
    markTodoAsDone,
    deleteTodo,
  };
});

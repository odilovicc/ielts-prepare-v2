import { ref, set, get, update, remove, getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const db = getDatabase();

/**
 * Get the current user's ID from Firebase Authentication.
 * @returns {Promise<string|null>} - Current user ID or null if not logged in.
 */
export function getCurrentUserId(): Promise<string | null> {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Отписываемся после получения пользователя
      resolve(user ? user.uid : null);
    });
  });
}

/**
 * Build a database path using the current user ID and optional endpoint.
 * @param {string} [endpoint] - Optional endpoint to append to the user path.
 * @returns {Promise<string|null>} - Full database path or null if user is not logged in.
 */
export async function buildPath(endpoint = ""): Promise<string | null> {
  const userId = await getCurrentUserId();
  if (!userId) {
    console.error("Пользователь не авторизован.");
    return null;
  }
  return `users/${userId}${endpoint ? "/" + endpoint : ""}`;
}

/**
 * Create or Update Data
 * @param {object} data - Данные для записи.
 * @param {string} [endpoint] - Опциональный путь внутри пользователя.
 * @returns {Promise<void>} - Промис завершения операции.
 */
export async function writeData(data, endpoint = ""): Promise<void> {
  try {
    const path = await buildPath(endpoint);
    if (!path) return;

    const existingData = await readData(endpoint);
    if (Array.isArray(existingData)) {
      existingData.push(data);
      await set(ref(db, path), existingData);
    } else {
      await set(ref(db, path), [data]);
    }

    console.log(`Данные успешно записаны по пути: ${path}`);
  } catch (error) {
    console.error("Ошибка записи данных:", error);
  }
}

/**
 * Read Data
 * @param {string} [endpoint] - Опциональный путь внутри пользователя.
 * @returns {Promise<object|null>} - Данные, считанные из базы данных.
 */
export async function readData(endpoint = ""): Promise<object | null> {
  try {
    const path = await buildPath(endpoint);
    if (!path) return null;

    const snapshot = await get(ref(db, path));
    if (snapshot.exists()) {
      console.log("Данные считаны:", snapshot.val());
      return snapshot.val();
    } else {
      console.log("Данных не найдено по пути:", path);
      return null;
    }
  } catch (error) {
    console.error("Ошибка чтения данных:", error);
    return null;
  }
}

/**
 * Update Data
 * @param {object} data - Данные для обновления.
 * @param {string} [endpoint] - Опциональный путь внутри пользователя.
 * @returns {Promise<void>} - Промис завершения операции.
 */
export async function updateData(data, endpoint = ""): Promise<void> {
  try {
    const path = await buildPath(endpoint);
    if (!path) return;

    await set(ref(db, path), data); // Используем set для полной замены данных
    console.log(`Данные успешно обновлены по пути: ${path}`);
  } catch (error) {
    console.error("Ошибка обновления данных:", error);
  }
}

/**
 * Delete Data
 * @param {string} [endpoint] - Опциональный путь внутри пользователя.
 * @returns {Promise<void>} - Промис завершения операции.
 */
export async function deleteData(endpoint = ""): Promise<void> {
  try {
    const path = await buildPath(endpoint);
    if (!path) return;

    await remove(ref(db, path));
    console.log(`Данные успешно удалены по пути: ${path}`);
  } catch (error) {
    console.error("Ошибка удаления данных:", error);
  }
}
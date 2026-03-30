import { ref, set, remove, get } from "firebase/database";
import { db } from "../firebase";

// ❤️ додати в favorites
export const addToFavorites = async (userId: string, psychologistId: string) => {
  await set(ref(db, `favorites/${userId}/${psychologistId}`), true);
};

// ❌ видалити з favorites
export const removeFromFavorites = async (userId: string, psychologistId: string) => {
  await remove(ref(db, `favorites/${userId}/${psychologistId}`));
};

// 📥 отримати всі favorites
export const getFavorites = async (userId: string) => {
  const snapshot = await get(ref(db, `favorites/${userId}`));

  if (!snapshot.exists()) return [];

  return Object.keys(snapshot.val()); // масив id
};
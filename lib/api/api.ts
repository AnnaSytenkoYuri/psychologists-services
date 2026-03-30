import { ref, get, query, limitToFirst } from "firebase/database";
import { db } from "../firebase";
import { Psychologist } from "@/types/psychologists";


export const getPsychologists = async (
  limit: number
): Promise<Psychologist[]> => {
  const dbRef = ref(db, "/");

  const snapshot = await get(query(dbRef, limitToFirst(limit)));

  if (!snapshot.exists()) return [];

  const data = snapshot.val();

  return Object.entries(data).map(([id, value]) => ({
    ...(value as Psychologist),
    id, 
  }));
};
const data = await getPsychologists(3);
console.log("DATA:", data);
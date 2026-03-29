import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
  } from "firebase/auth";
  
  import { auth } from "./firebase";
  
  // 🔐 Реєстрація
  export const register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  // 🔑 Логін
  export const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  // 🚪 Logout
  export const logout = async () => {
    await signOut(auth);
  };


export const subscribeToAuth = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
  };
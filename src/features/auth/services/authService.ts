// src/services/authService.ts
import { auth } from "../../../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth";

export const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

export const logout = async () => {
    await signOut(auth);
};

export const subscribeAuth = (
    callback: (user: User | null) => void,
    onError: (error: Error) => void
) => {
    return onAuthStateChanged(auth, callback, onError);
};

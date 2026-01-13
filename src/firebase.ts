import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDqKlRAZO4gu8lK1GQPy8U29jrRoykDeXs",
    authDomain: "dira-45621.firebaseapp.com",
    projectId: "dira-45621",
    storageBucket: "dira-45621.firebasestorage.app",
    messagingSenderId: "399647812382",
    appId: "1:399647812382:web:fbde22b3b6932e49ecf70f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

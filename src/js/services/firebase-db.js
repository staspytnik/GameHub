// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {closeModal} from "../components/modal.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


// Initialize Firebase
const URL = 'https://gamehub---library-default-rtdb.europe-west1.firebasedatabase.app/library.json'

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function postGameData(data) {
    const response = await fetch(URL, {
        method: 'POST',
        headers: {
            contentType: 'application/json',
        },
        body: JSON.stringify(data),
    })

    closeModal()

    if (!response.ok) {
        throw new Error('Failed to post game data');
    }

    return await response.json();
}
export async function getGamesData() {
    try {
        const response = await fetch(URL)
        return await response.json()
    } catch (error) {
        console.error(error);
    }
}
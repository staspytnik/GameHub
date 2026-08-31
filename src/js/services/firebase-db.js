// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD5vTJQA-xYzT8sJsKLMw7L69vE4_0-r1w",
    authDomain: "gamehub---library.firebaseapp.com",
    projectId: "gamehub---library",
    storageBucket: "gamehub---library.firebasestorage.app",
    messagingSenderId: "606270874971",
    appId: "1:606270874971:web:90be49d2062f958015667e",
    measurementId: "G-P85ET4Z8W7"
};

// Initialize Firebase
const URL = 'https://gamehub---library-default-rtdb.europe-west1.firebasedatabase.app/library.json'

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function postGameData(data) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    } catch (error) {
        console.error(error);
    }
}
export async function getGamesData() {
    try {
        const response = await fetch(URL)
        return await response.json()
    } catch (error) {
        console.error(error);
    }
}
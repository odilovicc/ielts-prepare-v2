import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {

  apiKey: "AIzaSyDgZVjtTnbgQTAaOZjKMhno_eUorHobc6I",

  authDomain: "new-ielts-nuxt.firebaseapp.com",

  databaseURL: "https://new-ielts-nuxt-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "new-ielts-nuxt",

  storageBucket: "new-ielts-nuxt.firebasestorage.app",

  messagingSenderId: "154376173534",

  appId: "1:154376173534:web:05aa10e94e905c0f9ccf4f"

};



const app = initializeApp(firebaseConfig);

export default function useFirebaseClient() {
  const auth = getAuth(app);
  const db = getDatabase(app);
  return { app, auth, db };
}

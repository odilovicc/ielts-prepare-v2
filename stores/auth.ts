import { defineStore } from "pinia";
import { ref } from "vue";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    updateProfile, 
    type User 
} from "firebase/auth";
import { ref as databaseRef, set } from "firebase/database"; // Работаем с Realtime Database
import useFirebaseClient from "~/composable/firebase";

export const useAuthStore = defineStore("auth", () => {
    const { auth, db } = useFirebaseClient();
    const client = ref<User | null>(null);
    const error = ref<any>(null);
    const isAuthenticated = ref<boolean>(false);
    const username = ref<string>("")
    const userData = ref()

    function setAuthenticated(bol: boolean) {
        isAuthenticated.value = bol;
    }

    async function onUserRegister(fields: any) {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, fields.email, fields.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    client.value = user;

                    updateProfile(user, {
                        displayName: fields.login,
                    });

                    // Сохраняем данные в Realtime Database
                    const userRef = databaseRef(db, `users/${user.uid}`); // Ссылка на узел в базе данных
                    set(userRef, {
                        login: fields.login,
                        name: user.displayName,
                        email: user.email,
                        userInfo: {
                            status: "Newbie",
                        },
                    });

                    isAuthenticated.value = true;
                    resolve(user);
                })
                .catch((err) => {
                    error.value = err;
                    reject(err);
                });
        });
    }

    async function onUserLogin(fields: any) {
        return new Promise((resolve, reject) => {
            signInWithEmailAndPassword(auth, fields.email, fields.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    client.value = user;
                    isAuthenticated.value = true;
                    resolve(user);
                })
                .catch((err) => {
                    error.value = err;
                    reject(err);
                });
        });
    }

    return {
        onUserRegister,
        onUserLogin,
        isAuthenticated,
        setAuthenticated,
        username,
        userData
    };
});

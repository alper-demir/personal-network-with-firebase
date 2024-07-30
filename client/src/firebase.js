import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import { store } from "./store";
import { setUser } from "./stores/user";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export const register = async (email, password, username) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(auth.currentUser, {
            displayName: username
        })
        toast.success("Hesabınız oluşturuldu.");
        await logout();
        return userCredential;
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export const login = async (email, password) => {
    try {
        const loginCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(loginCredential.user);
        toast.success("Giriş başarılı.")
        return loginCredential.user
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

export const authStatus = () => {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const serializedUser = {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                };
                resolve(user);
                store.dispatch(setUser(serializedUser));
            } else {
                console.log("No user logged in");
                store.dispatch(setUser({}))
                resolve(null);
            }
        });
    });
}

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        toast.error(error.message);
    }
}

export default app;
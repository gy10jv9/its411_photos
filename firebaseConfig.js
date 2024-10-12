import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
let app;
if (!app) {
    const firebaseConfig = {
        apiKey: "AIzaSyDUmZtPaaOZLW99GKEflfn7shBeHs24a5g",
        authDomain: "its411-acfea.firebaseapp.com",
        projectId: "its411-acfea",
        storageBucket: "its411-acfea.appspot.com",
        messagingSenderId: "622003543241",
        appId: "1:622003543241:web:093fc2095ce5ee5701c118",
        measurementId: "G-F9HH2ZV6QK"
    };

    app = initializeApp(firebaseConfig);
}

const db = getFirestore(app); 
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const storage = getStorage(app);

export { db, auth, storage };
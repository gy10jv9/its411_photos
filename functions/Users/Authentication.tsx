import { useRegistrationFormData } from "@/app/auth/registration/regData";
import { db } from "@/firebaseConfig";
import { useRouter } from "expo-router";
import { collection, addDoc,query, where, getDocs, updateDoc,doc } from 'firebase/firestore';
import { useState } from "react";
const router = useRouter();
const { formData, setFormData } = useRegistrationFormData();
const [error, setError] = useState('');
export const Register =  async () => {
    const user = {
        ...formData,
        createdAt: new Date(),
        firstLogin: true
      };
      const docRef = await addDoc(collection(db, 'Users'), user);
      console.log("User registered with ID: ", docRef.id);
      router.push('/');
}

export const Login = async () => {
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('email', '==', formData.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.error('No user found with this email');
        setError('Invalid email or password'); 
        return;
    }
    querySnapshot.forEach(async (doc) => {
        const userDoc = doc.data();
        if (userDoc.password !== formData.password) {
            console.error('Password does not match');
            setError('Invalid email or password');
            return; 
        }
        console.log('Login successful');
        if (userDoc.firstLogin) {
            console.log(`Welcome, ${userDoc.firstName || "User"}!`);
            await updateDoc(userDoc.firstLogin, { firstLogin: false });
        }
        router.push('/');
    });
};
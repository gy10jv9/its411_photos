import { useRouter } from "expo-router";
import { addDoc, collection, query, where, getDocs, updateDoc, doc, getFirestore } from '@react-native-firebase/firestore';
import { useState } from "react";
import { useRegistrationFormData } from "@/app/auth/registration/regData"; 
import '@react-native-firebase/app';
const firestore = getFirestore();
const Register = async () => {
  const { formData } = useRegistrationFormData();
  const router = useRouter();
  const [error, setError] = useState('');

  try {
    const user = {
      ...formData,
      createdAt: new Date(),
      firstLogin: true,
    };
    const docRef = await addDoc(collection(firestore, 'Users'), user);
    console.log("User registered with ID: ", docRef.id);
    router.push('/');
  } catch (e) {
    console.error("Error registering user: ", e);
    setError('Error occurred during registration.');
  }
};

const Login = async () => {
  const { formData } = useRegistrationFormData();
  const router = useRouter();
  const [error, setError] = useState('');

  try {
    const usersRef = collection(firestore, 'Users'); // Pass Firestore instance here as well
    const q = query(usersRef, where('email', '==', formData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No user found with this email');
      setError('Invalid email or password');
      return;
    }

    querySnapshot.forEach(async (docSnapshot) => {
      const userDoc = docSnapshot.data();
      if (userDoc.password !== formData.password) {
        console.error('Password does not match');
        setError('Invalid email or password');
        return;
      }

      console.log('Login successful');
      if (userDoc.firstLogin) {
        console.log(`Welcome, ${userDoc.firstName || "User"}!`);

        // Update firstLogin field to false
        const userDocRef = doc(firestore, 'Users', docSnapshot.id);
        await updateDoc(userDocRef, { firstLogin: false });
      }

      router.push('/');
    });
  } catch (e) {
    console.error("Error during login: ", e);
    setError('Error occurred during login.');
  }
};

export { Register, Login };

import { addDoc, collection, query, where, getDocs, updateDoc, doc } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
const Register = async (formData: any) => {
  try {
    const user = {
      ...formData,
      createdAt: new Date(),
      firstLogin: true,
    };
    const usersCollection = firestore().collection('Users');
    const existingUserQuery = query(usersCollection, where('email', '==', formData.email));
    const existingUserSnapshot = await getDocs(existingUserQuery);
    if (!existingUserSnapshot.empty) {
      return { success: false, message: 'A user with this email already exists.' }; 
    }
    const docRef = await usersCollection.add(user);
    console.log("User registered with ID: ", docRef.id);
    return { success: true };
  } catch (e) {
    console.error("Error registering user: ", e);
    return { success: false, message: 'Error occurred during registration.' }; 
  }
};
const Login = async (formData: any) => {
  try {
    const usersRef = collection(firestore(), 'Users');
    const q = query(usersRef, where('email', '==', formData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, message: 'No user found with this email.' }; 
    }

    for (const docSnapshot of querySnapshot.docs) {
      const userDoc = docSnapshot.data();
      if (userDoc.password !== formData.password) {
        return { success: false, message: 'Password does not match.' }; 
      }
      if (userDoc.firstLogin) {
        console.log(`Welcome, ${userDoc.firstName || "User"}!`);
        const userDocRef = doc(firestore(), 'Users', docSnapshot.id);
        await updateDoc(userDocRef, { firstLogin: false });
      }
    }
    
    return { success: true }; // Return success status
  } catch (e) {
    console.error("Error during login: ", e);
    return { success: false, message: 'Error occurred during login.' }; 
  }
};

export { Register, Login };

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
    const docRef = await usersCollection.add(user);

    console.log("User registered with ID: ", docRef.id);
    return null;
  } catch (e) {
    console.error("Error registering user: ", e);
    return 'Error occurred during registration.'; 
  }
};

const Login = async (formData: any) => {
  try {
    const usersRef = collection(firestore(), 'Users');
    const q = query(usersRef, where('email', '==', formData.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error('No user found with this email');
      return 'Invalid email or password'; 
    }

    for (const docSnapshot of querySnapshot.docs) {
      const userDoc = docSnapshot.data();
      if (userDoc.password !== formData.password) {
        console.error('Password does not match');
        return 'Invalid email or password'; 
      }
      console.log('Login successful');
      if (userDoc.firstLogin) {
        console.log(`Welcome, ${userDoc.firstName || "User"}!`);
        const userDocRef = doc(firestore(), 'Users', docSnapshot.id);
        await updateDoc(userDocRef, { firstLogin: false });
      }
    }
    return null;
  } catch (e) {
    console.error("Error during login: ", e);
    return 'Error occurred during login.'; 
  }
};

export { Register, Login };

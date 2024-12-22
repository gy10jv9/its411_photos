import { addDoc, collection, query, where, getDocs, updateDoc, doc, getDoc } from '@react-native-firebase/firestore';
import auth, { getAuth } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { User } from '@/Interface/interface';
const usersData = firestore().collection('UsersData');

const Register = async (formData: any) => {
  const { email, password, birthDate, gender, firstName, lastName } = formData;
  if (!email || !password || !birthDate || !gender || !firstName || !lastName) {
    console.error('Missing required fields.');
    return { success: false, message: 'Missing required fields' };
  }

  try {
    const res = await auth().createUserWithEmailAndPassword(email as string, password as string);
    if (!res.user) {
      console.error('Unable to create user');
      return { success: false, message: 'User creation failed' };
    }
    const userUID = res.user.uid;
    try {
      await usersData.add({
        birthDate,
        gender,
        lastName,
        firstName,
        createdAt: new Date(),
        firstLogin: true,
        userUID
      });
      return { success: true, uid: userUID };
    } catch (error: any) {
      console.error('Unable to save user data in Firestore:', error.message);
      return { success: false, message: 'User creation failed. Check fields.' };
    }
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.error('Email already in use');
      return { success: false, message: 'Email already registered' };
    } else {
      console.error('Unable to create user:', error.message);
      return { success: false, message: 'User creation failed' };
    }
  }
};
const Login = async (formData: any) => {
  const { email, password } = formData;
  if (!email || !password) {
    console.error("Email or password is missing.");
    return { success: false, message: "Email or password is missing." };
  }
  try {
    const res = await auth().signInWithEmailAndPassword(email as string, password as string);
    const userUID = res.user?.uid;
    if (!userUID) {
      return { success: false, message: "Wala uid." };
    }
    const data = {
      useruid: userUID,
      username: ""
    }
    const q = query(usersData, where('userUID', '==', userUID));
    const querySnapshot = await getDocs(q);
    for (const docSnapshot of querySnapshot.docs) {
      const userDoc = docSnapshot.data();
      data.username = userDoc.firstName
      if (userDoc.firstLogin) {
        console.log(`Welcome, ${userDoc.firstName || "User"}!`);
        const userDocRef = doc(firestore(), 'UsersData', docSnapshot.id);
        await updateDoc(userDocRef, { firstLogin: false });
      }
    }
    return { success: true, data };
  } catch (error: any) {
    console.error("Error during login:", error);
    if (error.code === 'auth/user-not-found') {
      return { success: false, message: "No user found with this email." };
    } else if (error.code === 'auth/wrong-password') {
      return { success: false, message: "Password does not match." };
    } else {
      return { success: false, message: "An error occurred during login." };
    }
  }
};

const fetchUserDetails = async (userid: string | null) => {
  try {
    if (!userid) {
      return { success: false, message: "No ID provided.", data: [] };
    }

    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser || currentUser.uid !== userid) {
      return { success: true, message: "No authenticated user available for this ID.", data: [] };
    }

    const email = currentUser.email || "No email available";
    const usersDataRef = collection(firestore(), "UsersData");
    const q = query(usersDataRef, where("userUID", "==", userid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: true, message: "No entry available for this ID.", data: [] };
    }

    const entryData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      email,
    })) as User[];

    return { success: true, data: entryData, message: "User details fetched successfully." };
  } catch (err) {
    console.error("Error fetching user details: ", err);
    return { success: false, message: "Error occurred while fetching user details.", data: [] };
  }
};

export { Register, Login, fetchUserDetails };

// import { StyledView, StyledText, StyledTextInput, StyledPressable } from '../../components/StyledComponents'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import {  Switch } from 'react-native'
// import { useColorSchemeContext } from '../../context/ColorSchemeContext'

// const Login = () => {
//     const  { colorScheme, toggleColorScheme } = useColorSchemeContext()

//     return (
//         <SafeAreaView>
//             <StyledView className='dark:bg-slate-500'>
//                 <StyledText> Login Page </StyledText>
//                 <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Username" />
//                 <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Password" />
//                 <StyledPressable className="bg-blue-500 p-2 rounded">
//                     <StyledText className="text-white text-center"> Loginnnn </StyledText>
//                 </StyledPressable>
//             </StyledView>

//             <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
//         </SafeAreaView>
//   );
// }

// export default Login;
import React, {useState} from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { View, Button } from 'react-native';
const db = getFirestore();

const addUser = async () => {
  const usersCollection = collection(db, 'users');

  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    age: 30
  };

  try {
    const docRef = await addDoc(usersCollection, user);
    console.log(`User added with ID: ${docRef.id}`);
  } catch (error) {
    console.error(`Error adding user: ${error}`);
  }
};

const Login = () => {
  return (
    <View>
      <Button title="Add User" onPress={addUser} />
    </View>
  );
};

export default Login;
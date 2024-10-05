import React, { useState } from 'react';
import { StyledView, StyledText, StyledTextInput, StyledPressable } from '../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorSchemeContext } from '../../context/ColorSchemeContext';
import { useRouter, Href } from 'expo-router';
import { routes } from '@/constants/routes';
import { db } from '../../firebaseConfig';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';

const Signin = () => {
    const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('');
    const handleLogin = async () => {
        try {
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
                    await updateDoc(doc.ref, {
                        firstLogin: false
                      });
                      console.log(userDoc)
                }
                router.push('/');
            });
        } catch (error) {
            console.error('Login failed:', error);
            setError('Error logging in. Please try again.');
        }
    };
    
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <StyledView className='flex flex-col items-center justify-center h-screen w-[100vw] px-8'>
                <StyledText className='text-xl font-bold'>Sign In</StyledText>
                {error ? <StyledText className='text-red-500'>{error}</StyledText> : null}
                <StyledTextInput
                    className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full'
                    placeholder='Email'
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                />
                <StyledTextInput
                    className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full'
                    placeholder='Password'
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                />
                <StyledPressable
                    className='bg-indigo-700 text-white py-2 w-full rounded-full my-0.5'
                    onPress={handleLogin}
                >
                    <StyledText className='text-white'>Login</StyledText>
                </StyledPressable>

                <StyledView className='flex flex-row items-center justify-center mt-4'>
                    <StyledText>I don't have an account.</StyledText>
                    <StyledPressable onPress={() => router.push(routes.registration.part1 as Href)}>
                        <StyledText className='text-blue-500'> Register Here </StyledText>
                    </StyledPressable>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
};

export default Signin;

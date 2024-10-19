import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../components/StyledComponents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorSchemeContext } from '../../context/ColorSchemeContext'
import { useRouter, Href } from 'expo-router'
import { routes } from '@/constants/routes';
import { Login } from '@/functions/users/users';
import { useRegistrationFormData } from './registration/regData';
const Signin = () => {
    const  { colorScheme, toggleColorScheme } = useColorSchemeContext()
    const router = useRouter()
    const { formData, setFormData } = useRegistrationFormData();
    const handleLogin = async () => {
        const result = await Login(formData);
        console.log(result)
        if (result) {
            router.push('/' as Href)
        } else {
          alert("Login successful!");
          
        }
      };
    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <StyledView className='flex flex-col items-center justify-center h-screen w-[100vw] px-8'>
                <StyledText className=''> Sign in </StyledText>
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Email' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Password' />
                <StyledPressable className='bg-indigo-700 text-white py-2 w-full rounded-full my-0.5' onPress={() => handleLogin()}>
                    <StyledText className='text-white'>Login</StyledText>
                </StyledPressable>

                {/* para sa register */}
                <StyledView className='flex flex-row items-center justify-center mt-4'>
                    <StyledText> I don't have an account. </StyledText>
                    <StyledPressable onPress={() => router.push(routes.registration.part1 as Href)}>
                        <StyledText> Register Here </StyledText>
                    </StyledPressable>
                </StyledView>
            </StyledView>
        </SafeAreaView>
  );
}

export default Signin;
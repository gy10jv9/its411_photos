import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../components/StyledComponents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorSchemeContext } from '../../context/ColorSchemeContext'

const Login = () => {
    const  { colorScheme, toggleColorScheme } = useColorSchemeContext()

    return (
        <SafeAreaView>
            <StyledView className='flex flex-col items-center justify-center h-screen w-[100vw] px-8'>
                <StyledText className=''> Login </StyledText>
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Email' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Password' />
                <StyledPressable className='bg-indigo-700 text-white py-2 w-full rounded-full my-0.5' onPress={() => console.log('Login')}>
                    <StyledText className='text-white'>Login</StyledText>
                </StyledPressable>
            </StyledView>
        </SafeAreaView>
  );
}

export default Login;
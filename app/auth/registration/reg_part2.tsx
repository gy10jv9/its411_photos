import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorSchemeContext } from '../../../context/ColorSchemeContext'
import { useRouter, Href } from 'expo-router'
import { routes } from '@/constants/routes';

const Reg_Part2 = () => {
    const  { colorScheme, toggleColorScheme } = useColorSchemeContext()
    const router = useRouter()

    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <StyledView className='flex flex-col items-center justify-center h-screen w-[100vw] px-8'>
                <StyledText className=''> Great! Let's wrap up your account </StyledText>
                <StyledText className='text-gray-500'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. </StyledText>
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Email' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Password' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Confirm Password' />
                
                <StyledPressable className='bg-indigo-700 text-white py-2 w-full rounded-full my-0.5' onPress={() => router.push("/" as Href)}>
                    <StyledText className='text-white'> Register </StyledText>
                </StyledPressable>

                {/* para sa register */}
                <StyledView className='flex flex-row items-center justify-center mt-4'>
                    <StyledText> I have an account. </StyledText>
                    <StyledPressable onPress={() => router.push(routes.signin as Href)}>
                        <StyledText> Sign In Here </StyledText>
                    </StyledPressable>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
}

export default Reg_Part2;
import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorSchemeContext } from '../../../context/ColorSchemeContext'
import { useRouter } from 'expo-router'

const Reg_Part1 = () => {
    const  { colorScheme, toggleColorScheme } = useColorSchemeContext()
    const router = useRouter()

    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/')}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <StyledView className='flex flex-col items-center justify-center h-screen w-[100vw] px-8'>
                <StyledText className=''> Let's get to know each other </StyledText>
                <StyledText className='text-gray-500'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. </StyledText>
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='First Namae' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Last Name' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Date of Birth' />
                <StyledTextInput className='bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full' placeholder='Gender' />

                <StyledPressable className='bg-indigo-700 text-white py-2 w-full rounded-full my-0.5' onPress={() => router.push("/userAuth/registration/part2")}>
                    <StyledText className='text-white'> Next Step </StyledText>
                </StyledPressable>

                {/* para sa register */}
                <StyledView className='flex flex-row items-center justify-center mt-4'>
                    <StyledText> I have an account. </StyledText>
                    <StyledPressable onPress={() => router.push("/userAuth/signin")}>
                        <StyledText> Sign In Here </StyledText>
                    </StyledPressable>
                </StyledView>
            </StyledView>
        </SafeAreaView>
    );
}

export default Reg_Part1;
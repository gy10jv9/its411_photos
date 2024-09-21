import { StyledView, StyledText, StyledTextInput, StyledPressable } from '../../components/StyledComponents'
import { SafeAreaView } from 'react-native-safe-area-context'
import {  Switch } from 'react-native'
import { useColorSchemeContext } from '../../context/ColorSchemeContext'

const Login = () => {
    const  { colorScheme, toggleColorScheme } = useColorSchemeContext()

    return (
        <SafeAreaView>
            <StyledView className='dark:bg-slate-500'>
                <StyledText> Login Page </StyledText>
                <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Username" />
                <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Password" />
                <StyledPressable className="bg-blue-500 p-2 rounded">
                    <StyledText className="text-white text-center"> Loginnnn </StyledText>
                </StyledPressable>
            </StyledView>

            <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
        </SafeAreaView>
  );
}

export default Login;
import { StyledView, StyledText, StyledTextInput, StyledPressable } from '../../components/StyledComponents'
import { useColorSchemeContext } from '../../context/ColorSchemeContext'
import {  Switch } from 'react-native'

const Registration = () => {
	const  { colorScheme, toggleColorScheme } = useColorSchemeContext()

    return (
		<StyledView className='dark:bg-slate-500'>
			<StyledText className="text-2xl font-bold mb-4"> Registration Page </StyledText>
			<StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Username" />
			<StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Email" />
			<StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Password" />
			<StyledPressable className="bg-blue-500 p-2 rounded">
				<StyledText className="text-white text-center"> Register </StyledText>
			</StyledPressable>

			<Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
    	</StyledView>
    );
}

export default Registration;
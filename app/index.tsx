import {  Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledView, StyledText, StyledPressable } from '../components/StyledComponents'
import { useColorSchemeContext } from '../context/ColorSchemeContext'

const Home = () => {
	const  { colorScheme, toggleColorScheme } = useColorSchemeContext()
	const router = useRouter()

	console.log(colorScheme)

	return (
		<SafeAreaView>
			<StyledView className='dark:bg-slate-900'>
				<StyledText className="text-red-500 text-xl"> This is the home screen. </StyledText>
				<StyledPressable className="mt-4 p-2 bg-gray-500 rounded" onPress={() => router.push('/auth/login')}>
					<StyledText className="text-white"> Login </StyledText>
				</StyledPressable>
				<StyledPressable className="mt-4 p-2 bg-gray-500 rounded" onPress={() => router.push("/auth/registration")}>
					<StyledText className="text-white"> Register </StyledText>
				</StyledPressable>       
			</StyledView>

			<Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />

		</SafeAreaView>
	)
}

export default Home
import { Switch } from 'react-native'
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
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push("/userAuth/signin")}>
					<StyledText className="text-white"> Signin </StyledText>
				</StyledPressable>
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push("/userAuth/registration/part1")}>
					<StyledText className="text-white"> Register </StyledText>
				</StyledPressable>    
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push("/highlights/addDay")}>
					<StyledText className="text-white"> Add Highlight </StyledText>
				</StyledPressable>
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push("/tests/camera")}>
					<StyledText className="text-white"> test camera </StyledText>
				</StyledPressable>         
			</StyledView>

			<Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />

		</SafeAreaView>
	)
}

export default Home
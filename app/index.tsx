import {  Switch } from 'react-native'
import { useRouter, Href } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledView, StyledText, StyledPressable } from '../components/StyledComponents'
import { useColorSchemeContext } from '../context/ColorSchemeContext'
import { routes } from '@/constants/routes';

const Home = () => {
	const  { colorScheme, toggleColorScheme } = useColorSchemeContext()
	const router = useRouter()

	console.log(colorScheme)

	return (
		<SafeAreaView>
			<StyledView className='dark:bg-slate-900'>
				<StyledText className="text-red-500 text-xl"> This is the home screen. </StyledText>
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push(routes.signin as Href)}>
					<StyledText className="text-white"> Signin </StyledText>
				</StyledPressable>
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push(routes.registration.part1 as Href)}>
					<StyledText className="text-white"> Register </StyledText>
				</StyledPressable>    
				<StyledPressable className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5" onPress={() => router.push(routes.addDay as Href)}>
					<StyledText className="text-white"> Add Highlight </StyledText>
				</StyledPressable>      
			</StyledView>

			<Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />

		</SafeAreaView>
	)
}

export default Home
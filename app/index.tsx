import { Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledView, StyledText, StyledPressable } from '../components/StyledComponents'
import GetStarted from './getStarted'
import Burger from './burger/burger'

const Home = () => {
	const router = useRouter()

	return (
		<SafeAreaView>
			<StyledView className='w-screen h-screen justify-center items-center'>
				<GetStarted/>    
			</StyledView>
		</SafeAreaView>
	)
}

export default Home
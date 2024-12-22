import { Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledView, StyledText, StyledPressable } from '../components/StyledComponents'
import GetStarted from './getStarted'
import Signin from './userAuth/signin'
import ViewbyYear from './highlights/viewByYear'
import Burger from './burger/burger'
import ViewbyMonth from './highlights/viewByMonth'
import ViewbyDay from './highlights/viewByDay'
import Profile from './profile/profile'

const Home = () => {
	const router = useRouter()
	return (
		<SafeAreaView>
			<StyledView >
				<GetStarted/>    
				{/* <ViewbyDay/>     */}
				{/* <ViewbyMonth/>     */}
			</StyledView>
		</SafeAreaView>
	)
}

export default Home
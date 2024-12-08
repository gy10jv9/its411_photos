import { Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyledView, StyledText, StyledPressable, StyledSafeAreaView } from '../components/StyledComponents'

const GetStarted = () => {
	const router = useRouter()
	return (
		<StyledSafeAreaView className=''>
			<StyledView className=''>
                <StyledPressable onPress={() => router.push('/userAuth/signin')}>
                <StyledText className='bg-blue-600 text-white px-20 py-6 rounded-xl'>Get Started</StyledText>
            </StyledPressable>
			</StyledView>
		</StyledSafeAreaView>
	)
}

export default GetStarted
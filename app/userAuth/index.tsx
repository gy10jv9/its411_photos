import { StyledSafeAreaView, StyledText, StyledPressable } from "@/components/StyledComponents"
import { useRouter } from "expo-router"

const GetStartedPage = () => {
    const router = useRouter()

    return (
        <StyledSafeAreaView>
            <StyledText> getStarted </StyledText>
            <StyledPressable onPress={() => router.push('/userAuth/signin')}>
                <StyledText> Get Started </StyledText>
            </StyledPressable>
        </StyledSafeAreaView>
    )
}

export default GetStartedPage
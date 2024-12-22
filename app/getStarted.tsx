import { ImageBackground, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { StyledView, StyledText, StyledPressable, StyledSafeAreaView } from '../components/StyledComponents';
import { Image } from 'react-native';

const GetStarted = () => {
  const router = useRouter();
  
  return (
    <StyledSafeAreaView className="h-screen w-screen items-center flex px-5">
	  	<Image style={styles.image} source={require('../assets/images/collage.png')}/>
        <StyledText className="text-black rounded-xl w-full mx-auto text-center text-4xl ">
          Save Your Favorites
        </StyledText>
        <StyledText className="text-black rounded-xl w-full text-lg text-center my-5">
          Your personal timeline for cherished moments. Capture photos, locations, and descriptions effortlessly with an intuitive, sleek interface.
        </StyledText>
        <StyledPressable className="z-50 flex w-full" onPress={() => router.push('/userAuth/signin')}>
          <StyledText className="bg-blue-600 text-white text-center rounded-xl w-full mx-auto py-6">
            Get Started
          </StyledText>
        </StyledPressable>
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '95%',
	objectFit: 'contain',
    zIndex: -1,
	marginVertical: 20
  },
});

export default GetStarted;

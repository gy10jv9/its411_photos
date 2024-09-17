import { View, Text, Pressable, Switch } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useColorScheme } from 'nativewind'
import { StyledView, StyledText, StyledPressable } from '../components/StyledComponents'

const Home = () => {
  const  { colorScheme, toggleColorScheme } = useColorScheme()
  const router = useRouter()

  console.log(colorScheme)

  return (
    <SafeAreaView>
      <View>
        <Text> This is the home screen. </Text>
        <Pressable onPress={() => router.push("/test")}>
          <Text> Test </Text>
        </Pressable>
      </View>

      <StyledView className='dark:bg-slate-900'>
        <StyledText className="text-red-500 text-xl"> This is the home screen 2. </StyledText>
        <StyledPressable className="mt-4 p-2 bg-gray-500 rounded" onPress={() => router.push("/test")}>
          <StyledText className="text-white"> Change Theme </StyledText>
        </StyledPressable>        
      </StyledView>

      <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />

    </SafeAreaView>
  )
}

export default Home
import { View, Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const router = useRouter()

  return (
    <SafeAreaView>
      <Text> This is the home screen. </Text>
        <Pressable onPress={() => router.push("/test")}>
          <Text> Test </Text>
        </Pressable>
    </SafeAreaView>
  )
}

export default Home
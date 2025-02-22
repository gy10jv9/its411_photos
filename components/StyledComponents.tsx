import { View, Text, Pressable, TextInput, Button, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native' // import components nga gusto mo butangan styles ka tailwind
import { SafeAreaView } from 'react-native-safe-area-context'
import { styled } from 'nativewind'

// convert kag export ang styled nga components para magamit sa app
export const StyledView = styled(View)
export const StyledText = styled(Text)
export const StyledPressable = styled(Pressable)
export const StyledTextInput = styled(TextInput)
export const StyledButton = styled(Button)
export const StyledSafeAreaView = styled(SafeAreaView)
export const StyledScrollView = styled(ScrollView)
export const StyledFlatList = styled(FlatList)
export const StyledImage = styled(Image)
export const StyledTouchableOpacity = styled(TouchableOpacity)
// docs: https://www.nativewind.dev/api/styled
import { View, Text, Pressable, TextInput } from 'react-native' // import components nga gusto mo butangan styles ka tailwind
import { styled } from 'nativewind'

// convert kag export ang styled nga components para magamit sa app
export const StyledView = styled(View)
export const StyledText = styled(Text)
export const StyledPressable = styled(Pressable)
export const StyledTextInput = styled(TextInput)


// docs: https://www.nativewind.dev/api/styled
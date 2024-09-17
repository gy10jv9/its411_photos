import { View, Text, Pressable } from 'react-native' // import components nga gusto mo butangan styles ka tailwind
import { styled } from 'nativewind'

// convert kag export ang styled nga components para magamit sa app
export const StyledView = styled(View)
export const StyledText = styled(Text)
export const StyledPressable = styled(Pressable)


// docs: https://www.nativewind.dev/api/styled
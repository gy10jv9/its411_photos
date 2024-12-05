import { StyledScrollView, StyledText, StyledView } from "@/components/StyledComponents"
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 16,
    },
});

const HomePage = () => {

    return (
        <StyledScrollView className="flex-1 px-4">
            <StyledText className="mb-4">Indicate day here</StyledText>
            <View className="">
                <StyledView className="bg-blue-500 p-4">Item 1</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 2</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 3</StyledView>
                <StyledView className="bg-blue-500 p-4">Item 4</StyledView>
            </View>
        </StyledScrollView>
    )
}

export default HomePage
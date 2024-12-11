import { StyledScrollView, StyledText, StyledView, StyledPressable } from "@/components/StyledComponents"
import { StyleSheet, View, Text } from 'react-native'

const HomePage = () => {

    return (
        <StyledScrollView className="flex-1 px-4 py-4">
            <StyledText className="mb-4">Indicate day here</StyledText>
            <StyledView style={styles.grid} className="">
                <StyledView style={styles.photoCard}>
                    <StyledText> photo here </StyledText>
                </StyledView>
                <StyledView style={styles.photoCard}>
                    <StyledText> photo here </StyledText>
                </StyledView>
                <StyledView style={styles.photoCard}>
                    <StyledText> photo here </StyledText>
                </StyledView>
                <StyledView style={styles.photoCard}>
                    <StyledText> photo here </StyledText>
                </StyledView>
            </StyledView>
        </StyledScrollView>
    )
}

export default HomePage

const styles = StyleSheet.create({
    grid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    photoCard: {
        height: 100,
        width: '30%',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        marginTop: 10,
    }
});

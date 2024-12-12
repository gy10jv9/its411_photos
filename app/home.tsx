import { StyledScrollView, StyledText, StyledView, StyledPressable } from "@/components/StyledComponents"
import { StyleSheet } from 'react-native'
import { useState } from "react"

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

            <StyledPressable style={styles.button}>
                <StyledText>day</StyledText>
            </StyledPressable>
            <StyledPressable style={styles.button}>
                <StyledText>month</StyledText>
            </StyledPressable>
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
        width: '32%',
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'solid',
        marginTop: 8,
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    }
});

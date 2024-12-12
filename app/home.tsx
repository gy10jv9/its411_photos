import { StyledScrollView, StyledText, StyledView, StyledPressable } from "@/components/StyledComponents"
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from "react"
import { useRouter } from "expo-router"
import Burger from "./burger/burger"

const HomePage = () => {
    const router=useRouter()
    const [burger, setBurger] = useState(false);
    
        const openBurger = () => {
            setBurger(true);
        };
    
        const closeBurger = () => setBurger(false);
    return (
        <StyledView className="flex-1 pt-10 h-screen w-screen bg-orange-300">
            <TouchableOpacity onPress={openBurger}>
                            <StyledText className="text-lg font-semibold mb-2">Open Burger</StyledText>
            </TouchableOpacity>
             
            <StyledText className="mb-4">Indicate day here</StyledText>
            {/* <StyledView style={styles.grid} className="">
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
            </StyledView> */}
            <StyledPressable style={styles.button}>
                <StyledText>day</StyledText>
            </StyledPressable>
            <StyledPressable style={styles.button}>
                <StyledText>month</StyledText>
            </StyledPressable>
            <StyledPressable style={styles.button}>
                <StyledText>year</StyledText>
            </StyledPressable>
            <StyledPressable onPress={() => router.push('/highlights/addDay')} className="bg-blue-500 py-5 items-center rounded-xl">
                <StyledText className="text-white">Add A Moment</StyledText>
            </StyledPressable>
            {burger && (
                <StyledView className="absolute shadow-md rounded-md z-20">
                    <Burger closeBurger={closeBurger} />
                </StyledView>
            )}
        </StyledView>
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

import { StyledScrollView, StyledText, StyledView, StyledPressable, StyledSafeAreaView, StyledImage, StyledTouchableOpacity } from "@/components/StyledComponents";
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import Burger from "./burger/burger";
import { useUser } from "@/userContext/userContext";
import { Image } from "react-native";
import { DiaryEntry } from "@/Interface/interface";
import { fetchEntries } from "@/functions/moments/moments";
import { FlatList } from "react-native";
import { parse, isValid } from 'date-fns';
import { useMoment } from "@/context/MomentContext";

const HomePage = () => {
    const { useruid, username, setUser } = useUser();
    const router = useRouter();
    const [burger, setBurger] = useState(false);
    const openBurger = () => setBurger(true);
    const closeBurger = () => setBurger(false);
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const {setMomentId} = useMoment()
    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntries(useruid);
            if (result.success) {
                const sortedEntries = result.data.sort((a, b) => {
                    const dateA = parse(a.date.trim(), 'MMMM dd, yyyy', new Date());
                    const dateB = parse(b.date.trim(), 'MMMM dd, yyyy', new Date());
                    if (!isValid(dateA)) {
                        console.error("Invalid date format", a.date);
                        return 1; 
                    }
                    if (!isValid(dateB)) {
                        console.error("Invalid date format", b.date);
                        return -1;
                    }
                    return dateB.getTime() - dateA.getTime(); 
                });
                const topEntries = sortedEntries.slice(0, 4);
                setEntries(topEntries);
            } else {
                alert(result.message || 'Error');
            }
            setLoading(false);
        };
        loadEntries();
    }, [useruid]);

    const handleViewMoment = (id: any) => {
        setMomentId(id)
        router.push('/highlights/viewMoment')
      };
           
    return (
        <StyledView className="flex-1 w-screen h-full p-1 bg-white">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className="pt-5 bg-white border-b border-gray-200">
                        {/* Top Section */}
                        <StyledView className="h-20 w-full flex flex-wrap p-2 flex-row items-center justify-between">
                            {/* Left */}
                            <StyledView className="flex-1">
                                <StyledText className="text-2xl font-bold">
                                    Hello, {username}
                                </StyledText>
                                <StyledText className="text-l text-gray-500">
                                    Let’s put your moment in Frames
                                </StyledText>
                            </StyledView>
                            {/* Right */}
                            <StyledTouchableOpacity onPress={openBurger} className="ml-auto">
                                <StyledImage source={require('../assets/images/lifelogo.png')} className="w-12 h-12" />
                            </StyledTouchableOpacity>
                        </StyledView>

                        {/* Middle Section */}
                        <StyledView className="h-12 w-full flex flex-wrap p-2 bg-white border-b border-gray-200 flex-row items-center justify-between">
                            {/* Left */}
                            <StyledText className="text-l font-semibold">
                                Your Latest Moments
                            </StyledText>
                            {/* Right */}
                            <StyledTouchableOpacity onPress={() => router.push('/highlights/viewByDay')} className="ml-auto">
                                <StyledText className="text-sm text-blue-500">View all</StyledText>
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                )}
                data={entries}
                keyExtractor={(entry) => entry.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="w-1/2 p-1">
                        <StyledTouchableOpacity onPress={() => handleViewMoment(item.id)} className="rounded-lg overflow-hidden">
                            {item.photo && (
                                <StyledImage
                                    source={{ uri: item.photo }}
                                    className="w-full h-40"
                                    resizeMode="cover"
                                />
                            )}
                            <StyledText className="text-left px-2 py-1 text-sm font-medium">{item.title}</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                )}
                ListFooterComponent={(
                    <StyledView className="p-2">
                        {/* Buttons */}
                        <StyledPressable className="bg-gray-200 rounded-lg py-2 my-2 items-center">
                            <StyledText>day</StyledText>
                        </StyledPressable>
                        <StyledPressable className="bg-gray-200 rounded-lg py-2 my-2 items-center">
                            <StyledText>month</StyledText>
                        </StyledPressable>
                        <StyledPressable className="bg-gray-200 rounded-lg py-2 my-2 items-center">
                            <StyledText>year</StyledText>
                        </StyledPressable>

                        {/* Add Moment Button */}
                        <StyledPressable onPress={() => router.push('/highlights/addDay')} className="bg-indigo-700 py-5 items-center rounded-xl">
                            <StyledText className="text-white">Add A Moment</StyledText>
                        </StyledPressable>
                    </StyledView>
                )}
                ListEmptyComponent={(
                    <StyledView className="flex-1 justify-center items-center">
                        <StyledText className="text-center text-gray-500">Frame your Moments.</StyledText>
                    </StyledView>
                )}
            />

            {/* Burger Menu */}
            {burger && (
                <StyledView className="absolute top-0 right-0 shadow-md rounded-md z-20">
                    <Burger closeBurger={closeBurger} />
                </StyledView>
            )}
        </StyledView>
    );
};

export default HomePage;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        objectFit: 'cover'
    },
});

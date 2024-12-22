import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView, StyledTouchableOpacity, StyledImage } from '@/components/StyledComponents';
import { useUser } from '@/userContext/userContext';
import { DiaryEntry } from '@/Interface/interface';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { fetchEntries } from '@/functions/moments/moments';
import { parse, isValid, format } from 'date-fns';
import { useMoment } from '@/context/MomentContext';
import Burger from '../burger/burger';

interface RouteParams {
    year?: string;
    month?: string;
}

const ViewbyDay: React.FC = () => {
    const { useruid } = useUser();
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const route = useRoute();
    const router = useRouter();
    const { month, year } = route.params as RouteParams || {};
    const { setMomentId } = useMoment();
    const [burger, setBurger] = useState(false);
    const openBurger = () => setBurger(true);
    const closeBurger = () => setBurger(false);
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    useEffect(() => {
        const loadEntries = async () => {
            const result = await fetchEntries(useruid || '');
            if (result.success) {
                let filteredData = result.data;
                if (month && year) {
                    const selectedMonthIndex = monthNames.indexOf(month);
                    filteredData = filteredData.filter(entry => {
                        const entryDate = parse(entry.date, 'MMMM d, yyyy', new Date());
                        if (!isValid(entryDate)) {
                            console.error('Invalid date:', entry.date);
                            return false;
                        }
                        const entryYear = entryDate.getFullYear();
                        const entryMonth = entryDate.getMonth();
                        return entryYear === parseInt(year) && entryMonth === selectedMonthIndex;
                    });
                    console.log(`${month} ${year}`);
                }
                setEntries(filteredData);
            } else {
                alert(result.message || 'Error');
            }
        };
        loadEntries();
    }, [useruid, month, year]);  
    const handleViewMoment = (id: string) => {
        setMomentId(id);
        router.push('/highlights/viewMoment');
    };

    return (
        <StyledSafeAreaView className="bg-white px-4 w-full h-screen overflow-hidden flex gap-y-10">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className="pt-5 bg-white border-b border-gray-200">
                        {/* Top Section */}
                        <StyledView className="h-20 w-full flex flex-wrap px-2 flex-row items-center justify-between">
                            {/* Left */}
                            <StyledView className="flex-1">
                                <StyledText className="text-2xl font-bold">
                                    Hello
                                </StyledText>
                                <StyledText className="text-l text-gray-500">
                                    Let’s put your moment in Frames
                                </StyledText>
                            </StyledView>
                            {/* Right */}
                            <StyledTouchableOpacity onPress={openBurger} className="ml-auto">
                                <StyledImage source={require('../../assets/images/lifelogo.png')} className="w-12 h-12" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                )}
                data={entries}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="w-1/2 p-1">
                        <StyledTouchableOpacity onPress={() => handleViewMoment(item.id)} className="rounded-lg overflow-hidden">
                            <StyledText className="text-left px-2 py-1 text-sm font-medium">{item.date}</StyledText>
                            <StyledText className="text-left px-2 py-1 text-sm font-medium">{item.title}</StyledText>
                            {item.photo && (
                                <StyledImage
                                    source={{ uri: item.photo }}
                                    className="w-full h-40"
                                    resizeMode="cover"
                                />
                            )}
                        </StyledTouchableOpacity>
                    </StyledView>
                )}
                ListEmptyComponent={(
                    <StyledView className="flex-1 justify-center items-center">
                        <StyledText className="text-center text-gray-500">Frame your Moments.</StyledText>
                    </StyledView>
                )}
                showsVerticalScrollIndicator={false} 
            />
            {burger && (
                <StyledView className="absolute top-0 right-0 shadow-md rounded-md z-20">
                    <Burger closeBurger={closeBurger} />
                </StyledView>
            )}
        </StyledSafeAreaView>
    );
};
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
    },
});

export default ViewbyDay;

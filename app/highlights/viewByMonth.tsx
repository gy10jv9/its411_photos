import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView, StyledTouchableOpacity, StyledImage } from '@/components/StyledComponents';
import { useRoute } from '@react-navigation/native';
import { useUser } from '@/userContext/userContext';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useRouter } from 'expo-router';
import Burger from '../burger/burger';

interface RouteParams {
    year?: string; 
}
const groupByYearAndMonth = (entries: DiaryEntry[]) => {
    return entries.reduce((acc, entry) => {
        const [month, day, year] = entry.date.split(' '); 
        const key = `${year}-${month}`;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(entry);
        return acc;
    }, {} as { [yearMonth: string]: DiaryEntry[] });
};
const ViewbyMonth: React.FC<{ grouped: any }> = ({ grouped }) => {
    const { useruid } = useUser();
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const route = useRoute();
    const router = useRouter();
    const { year } = route.params as RouteParams || {};
    const [burger, setBurger] = useState(false);
    const openBurger = () => setBurger(true);
    const closeBurger = () => setBurger(false);
    useEffect(() => {
        const loadEntries = async () => {
            const result = await fetchEntries(useruid || '');
            if (result.success) {
                let filteredData = result.data;
    
                if (year) {
                    filteredData = filteredData.filter((entry: DiaryEntry) => {
                        const entryYear = entry.date.split(', ')[1]; 
                        return entryYear === year;
                    });
                }
    
                setEntries(filteredData);
            } else {
                alert(result.message || 'Error');
            }
        };
    
        loadEntries();
    }, [useruid, year]);

    const groupedEntries = groupByYearAndMonth(entries);
    const gotoday = (month: string) => {
        router.push({
            pathname: '/highlights/viewByDay',
            params: { month },
        });
    };

    return (
       <StyledSafeAreaView className="bg-white px-4 w-full h-screen overflow-hidden flex gap-y-10 pb-5">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className=" bg-white border-b border-gray-200">
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
                data={Object.keys(groupedEntries)}
                keyExtractor={(yearMonth) => yearMonth}
                key={'single-column'}
                numColumns={1}
                renderItem={({ item: yearMonth }) => {
                    const monthEntries = groupedEntries[yearMonth];
                    const [year, month] = yearMonth.split('-');
                    const firstEntry = monthEntries[0];
                    return (
                        <StyledView className="rounded-lg w-full flex flex-col p-4 mb-4 bg-gray-100">
                            <StyledTouchableOpacity onPress={() => router.push({
                                pathname: '/highlights/viewByDay',
                                params: { month: month, year: year },
                            })}>
                                <StyledText className="text-lg font-bold text-center mb-2">
                                    {`${month} ${year}`}
                                </StyledText>
                                {firstEntry?.photo && (
                                    <StyledImage
                                        source={{ uri: firstEntry.photo }}
                                        className="w-full h-80 rounded-lg"
                                        resizeMode="cover"
                                    />
                                )}
                            </StyledTouchableOpacity>
                        </StyledView>
                    );
                }}
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

// Define styles for images
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

export default ViewbyMonth;

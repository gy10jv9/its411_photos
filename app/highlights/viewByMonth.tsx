import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
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
       <StyledSafeAreaView className=" bg-red-400 p-4 w-full h-screen overflow-hidden flex gap-y-10">
            <FlatList
             ListHeaderComponent={(
                    <StyledView className="pt-5 bg-orange-200">
                        {/* Top Section */}
                        <StyledView className="h-20 w-full flex flex-wrap p-2 ">
                            {/* Left */}
                            <StyledView className="w-2/3 h-full flex justify-center">
                                <StyledText className="text-2xl mb-1">
                                    {/* Hello, {username} */}Hello
                                </StyledText>
                                <StyledText className="text-l">
                                    Let’s put your moment in Frames
                                </StyledText>
                            </StyledView>
                            {/* Right */}
                            <StyledView className="w-1/3 h-full flex flex-row justify-center items-center">
                                <TouchableOpacity onPress={openBurger} style={{ marginLeft: 'auto' }}>
                                    <Image source={require('../../assets/images/lifelogo.png')} style={styles.logo} />
                                </TouchableOpacity>
                            </StyledView>
                        </StyledView>

                        {/* Middle Section */}
                        <StyledView className="h-12 w-full flex flex-wrap p-2 bg-green-200">
                            {/* Left */}
                            <StyledView className="w-2/3 h-full flex justify-center">
                                <StyledText className="text-l">
                                    Your Latest Moments
                                </StyledText>
                            </StyledView>
                            {/* Right */}
                            <StyledView className="w-1/3 h-full flex flex-row justify-center items-center">
                                <TouchableOpacity onPress={() => router.push('/highlights/viewByDay')} style={{ marginLeft: 'auto' }}>
                                    <StyledText className="text-sm">View all</StyledText>
                                </TouchableOpacity>
                            </StyledView>
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
                        <StyledView className="rounded-lg w-full flex h-screen justify-around bg-green-300">
                            <TouchableOpacity onPress={() => router.push({
                                pathname: '/highlights/viewByDay',
                                params: { month: month, year: year },
                            })}>
                            <StyledView className="h-80">
                            <StyledText>{`${month} ${year}`}</StyledText>
                            {firstEntry?.photo && (
                                    <Image
                                        source={{ uri: firstEntry.photo }}
                                        style={styles.image}
                                        resizeMode="cover"
                                    />
                                )}
                            </StyledView>
                            </TouchableOpacity>
                        </StyledView>
                    );
                }}
                 ListEmptyComponent={
                        <StyledView className="flex-1 justify-center items-center">
                            <StyledText className="text-center text-gray-500">
                            No diary entries found.
                            </StyledText>
                        </StyledView>
                        }
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

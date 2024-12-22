import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
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
                data={entries}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="rounded-lg w-1/2 flex justify-around bg-green-300">
                        <TouchableOpacity onPress={()=>handleViewMoment(item.id)}>
                        <StyledText>{item.date}</StyledText>
                        <StyledText>{item.title}</StyledText>
                        <StyledView className="h-80">
                            <Image
                                source={{ uri: item.photo }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </StyledView>
                        </TouchableOpacity>
                        
                    </StyledView>
                )}
                ListEmptyComponent={
                    <StyledView className="flex-1 justify-center items-center">
                        <StyledText className="text-center text-gray-500">No diary entries found.</StyledText>
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

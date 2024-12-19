import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { useRoute } from '@react-navigation/native';
import { useUser } from '@/userContext/userContext';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useRouter } from 'expo-router';

interface RouteParams {
    year: string;
}

const ViewbyMonth: React.FC<{ grouped: any }> = ({ grouped }) => {
    const { useruid } = useUser();
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const route = useRoute();
    const router = useRouter();
        const { year } = route.params as RouteParams;
        console.log('yearr',year); 
        useEffect(() => {
            const loadEntries = async () => {
                const result = await fetchEntries(useruid);
                if (result.success) {
                    setEntries(result.data);
                } else {
                    alert(result.message || 'Error');
                }
            };
            loadEntries()
        }, [useruid]);
    
        const filteredEntries = entries.filter((entry) => {
            const dateMatch = entry.date.match(/(\d{4})$/);
            if (dateMatch) {
                const entryYear = dateMatch[1];
                return entryYear === year;
            }
            return false;
        });
        const groupByMonth = (entries: DiaryEntry[]) => {
            return entries.reduce((acc, entry) => {
                const month = entry.date.slice(0, 8);
                if (!acc[month]) {
                    acc[month] = [];
                }
                acc[month].push(entry);
                console.log(acc)
                return acc;
            }, {} as { [month: string]: DiaryEntry[] });
        };
    
        const groupedByMonth = groupByMonth(filteredEntries);
        const gotoday = (month: string) =>{
            router.push({
                pathname: '/highlights/viewByDay',
                params: { month },
            });
        }
    return (
        <StyledSafeAreaView className="flex-1 bg-red-400 p-4">
            {grouped && grouped.length > 0 ? (
    <FlatList
        data={grouped}
        numColumns={2}
        keyExtractor={(item) => `${item.month}-${item.year}`}
        renderItem={({ item }) => (
            <StyledView className="rounded-lg w-1/2 flex justify-around p-1">
                <>
                    <StyledText>{item.month}, {item.year}</StyledText>
                    {item.photos.length > 0 && (
                        <Image source={{ uri: item.photos[0] }} style={styles.image} resizeMode="cover" />
                    )}
                </>
            </StyledView>
        )}
        ListEmptyComponent={(
            <StyledView className="flex-1 justify-center items-center">
                <StyledText className="text-center text-gray-500">No diary entries found.</StyledText>
            </StyledView>
        )}
    />
            ) : (
                <FlatList
                                data={Object.keys(groupedByMonth)}
                                keyExtractor={(month) => month}
                                renderItem={({ item: month }) => {
                                    const monthEntries = groupedByMonth[month];
                                    const firstEntry = monthEntries[0];
                                    return (
                                        <StyledView style={{ padding: 10, borderBottomWidth: 1 }}>
                                            <TouchableOpacity onPress={() => { gotoday(month) }}>
                                                <StyledText>{month} {year}</StyledText> 
                                                {firstEntry && firstEntry.photo && (
                                                    <Image
                                                        source={{ uri: firstEntry.photo }}
                                                        style={styles.image}
                                                        resizeMode="cover"
                                                    />
                                                )}
                                            </TouchableOpacity>
                                        </StyledView>
                                    );
                                }}
                            />
            )}
        </StyledSafeAreaView>
    );
};

// Define styles for images
const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
});

export default ViewbyMonth;

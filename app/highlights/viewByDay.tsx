import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { useUser } from '@/userContext/userContext';
import { DiaryEntry } from '@/Interface/interface';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { fetchEntries } from '@/functions/moments/moments';
import { parse, isValid } from 'date-fns';
import { useMoment } from '@/context/MomentContext';
interface GroupedEntry {
    dates: string[];
    titles: string[];
    photos: string[]; 
}

interface ViewbyDayProps {
    grouped: GroupedEntry[];
}
interface RouteParams {
    month: string;
}
const ViewbyDay: React.FC<ViewbyDayProps> = ({ grouped }) => {
    const { useruid } = useUser();
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const route = useRoute();
    const router = useRouter();
    const { month } = route.params as RouteParams;
    const {setMomentId} = useMoment()
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    useEffect(() => {
        const loadEntries = async () => {
            const result = await fetchEntries(useruid);
            if (result.success) {
                setEntries(result.data);
            } else {
                alert(result.message || 'Error');
            }
        };
        loadEntries();
    }, [useruid]);

    const selectedMonthIndex = monthNames.indexOf(month);
        const filteredEntries = entries.filter(entry => {
            const entryDate = parse(entry.date, 'MMMM d, yyyy', new Date());
            console.log('Parsed Date:', entryDate);
            if (!isValid(entryDate)) {
                console.error('Invalid date:', entry.date);
                return false; 
            }
            return entryDate.getMonth() === selectedMonthIndex; 
        });
        console.log('Filtered Entries:', filteredEntries);
        const handleViewMoment = (id: any) => {
            setMomentId(id)
            router.push('/highlights/viewMoment')
          };
    return (
        <StyledSafeAreaView className="flex-1 bg-red-400 p-4">
            {grouped && grouped.length > 0 ? (
            <FlatList
                data={grouped}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="rounded-lg w-1/2 flex justify-around p-1">
                        <>
                            <StyledText>{item.dates[0]}</StyledText>
                            <StyledText>{item.titles.join(', ')}</StyledText>
                            {Array.isArray(item.photos) && item.photos.map((photo, index) => (
                                <Image key={index} source={{ uri: photo }} style={styles.image} resizeMode="cover" />
                            ))}
                        </>
                    </StyledView>
                )}
                ListEmptyComponent={(
                    <StyledView className="flex-1 justify-center items-center">
                        <StyledText className="text-center text-gray-500">No diary entries found.</StyledText>
                    </StyledView>
                )}
            />): (
                      <FlatList
                      data={filteredEntries}
                      keyExtractor={(item) => item.id.toString()} 
                      renderItem={({ item }) => (
                          <StyledView>
                            <TouchableOpacity onPress={()=>handleViewMoment(item.id)}>
                              <StyledText>{item.title}</StyledText> 
                              <StyledText>{item.date}</StyledText>  
                              <Image source={{ uri: item.photo }} style={styles.image} resizeMode="cover" />
                              </TouchableOpacity>
                          </StyledView>
                      )}
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

export default ViewbyDay;

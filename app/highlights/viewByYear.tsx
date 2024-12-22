import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { useRouter } from 'expo-router';
import { parse, isValid } from 'date-fns';
import Burger from '../burger/burger';

interface GroupedDateEntry {
  year: number;
  photos: string[];
}

const ViewbyYear: React.FC = () => {
  const router = useRouter();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { useruid } = useUser();
const [burger, setBurger] = useState(false);
    const openBurger = () => setBurger(true);
    const closeBurger = () => setBurger(false);
  const gotoMonthsintheYear = (year: number) => {
    router.push({
      pathname: '/highlights/viewByMonth',
      params: { year },
    });
  };
  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      const result = await fetchEntries(useruid || '');
      if (result.success) {
        setEntries(result.data);
      } else {
        alert(result.message || 'Error');
      }
      setLoading(false);
    };
    loadEntries();
  }, [useruid]);

  const parseDateString = (dateString: string): Date | null => {
    const parsedDate = parse(dateString, 'MMMM d, yyyy', new Date());
    return isValid(parsedDate) ? parsedDate : null;
  };

  const groupByYear = (entries: DiaryEntry[]): GroupedDateEntry[] => {
    const grouped: { [key: number]: GroupedDateEntry } = {};
    entries.forEach((entry) => {
      const parsedDate = parseDateString(entry.date);
      if (!parsedDate) return;

      const year = parsedDate.getFullYear();
      if (!grouped[year]) {
        grouped[year] = { year, photos: [] };
      }
      if (entry.photo) {
        grouped[year].photos.push(entry.photo);
      }
    });
    return Object.values(grouped);
  };

  const groupedEntries = groupByYear(entries);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <StyledSafeAreaView className="flex-1 bg-red-400 p-4 w-full overflow-hidden">
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
        data={groupedEntries}
        key={'single-column'}
        numColumns={1}
        keyExtractor={(item) => item.year.toString()}
        renderItem={({ item }) => (
        <StyledView className="rounded-lg w-full flex justify-around p-2 bg-green-300 mb-4">
            <TouchableOpacity onPress={() => gotoMonthsintheYear(item.year)}>
            <StyledText className="text-lg font-bold text-center mb-2">
                {item.year}
            </StyledText>
            <StyledView className="h-80">
                {item.photos.length > 0 && (
                <Image
                    source={{ uri: item.photos[0] }}
                    style={styles.image}
                    resizeMode="cover"
                />
                )}
            </StyledView>
            </TouchableOpacity>
        </StyledView>
        )}
        ListEmptyComponent={
        <StyledView className="flex-1 justify-center items-center">
             <StyledText className="text-center text-gray-500">Frame your Moments.</StyledText>
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
    marginBottom: 5,
    objectFit: 'cover'
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
},
});

export default ViewbyYear;

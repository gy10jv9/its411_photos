import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { parse, isValid } from 'date-fns';
import ViewbyMonth from './viewByMonth';
import { useRouter } from 'expo-router';
const ViewbyYear: React.FC<{ grouped: any }> = ({ grouped }) => {
    const router = useRouter();
    const gotoMonthsintheYear = (year: string) => {
        router.push({
            pathname: '/highlights/viewByMonth',
            params: { year },
        });
    };

    return (
        <StyledSafeAreaView className="flex-1 bg-red-400 p-4">
            <FlatList
                data={grouped}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="rounded-lg w-1/2 flex justify-around p-1">
                        <>
                        <TouchableOpacity onPress={()=>gotoMonthsintheYear(item.year)}>
                        <StyledText>{item.year}</StyledText>
                            {item.photos.length > 0 && (
                                <Image source={{ uri: item.photos[0] }} style={styles.image} resizeMode="cover" />
                            )}
                        </TouchableOpacity>
                           
                        </>
                    </StyledView>
                )}
                ListEmptyComponent={(
                    <StyledView className="flex-1 justify-center items-center">
                        <StyledText className="text-center text-gray-500">No diary entries found.</StyledText>
                    </StyledView>
                )}
            />
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

export default ViewbyYear;

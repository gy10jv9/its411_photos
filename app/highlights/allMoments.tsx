import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
interface GroupedEntry {
    dates: string[];
    titles: string[];
    addresses: string[];
    descriptions: string[];
    photos: string[]; 
}
interface AllMoments {
    grouped: GroupedEntry[];
}

const AllMoments: React.FC<AllMoments>= ({ grouped }) => {
    return (
        <StyledSafeAreaView className="flex-1 bg-red-400 p-4">
            <FlatList
                data={grouped}
                numColumns={2}
                renderItem={({ item }) => (
                    <StyledView className="rounded-lg w-1/2 flex justify-around p-1">
                            <>
                                <StyledText>{item.titles.join(', ')}</StyledText>
                                <StyledText>{item.dates.join(', ')}</StyledText>
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

export default AllMoments;


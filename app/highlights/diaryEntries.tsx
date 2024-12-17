import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image } from 'react-native';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import { StyledPressable, StyledText, StyledView } from '@/components/StyledComponents';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
const DiaryEntries: React.FC = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { useruid } = useUser();
    const router = useRouter()
    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntries(useruid);
            if (result.success) {
                setEntries(result.data);
            } else {
                alert(result.message || 'Error');
            }
            setLoading(false);
        };
        loadEntries();
    }, []);

    return (
        <StyledView className="flex-1 bg-white p-4">
            <StyledText className="text-2xl font-bold mb-4">Diary Entries</StyledText>
            <StyledPressable
            onPress={() => router.push('/home')}
            className="p-4"
        >
            <StyledText>
                Home
            </StyledText>
        </StyledPressable>
            {loading ? (
                <StyledView className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#0000ff" />
                    <StyledText className="mt-2 text-gray-600">Loading...</StyledText>
                </StyledView>
            ) : entries.length === 0 ? (
                <StyledText className="text-center text-gray-500">No diary entries found.</StyledText>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={(entry) => entry.id}
                    renderItem={({ item }) => (
                        <StyledView className="mb-4 p-4 border border-gray-300 rounded-lg">
                            <StyledText className="text-lg font-semibold">Title: {item.title}</StyledText>
                            <StyledText className="text-gray-700">Description: {item.description}</StyledText>
                            <StyledText className="text-gray-700">Address: {item.address}</StyledText>
                            <StyledText className="text-gray-500 text-sm">Date: {item.date}</StyledText>
                            {item.photo && (
                                <Image
                                    source={{ uri: item.photo }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
                        </StyledView>
                    )}
                />
            )}
        </StyledView>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    entryContainer: {
        marginBottom: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    entryTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 8,
    },
    date: {
        marginTop: 8,
        fontSize: 12,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default DiaryEntries;

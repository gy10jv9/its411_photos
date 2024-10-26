import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';

const DiaryEntries = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntries();
            if (result.success) {
                setEntries(result.data);
            } else {
                alert(result.message || "Error");
            }
            setLoading(false); 
        };
        loadEntries();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Diary Entries</Text>
            {entries.length === 0 ? (
                <Text>No diary entries found.</Text>
            ) : (
                <FlatList
                    data={entries}
                    keyExtractor={entry => entry.id}
                    renderItem={({ item }) => (
                        <View style={styles.entryContainer}>
                            <Text style={styles.entryTitle}>{item.title}</Text>
                            <Text>{item.description}</Text>
                            <Text>{item.address}</Text>
                            {item.photo && (
                                <Image
                                    source={{ uri: item.photo }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
                            <Text style={styles.date}>
                                {new Date(item.createdAt).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
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
    errorText: {
        color: 'red',
        textAlign: 'center',
    },
});

export default DiaryEntries;
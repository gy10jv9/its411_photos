import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';

const DiaryEntries = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const {useruid} = useUser()
    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntries(useruid);
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
                            <Text style={styles.entryTitle}>Title : {item.title}</Text>
                            <Text>Description : {item.description}</Text>
                            <Text>Address : {item.address}</Text>
                            <Text>Date : {item.date}</Text>
                            {item.photo && (
                                <Image
                                    source={{ uri: item.photo }}
                                    style={styles.image}
                                    resizeMode="cover"
                                />
                            )}
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
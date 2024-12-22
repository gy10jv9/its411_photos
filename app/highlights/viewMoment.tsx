import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledPressable, StyledText, StyledView, StyledTouchableOpacity, StyledImage } from '@/components/StyledComponents';
import { useRouter } from 'expo-router';
import { useMoment } from '@/context/MomentContext';

const ViewMoment: React.FC = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { momentId } = useMoment();
    const [burger, setBurger] = useState(false);
    const openBurger = () => setBurger(true);
    const closeBurger = () => setBurger(false);

    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntryById(momentId);
            if (result.success) {
                setEntries(result.data);
            } else {
                alert(result.message || 'Error');
            }
            setLoading(false);
        };
        loadEntries();
    }, []);

    const renderEntry = ({ item }: { item: DiaryEntry }) => (
        <StyledView className="w-full bg-white flex flex-col p-4">
            <StyledText className="text-2xl font-bold mt-2">{item.title}</StyledText>
            <StyledImage source={{ uri: item.photo }} className="w-full h-80 my-4" resizeMode="cover" />
            <StyledText className="text-gray-500 text-l mb-2">{item.description}</StyledText>
            <StyledText className="text-gray-600 text-sm mb-2">{item.address}</StyledText>
            <StyledText className="text-gray-400 text-sm mb-4">{item.date}</StyledText>
            <StyledTouchableOpacity onPress={() => router.push('/highlights/editMoment')} className="bg-blue-600 py-2 px-4 rounded-lg mb-2">
                <StyledText className="text-white text-center">Edit</StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity onPress={() => { deleteMoment(item.id, item.photo); router.push('/home'); }} className="bg-red-600 py-2 px-4 rounded-lg">
                <StyledText className="text-white text-center">Delete</StyledText>
            </StyledTouchableOpacity>
        </StyledView>
    );

    if (loading) {
        return (
            <StyledView className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </StyledView>
        );
    }

    return (
        <StyledView className="flex-1 bg-white p-1 h-full w-screen">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className="pt-5 bg-white border-b border-gray-200">
                        {/* Top Section */}
                        <StyledView className="h-20 w-full flex flex-wrap px-2 flex-row items-center justify-between">
                            {/* Left */}
                            <StyledView className="flex-1">
                                <StyledText className="text-2xl font-bold">
                                    Your Moment
                                </StyledText>
                                <StyledText className="text-l text-gray-500">
                                    Let’s put your moment in Frames
                                </StyledText>
                            </StyledView>
                            {/* Right */}
                            <StyledTouchableOpacity onPress={openBurger} className="ml-auto">
                                <StyledImage source={require('../../assets/images/lifelogo.png')} className="w-12 h-12" />
                            </StyledTouchableOpacity>
                        </StyledView>
                    </StyledView>
                )}
                data={entries}
                renderItem={renderEntry}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </StyledView>
    );
};

const styles = StyleSheet.create({
    list: {
        height: "100%",
        backgroundColor: "white",
        margin: 0,
        padding: 0
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
    }
});

export default ViewMoment;

import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledPressable, StyledText, StyledView, StyledImage, StyledTouchableOpacity } from '@/components/StyledComponents';
import { useRouter } from 'expo-router';
import { useMoment } from '@/context/MomentContext';
import { useUser } from '@/userContext/userContext';

const ViewMoment: React.FC = () => {
    const { useruid, username } = useUser();
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
        <StyledView className="w-full bg-white flex flex-col mb-4">
            {/* profile sang user prehas sa instagram ah */}
            <StyledView className="flex-row items-center mb-4">
                <StyledImage source={require('../../assets/images/defaults/profile.jpg')} style={styles.profile} />
                <StyledView className="ml-4">
                    <StyledText className="text-lg font-semibold">{username}</StyledText>
                    <StyledText className="text-sm text-gray-500"> userId: {useruid} </StyledText>
                </StyledView>
            </StyledView>
            <StyledImage source={{ uri: item.photo }} className="w-full h-96" />
            <StyledView className="p-4">
                <StyledText className="text-gray-800">{item.description}</StyledText>
                <StyledText className="text-gray-500 text-sm">{item.address}</StyledText>
                <StyledText className="text-gray-400 text-xs">{item.date}</StyledText>
                <StyledTouchableOpacity onPress={() => router.push('/highlights/editMoment')} className="mt-2">
                    <StyledText className="text-blue-600">Edit</StyledText>
                </StyledTouchableOpacity>
                <StyledTouchableOpacity onPress={() => { deleteMoment(item.id, item.photo); router.push('/home'); }} className="mt-2">
                    <StyledText className="text-red-600">Delete</StyledText>
                </StyledTouchableOpacity>
            </StyledView>
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
        <StyledView className="flex-1 bg-white">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className="bg-white p-4 border-b border-gray-200">
                        <StyledView className="flex flex-row justify-between items-center">
                            <StyledText className="text-2xl font-bold">Your Moment</StyledText>
                            <TouchableOpacity onPress={openBurger}>
                                <StyledImage source={require('../../assets/images/lifelogo.png')} className="w-10 h-10" />
                            </TouchableOpacity>
                        </StyledView>
                        <StyledText className="text-gray-500">Let’s put your moment in Frames</StyledText>
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
        backgroundColor: "white",
    },
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default ViewMoment;

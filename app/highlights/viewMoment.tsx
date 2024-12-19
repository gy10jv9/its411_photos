import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledPressable, StyledText, StyledView } from '@/components/StyledComponents';
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
        <StyledView className="w-screen bg-green-200 h-full flex">
            <StyledText className="text-2xl font-bold mt-2 bg-red-200 py-5 px-1">{item.title}</StyledText>
            <Image source={{ uri: item.photo }} style={styles.image} />
            <StyledText className="text-gray-500 text-l bg-red-400  py-5 px-1">{item.description}</StyledText>
            <StyledText className="text-gray-600 text-sm bg-red-200 py-5 px-1">{item.address}??</StyledText>
            <StyledText className="text-gray-400 text-sm bg-red-600 py-5 px-1">{item.date}</StyledText>
            <TouchableOpacity onPress={()=>router.push('/highlights/editMoment')}>
            <StyledText className="text-white text-sm bg-blue-600 py-5 px-1">Edit</StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{deleteMoment(item.id, item.photo)
                router.push('/home')}
            }>
            <StyledText className="text-white text-sm bg-blue-600 py-5 px-1">Delete</StyledText>
            </TouchableOpacity>
            
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
                                <StyledView className="pt-5 bg-orange-200">
                                    {/* Top Section */}
                                    <StyledView className="h-20 w-full flex flex-wrap p-2 ">
                                        {/* Left */}
                                        <StyledView className="w-2/3 h-full flex justify-center">
                                            <StyledText className="text-2xl mb-1">
                                                Your Moment
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
    image: {
        width: '100%',
        height: 200,
    },
    list: {
        height: "100%",
        backgroundColor: "orange",
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

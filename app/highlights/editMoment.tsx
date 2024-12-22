import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, editMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledPressable, StyledText, StyledTextInput, StyledView, StyledTouchableOpacity, StyledImage } from '@/components/StyledComponents';
import { useRouter } from 'expo-router';
import { useMoment } from '@/context/MomentContext';
import * as ImagePicker from 'expo-image-picker';

const EditMoment: React.FC = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { momentId } = useMoment();
    const [burger, setBurger] = useState(false);
    const [image, setImage] = useState<string | null>(null);
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

    const handleChange = (id: string, field: keyof DiaryEntry, value: string) => {
        setEntries((prevEntries) =>
            prevEntries.map((entry) =>
                entry.id === id ? { ...entry, [field]: value } : entry
            )
        );
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setOptions(false);
        }
    };

    const captureImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setOptions(false);
        }
    };

    const [options, setOptions] = useState(false);

    const renderEntry = ({ item }: { item: DiaryEntry }) => (
        <StyledView className="w-full bg-white flex flex-col p-4">
            <StyledTextInput
                className="text-2xl font-bold mt-2 bg-gray-100 py-2 px-4 rounded-md"
                value={item.title}
                onChangeText={(text) => handleChange(item.id, 'title', text)}
            />
            <StyledTouchableOpacity onPress={() => setOptions(true)} className="my-4">
                <StyledImage source={{ uri: image || item.photo }} className="w-full h-80 rounded-lg" resizeMode="cover" />
            </StyledTouchableOpacity>
            {options && (
                <>
                    <StyledPressable
                        onPress={pickImage}
                        className="bg-indigo-700 text-white py-2 px-4 rounded-md items-center mb-2"
                    >
                        <StyledText className="text-white">Pick an image from camera roll</StyledText>
                    </StyledPressable>

                    <StyledPressable
                        onPress={captureImage}
                        className="bg-indigo-700 text-white py-2 px-4 rounded-md items-center mb-2"
                    >
                        <StyledText className="text-white">Capture an image with camera</StyledText>
                    </StyledPressable>

                    <StyledPressable
                        onPress={() => setOptions(false)}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md items-center"
                    >
                        <StyledText className="text-white">Cancel</StyledText>
                    </StyledPressable>
                </>
            )}
            <StyledTextInput
                className="text-gray-500 text-l bg-gray-100 py-2 px-4 rounded-md mb-2"
                value={item.description}
                onChangeText={(text) => handleChange(item.id, 'description', text)}
            />
            <StyledTextInput
                className="text-gray-600 text-sm bg-gray-100 py-2 px-4 rounded-md mb-2"
                value={item.address}
                onChangeText={(text) => handleChange(item.id, 'address', text)}
                readOnly
            />
            <StyledTextInput
                className="text-gray-400 text-sm bg-gray-100 py-2 px-4 rounded-md"
                value={item.date}
                onChangeText={(text) => handleChange(item.id, 'date', text)}
                readOnly
            />
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
            <StyledPressable onPress={() => { editMoment(entries[0], image); router.push('/home'); }} className="bg-indigo-700 py-3 mt-3 rounded-md items-center">
                <StyledText className="text-white">Update Moment</StyledText>
            </StyledPressable>
            <StyledPressable onPress={() => deleteMoment(entries[0].id, entries[0].photo)} className="bg-red-600 py-3 mt-3 rounded-md items-center">
                <StyledText className="text-white">Delete Moment</StyledText>
            </StyledPressable>
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

export default EditMoment;

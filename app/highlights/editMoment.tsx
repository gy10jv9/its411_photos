import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, editMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledButton, StyledPressable, StyledText, StyledTextInput, StyledView, StyledImage, StyledTouchableOpacity } from '@/components/StyledComponents';
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
        <StyledView className="w-full bg-white flex flex-col mb-4">
            <StyledTextInput
                className="text-lg font-bold mt-2 p-2 border-b border-gray-200"
                value={item.title}
                onChangeText={(text) => handleChange(item.id, 'title', text)}
            />
            <StyledTouchableOpacity onPress={() => setOptions(true)}>
                <StyledImage source={{ uri: image || item.photo }} className="w-full h-96" />
            </StyledTouchableOpacity>
            {options && (
                <>
                    <StyledButton
                        title="Pick an image from camera roll"
                        onPress={pickImage}
                        className="bg-indigo-600 text-white py-2 px-4 rounded-md mt-2"
                    />
                    <StyledButton
                        title="Capture an image with camera"
                        onPress={captureImage}
                        className="bg-orange-600 text-white py-2 px-4 rounded-md mt-2"
                    />
                    <StyledButton
                        title="Cancel"
                        onPress={() => setOptions(false)}
                        className="bg-gray-600 text-white py-2 px-4 rounded-md mt-2"
                    />
                </>
            )}
            <StyledTextInput
                className="text-gray-800 mt-2 p-2 border-b border-gray-200"
                value={item.description}
                onChangeText={(text) => handleChange(item.id, 'description', text)}
            />
            <StyledTextInput
                className="text-gray-600 mt-2 p-2 border-b border-gray-200"
                value={item.address}
                onChangeText={(text) => handleChange(item.id, 'address', text)}
                readOnly
            />
            <StyledTextInput
                className="text-gray-400 mt-2 p-2 border-b border-gray-200"
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
        <StyledView className="flex-1 bg-white">
            <FlatList
                ListHeaderComponent={(
                    <StyledView className="bg-white p-4 border-b border-gray-200">
                        <StyledView className="flex flex-row justify-between items-center">
                            <StyledText className="text-2xl font-bold">Edit Moment</StyledText>
                            <TouchableOpacity onPress={openBurger}>
                                <StyledImage source={require('../../assets/images/lifelogo.png')} className="w-10 h-10" />
                            </TouchableOpacity>
                        </StyledView>
                        <StyledText className="text-gray-500">Update your moment details</StyledText>
                    </StyledView>
                )}
                data={entries}
                renderItem={renderEntry}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
            <StyledPressable onPress={() => { editMoment(entries[0], image); router.push('/home'); }} className="bg-blue-500 p-3 mt-3 rounded">
                <StyledText className="text-white text-center">Update Moment</StyledText>
            </StyledPressable>
            <StyledPressable onPress={() => deleteMoment(entries[0].id, entries[0].photo)} className="bg-red-500 p-3 mt-3 rounded">
                <StyledText className="text-white text-center">Delete Moment</StyledText>
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
        backgroundColor: "white",
    },
    logo: {
        width: 50,
        height: 50,
    },
});

export default EditMoment;

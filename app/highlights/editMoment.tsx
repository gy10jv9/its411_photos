import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { deleteMoment, editMoment, fetchEntryById } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { StyledButton, StyledPressable, StyledText, StyledTextInput, StyledView } from '@/components/StyledComponents';
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
                setOptions(false)
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
                setOptions(false)
            }
        };
    const [options, setOptions] = useState(false)
    const renderEntry = ({ item }: { item: DiaryEntry }) => (
        <StyledView className="w-screen bg-green-200 h-full flex">
            <StyledTextInput
                className="text-2xl font-bold mt-2 bg-red-200 py-5 px-1"
                value={item.title}
                onChangeText={(text) => handleChange(item.id, 'title', text)}
            />
            <TouchableOpacity onPress={()=>setOptions(true)}>
            <Image source={{ uri: image || item.photo }} style={styles.image} />
            </TouchableOpacity>
            {options &&
            <>
             <StyledButton
                title="Pick an image from camera roll"
                onPress={pickImage}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md"
            />

            <StyledButton
                title="Capture an image with camera"
                onPress={captureImage}
                className="bg-orange-600 text-white py-2 px-4 rounded-md"
            />
            <StyledButton
                title="Cancel"
                onPress={()=>setOptions(false)}
                className="bg-orange-600 text-white py-2 px-4 rounded-md"
            />
            </>
            }
            <StyledTextInput
                className="text-gray-500 text-l bg-red-400 py-5 px-1"
                value={item.description}
                onChangeText={(text) => handleChange(item.id, 'description', text)}
            />
            <StyledTextInput
                className="text-gray-600 text-sm bg-red-200 py-5 px-1"
                value={item.address}
                onChangeText={(text) => handleChange(item.id, 'address', text)}
                readOnly
            />
            <StyledTextInput
                className="text-gray-400 text-sm bg-red-600 py-5 px-1"
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
                    <StyledView className="pt-5 bg-orange-200">
                        {/* Top Section */}
                        <StyledView className="h-20 w-full flex flex-wrap p-2">
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
            <StyledPressable onPress={()=>{editMoment(entries[0], image) 
                router.push('/home')}} className="bg-blue-500 p-3 mt-3 rounded">
                <StyledText className="text-white text-center">Update Moment</StyledText>
            </StyledPressable>
            <StyledPressable onPress={()=>deleteMoment(entries[0].id, entries[0].photo)} className="bg-blue-500 p-3 mt-3 rounded">
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

export default EditMoment;

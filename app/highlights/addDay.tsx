import { Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { StyledPressable, StyledText, StyledSafeAreaView, StyledButton, StyledView, StyledTextInput } from '@/components/StyledComponents';
import { router, Href } from 'expo-router';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { handleAddDay } from '@/functions/moments/moments';
import { useUser } from '@/userContext/userContext';
import Burger from '../burger/burger';
import React from 'react';

const AddDay: React.FC = () => {
    const { useruid, username } = useUser();
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>('');
    const todaydate = new Date();
    const formattedDate = todaydate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        date: formattedDate,
        userUID: useruid,
    });
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(true); 
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    setLoading(false);
                    return;
                }
    
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
    
                const { latitude, longitude } = location.coords;
                const address = await Location.reverseGeocodeAsync({ latitude, longitude });
    
                if (address.length > 0) {
                    const { formattedAddress } = address[0];
                    const fullAddress = `${formattedAddress}`;
                    setFormData({
                        ...formData,
                        address: fullAddress,
                    });
                }
            } catch (error) {
                setErrorMsg("Error retrieving location or address.");
                console.error("Location Error:", error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const [isUploading, setIsUploading] = useState(false); 
    const addday = async () => {
        setIsUploading(true); 
        try {
            const result = await handleAddDay(formData, image);
            if (result && result.success) {
                alert("Upload Success");
                setFormData({
                    ...formData,
                    title: "",
                    address: "",
                    description: "",
                });
                setImage(null)
                setIsUploading(false);
            } else {
                alert(result);
            }
        } catch (error) {
            alert("An error occurred during upload.");
            console.error("Upload Error:", error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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
        }
    };

    const gotoDiary = async () => {
        router.push('/highlights/diaryEntries');
    };

    const [burger, setBurger] = useState(false);

    const openBurger = () => {
        setBurger(true);
    };

    const closeBurger = () => setBurger(false);


    return (
        <StyledSafeAreaView className="bg-white px-6">
             {loading ? (
            <StyledText>Loading location...</StyledText>
        ) : (
            <>
            {isUploading ? (
                <StyledText>Uploading...</StyledText>
            ) : (
                <>
            {/* profile sang user prehas sa instagram ah */}
            <StyledView className="flex-row items-center mb-4">
                <Image source={require('../../assets/images/defaults/profile.jpg')} style={styles.profile} />
                <StyledView className="ml-4">
                    <StyledText className="text-lg font-semibold">{username}</StyledText>
                    <StyledText className="text-sm text-gray-500"> userId: {useruid} </StyledText>
                </StyledView>
            </StyledView>

            <StyledTextInput
                className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
                placeholder="Title"
                value={formData.title}
                onChangeText={(value) => setFormData({ ...formData, title: value })}
            />

            <StyledTextInput
                className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
                placeholder="Description"
                value={formData.description}
                onChangeText={(value) =>
                    setFormData({ ...formData, description: value })
                }
            />

            <StyledView className="space-y-4">
                <StyledPressable
                    onPress={pickImage}
                    className="bg-violet-600 border border-violet-600 py-2 px-4 rounded-md"
                >
                    <StyledText className="text-white">Pick an image from camera roll</StyledText>
                </StyledPressable>

                <StyledPressable
                    onPress={captureImage}
                    className="bg-violet-600 border border-violet-600 py-2 px-4 rounded-md"
                >
                    <StyledText className="text-white">Capture an image with camera</StyledText>
                </StyledPressable>

                {image && (
                    <>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 200, width: '100%', borderRadius: 10 }}
                        />
                        <StyledPressable
                            onPress={addday}
                            className="bg-violet-600 border border-violet-600 py-2 px-4 rounded-md"
                        >
                            <StyledText className="text-white">Upload Image</StyledText>
                        </StyledPressable>
                    </>
                )}

                <StyledPressable
                    onPress={gotoDiary}
                    className="bg-violet-600 border border-violet-600 py-2 px-4 rounded-md"
                >
                    <StyledText className="text-white">View Diary</StyledText>
                </StyledPressable>
            </StyledView>
                </>
            )}
           
            </>
        )}
            
        </StyledSafeAreaView>
    );
};

const styles = StyleSheet.create({
    profile: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});

export default AddDay;

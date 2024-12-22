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
        <StyledView className="pt-5 bg-orange-200">
                {/* Top Section */}
                <StyledView className="h-20 w-full flex flex-wrap p-2 ">
                    {/* Left */}
                    <StyledView className="w-2/3 h-full flex justify-center">
                        <StyledText className="text-2xl mb-1">
                            {/* Hello, {username} */}Hello
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

                {/* Middle Section */}
                <StyledView className="h-12 w-full flex flex-wrap p-2 bg-green-200">
                    {/* Left */}
                    <StyledView className="w-2/3 h-full flex justify-center">
                        <StyledText className="text-l">
                            Your Latest Moments
                        </StyledText>
                    </StyledView>
                    {/* Right */}
                    <StyledView className="w-1/3 h-full flex flex-row justify-center items-center">
                        <TouchableOpacity onPress={() => router.push('/highlights/viewByDay')} style={{ marginLeft: 'auto' }}>
                            <StyledText className="text-sm">View all</StyledText>
                        </TouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledView>
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

                {image && (
                    <>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 200, width: '100%', borderRadius: 10 }}
                        />
                        <StyledButton
                            title="Upload Image"
                            onPress={addday}
                            className="bg-green-600 text-white py-2 px-4 rounded-md"
                        />
                    </>
                )}

                <StyledButton
                    title="View Diary"
                    onPress={gotoDiary}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md"
                />
            </StyledView>
                </>
            )}
           {burger && (
                <StyledView className="absolute top-0 right-0 shadow-md rounded-md z-20">
                    <Burger closeBurger={closeBurger} />
                </StyledView>
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
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#000',
    },
});

export default AddDay;

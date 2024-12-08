import { Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { StyledPressable, StyledText, StyledSafeAreaView, StyledButton, StyledView, StyledTextInput } from '@/components/StyledComponents';
import { router, Href } from 'expo-router';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { handleAddDay } from '@/functions/moments/moments';
import { useUser } from '@/userContext/userContext';
import Burger from '../burger/burger';
const AddDay: React.FC = () => {
    const {useruid} = useUser()
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>('');
    const todaydate = new Date(); // Current date
    const formattedDate = todaydate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        date: formattedDate,
        userUID: useruid
    })
    useEffect(() => {
        (async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    return;
                }
                const location = await Location.getCurrentPositionAsync({});
                setLocation(location);
                const { latitude, longitude } = location.coords;
                const address = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (address.length > 0) {
                    const { formattedAddress } = address[0];
                    const fullAddress = `${formattedAddress}`;
                    console.log(fullAddress);
                    setFormData({
                        ...formData,
                        address: fullAddress 
                    });
                }
            } catch (error) {
                setErrorMsg("Error retrieving location or address.");
                console.error("Location Error:", error);
            }
        })();
    }, []);
    
    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    const addday = async() =>{
        const result = await handleAddDay(formData, image);
    if (result && result.success) {
      alert("Upload Success");
      setFormData({
        ...formData,
        title: "",
        address: "",
        description: "",
      })
      router.push('/highlights/addDay');
    } else {
      alert(result); 
    }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const gotoDiary = async () =>{
        router.push('/highlights/diaryEntries')
    }
    const [burger, setBurger] = useState(false)
    const openBurger = () =>{
        setBurger(true)
    }
    const closeBurger = () => setBurger(false);
    return (
        <StyledSafeAreaView className="flex-1 bg-gray-50 px-6 py-4">
            <TouchableOpacity onPress={openBurger}>
            <StyledText className="text-lg font-semibold mb-2">
                Open Burger
            </StyledText>
            </TouchableOpacity>

            {burger && (
            <StyledView className="absolute bg-white shadow-md rounded-md z-20">
                <Burger closeBurger = {closeBurger}/>
                 {/* <TouchableOpacity onPress={closeBurger}>
            <StyledText className="text-lg font-semibold mb-2">
                
            </StyledText>
            </TouchableOpacity> */}
            </StyledView>
            )}
            <StyledText className="text-lg font-semibold mb-2">
                Hello User {useruid}
            </StyledText>
            <StyledText className="text-xl font-bold mb-4">Add Day</StyledText>
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
            <StyledView className="mt-4 mb-6 flex items-center">
                {/* Placeholder for additional styles */}
            </StyledView>
            <StyledView className="space-y-4">
                <StyledButton
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md"
                />
                {image && (
                    <>
                        <Image
                            source={{ uri: image }}
                            style={{ height: 200, width: '100%', borderRadius: 10 }}
                            // className="mt-4"
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
        </StyledSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});

export default AddDay;

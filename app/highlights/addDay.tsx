import { Text, StyleSheet, Image, FlatList } from 'react-native';
import { StyledPressable, StyledText, StyledSafeAreaView, StyledButton, StyledView, StyledTextInput } from '@/components/StyledComponents';
import { router, Href } from 'expo-router';
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { handleAddDay } from '@/functions/moments/moments';
const addDay = () => {
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>('');
    const [formData, setFormData] = useState({
        title: "",
        address: "",
        description: "",
        date: new Date()
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            console.log(location);
            const { latitude, longitude } = location.coords;
            let address = await Location.reverseGeocodeAsync({ latitude, longitude });
            
            if (address.length > 0) {
                const { formattedAddress } = address[0];
                const fullAddress = `${formattedAddress}`;
                setFormData({
                    ...formData,
                    address: fullAddress 
                });
            }
            setLocation(location);
        })
        
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
    return (
        <StyledSafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
                <StyledText>Back</StyledText>
            </StyledPressable>
            <Text> addDay </Text>
            <StyledTextInput
                className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                placeholder="Description"
                value={formData.title}
                onChangeText={(value) => setFormData({ ...formData, title: value })}
                />
            <StyledTextInput
                className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                placeholder="Description"
                value={formData.description}
                onChangeText={(value) => setFormData({ ...formData, description: value })}
                />
                <StyledView style={styles.container}>
            </StyledView>
            {/* <StyledView>
                <StyledText>{text}</StyledText>
            </StyledView> */}
            <StyledView>
                <StyledButton title="Pick an image from camera roll" onPress={pickImage} />
                {image && (
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <StyledButton title="Upload Image" onPress={addday} />
                    </>
                )}
                <StyledButton title="View Diary" onPress={gotoDiary} />
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

export default addDay;

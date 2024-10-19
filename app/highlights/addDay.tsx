import { Text, StyleSheet, Image } from 'react-native'
import { StyledPressable, StyledText, StyledSafeAreaView, StyledButton, StyledView } from '@/components/StyledComponents'
import { router, Href } from 'expo-router'
import { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';


const addDay = () => {
    const [image, setImage] = useState<string | null>(null);
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>('');

    useEffect(() => {
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
        }, []);
        
        let text = 'Waiting..';
        if (errorMsg) {
            text = errorMsg;
        } else if (location) {
            text = JSON.stringify(location);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    return (
        <StyledSafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <Text> addDay </Text>

            <StyledView>
                <StyledText>{text}</StyledText>
            </StyledView>

            <StyledView>
                <StyledButton title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={styles.image} />}
            </StyledView>
        </StyledSafeAreaView>
    )
}

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

export default addDay
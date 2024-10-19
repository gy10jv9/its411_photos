import storage from '@react-native-firebase/storage'; 
const testImage = async (image: string | null) => {
    if (!image) {
        console.error('No image selected');
        return;
    }
    try {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileRef = storage().ref(`uploads/images/${Date.now()}.jpg`);
        await fileRef.put(blob);
        console.log('Upload successful!');
    } catch (error) {
        console.error('Upload failed:', error);
    }
};

export {testImage}
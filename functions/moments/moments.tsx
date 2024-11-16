import { addDoc, collection, getDocs, query, where } from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'; 
import firestore from '@react-native-firebase/firestore';
import { DiaryEntry } from '@/Interface/interface';
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
        return "Image tested successfully";
    } catch (error) {
        console.error('Upload failed:', error);
    }
};
const handleAddDay = async (formData: any, image: string | null) => {
    if (!image) {
        console.error('No image selected');
        return;
    }
    try {
        const diaryRef = collection(firestore(), 'DayDiary');
        const response = await fetch(image);
        const blob = await response.blob();
        const fileRef = storage().ref(`uploads/images/${Date.now()}.jpg`);
        await fileRef.put(blob);
        const imageUrl = await fileRef.getDownloadURL();
        const diaryEntry = {
            ...formData,
            photo: imageUrl,
            createdAt: new Date(),
        };       
        await addDoc(diaryRef, diaryEntry); 
        console.log("Diary entry added successfully:", diaryEntry);
        return {success: true, message: "Diary entry added successfully"}
    } catch (error) {
        console.error("Error registering user: ", error);
    return { success: false, message: 'Error occurred during registration.' }; 
    }
};
const fetchEntries = async (userUID: string | null) => {
    try {
        const diaryRef = collection(firestore(), 'DayDiary');
        const userQuery = query(diaryRef, where('userUID', '==', userUID));
        const snapshot = await getDocs(userQuery);

        if (snapshot.empty) {
            console.warn("No entries found for this user in the 'DayDiary' collection.");
            return { data: [], success: true, message: "No entries available for this user." };
        }

        const entriesData = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as DiaryEntry[]; 

        return { data: entriesData, success: true };
    } catch (err) {
        console.error("Error fetching diary entries: ", err);
        return { success: false, message: 'Error occurred while fetching diary entries.', data: [] };
    }
};
export {testImage, handleAddDay ,fetchEntries}
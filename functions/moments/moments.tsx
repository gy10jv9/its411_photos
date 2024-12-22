import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from '@react-native-firebase/firestore';
import storage, { deleteObject, ref } from '@react-native-firebase/storage'; 
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
            // createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        };       
        await addDoc(diaryRef, diaryEntry); 
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
            // console.warn("No entries found for this user in the 'DayDiary' collection.");
            return { data: [], success: true, message: "Frame your Moments" };
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

const fetchEntryById = async (momentId: string | null) => {
    try {
        if (!momentId) {
            return { success: false, message: 'No moment ID provided.', data: [] };
        }
        const snap = await getDoc(doc(firestore(), 'DayDiary', momentId))
        if(!snap.exists){
            console.warn("No entry found for this ID in the 'DayDiary' collection.");
            return { data: [], success: true, message: "No entry available for this ID." };
        }
        const entryData = {
            id: snap.id,
            ...snap.data()
        } as DiaryEntry;
        return { data: [entryData], success: true };
    } catch (err) {
        console.error("Error fetching diary entry: ", err);
        return { success: false, message: 'Error occurred while fetching diary entry.', data: [] };
    }
};

const editMoment = async (formData: any, image : string | null) =>{
    if (!image) {
        try {
            await updateDoc(doc(firestore(), "DayDiary", formData.id), formData);
            return {success: true, message: "Diary entry updated successfully"}
        } catch (error) {
            console.error("Error registering user: ", error);
        return;
        }
        }
    try {
        const response = await fetch(image);
        const blob = await response.blob();
        const fileRef = storage().ref(`uploads/images/${Date.now()}.jpg`);
        await fileRef.put(blob);
        const imageUrl = await fileRef.getDownloadURL();
        const newData = {
            ...formData,
            photo: imageUrl
        }
        await updateDoc(doc(firestore(), "DayDiary", formData.id), newData);
        return {success: true, message: "Diary entry updated successfully"}
    } catch (error) {
        console.error("Error registering user: ", error);
    return { success: false, message: 'Error occurred during registration.' }; 
    }
}

const deleteMoment = async (id: string, photoURL: any) => {
    try {
        const booksCollection = collection(firestore(), "DayDiary");
        const docRef = doc(booksCollection, id);
        await deleteDoc(docRef);
        if(photoURL){
            const getPathFromURL = (url: string): string => {
                const parts = url.split("/o/");
                return decodeURIComponent(parts[1].split("?")[0]);
            };
            const photoPath = getPathFromURL(photoURL);
            const photoRef = ref(storage(), photoPath);
            await deleteObject(photoRef);
        }
        
    } catch (error) {
        console.error("Error deleting moment:", error);
    }
};
export {testImage, handleAddDay ,fetchEntries, fetchEntryById, editMoment, deleteMoment}
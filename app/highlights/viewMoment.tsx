import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, Image } from 'react-native';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import { StyledPressable, StyledText, StyledView } from '@/components/StyledComponents';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useMoment } from '@/context/MomentContext';
const viewMoment: React.FC = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const { useruid } = useUser();
    const router = useRouter()
    const {momentId} = useMoment()
    useEffect(() => {
        const loadEntries = async () => {
            setLoading(true);
            const result = await fetchEntries(useruid);
            if (result.success) {
                setEntries(result.data);
            } else {
                alert(result.message || 'Error');
            }
            setLoading(false);
        };
        loadEntries();
    }, []);

    return (
        <StyledView className="flex-1 bg-white p-4">
            <StyledText className="text-2xl font-bold mb-4">Moment {momentId}</StyledText>
        </StyledView>
    );
};

export default viewMoment
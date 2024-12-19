import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { fetchEntries } from '@/functions/moments/moments';
import { DiaryEntry } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { parse, isValid } from 'date-fns';
import ViewbyYear from './viewByYear';
import ViewbyMonth from './viewByMonth';
import ViewbyDay from './viewByDay';
import AllMoments from './allMoments';

interface GroupedDateEntry {
    month?: string;
    year: number;
    day?: string;
    dates: string[];
    titles: string[];
    addresses: string[];
    descriptions: string[];
    photos: string[]; 
}

const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

const MomentsNavigator: React.FC = () => {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [groupingType, setGroupingType] = useState<'Year' | 'Month' | 'Day' | 'All'>('All');
    const { useruid } = useUser();

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
    }, [useruid]);
    const parseDateString = (dateString: string): Date | null => {
        const parsedDate = parse(dateString, 'MMMM d, yyyy', new Date());
        return isValid(parsedDate) ? parsedDate : null;
    };

    const groupByDate = (entries: DiaryEntry[]): GroupedDateEntry[] => {
        entries.sort((a, b) => {
            const dateA = parseDateString(a.date);
            const dateB = parseDateString(b.date);
            return (dateA && dateB ? dateA.getTime() - dateB.getTime() : 0);
        });
        if (groupingType === 'All') {
            return entries.map(entry => ({
                dates: [entry.date],
                titles: [entry.title],
                addresses: [entry.address],
                descriptions: [entry.description],
                photos: entry.photo ? [entry.photo] : [], 
                month: monthNames[parseDateString(entry.date)?.getMonth() || 0],
                year: parseDateString(entry.date)?.getFullYear() || 0 
            }));
        }
        const groupedData: { [key: string]: GroupedDateEntry } = {};
    
        entries.forEach(entry => {
            const parsedDate = parseDateString(entry.date);
            if (!parsedDate) return; 
            const year = parsedDate.getFullYear();
            const monthIndex = parsedDate.getMonth();
            const monthName = monthNames[monthIndex];
            const day = String(parsedDate.getDate()).padStart(2, '0');
    
            let key: string;
    
            switch (groupingType) {
                case 'Year':
                    key = `${year}`;
                    if (!groupedData[key]) {
                        groupedData[key] = { year, month: monthName, dates: [], titles: [], addresses: [], descriptions: [], photos: [] };
                    }
                    groupedData[key].photos.push(entry.photo || ''); 
                    break;
                case 'Month':
                    key = `${year}-${monthIndex + 1}`;
                    if (!groupedData[key]) {
                        groupedData[key] = { month: monthName, year, dates: [], titles: [], addresses: [], descriptions: [], photos: [] };
                    }
                    groupedData[key].photos.push(entry.photo || '');
                    break;
                case 'Day':
                    key = `${year}-${monthIndex + 1}-${day}`;
                    if (!groupedData[key]) {
                        groupedData[key] = { day, month: monthName, year, dates: [], titles: [], addresses: [], descriptions: [], photos: [] };
                    }
                    groupedData[key].dates.push(entry.date);
                    groupedData[key].titles.push(entry.title || '');
                    groupedData[key].addresses.push(entry.address || ''); // Ensure address is a string
                    groupedData[key].descriptions.push(entry.description || '');
                    groupedData[key].photos.push(entry.photo || '');
                    break;
                default:
                    break;
            }
        });
        return Object.values(groupedData);
    };
    const groupedEntries = groupByDate(entries);
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }
    return (
        <StyledSafeAreaView className="flex-1 bg-white p-4">
          <StyledView className="bg-orange-200">
              <TouchableOpacity onPress={() => setGroupingType('Year')}>
                  <StyledText>Year</StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGroupingType('Month')}>
                  <StyledText>Month</StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGroupingType('Day')}>
                  <StyledText>Day</StyledText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGroupingType('All')}>
                  <StyledText>All</StyledText>
              </TouchableOpacity>
          </StyledView>
              {groupingType === 'Year' && <ViewbyYear grouped={groupedEntries} />}
              {groupingType === 'Month' && <ViewbyMonth grouped={groupedEntries} />}
              {groupingType === 'Day' && <ViewbyDay grouped={groupedEntries} />}
              {groupingType === 'All' && <AllMoments grouped={groupedEntries} />}
        </StyledSafeAreaView>
    );
};

export default MomentsNavigator;
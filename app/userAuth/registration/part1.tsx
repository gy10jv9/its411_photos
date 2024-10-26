import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorSchemeContext } from '../../../context/ColorSchemeContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useRegistrationFormData } from './regData';
import { Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
const Reg_Part1  = () => {
    const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    const router = useRouter();
    const {formData, setFormData} = useRegistrationFormData()
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    const handleNextStep = () => {
        router.push("/userAuth/registration/part2")
    }
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/')}>
                <StyledText>Back</StyledText>
            </StyledPressable>

            <StyledView className="flex flex-col items-center justify-center h-screen w-[100vw] px-8">
                <StyledText>Let's get to know each other</StyledText>
                <StyledText className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                </StyledText>
                <StyledTextInput
                    className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChangeText={(value) => handleInputChange('firstName', value)}
                />
                <StyledTextInput
                    className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChangeText={(value) => handleInputChange('lastName', value)}
                />
                <StyledTextInput
                    className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                    placeholder="Birth Date"
                    value={formData.birthDate}
                    onChangeText={(value) => handleInputChange('birthDate', value)}
                />
                {/* <Button title="Open" onPress={() => setOpen(true)} />
                <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                /> way ni ga gana grrrr */}

                <StyledView className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full">
                <Text style={{ color: 'gray' }}>Gender</Text>
                <Picker
                    selectedValue={formData.gender}
                    onValueChange={(itemValue) => handleInputChange('gender', itemValue)}
                    style={{ height: 50, width: '100%' }}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
            </StyledView>

                <StyledPressable
                    className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5"
                    onPress={handleNextStep}>
                    <StyledText className="text-white">Next Step</StyledText>
                </StyledPressable>
            </StyledView>
        </SafeAreaView>
    );
};

export default Reg_Part1 ;
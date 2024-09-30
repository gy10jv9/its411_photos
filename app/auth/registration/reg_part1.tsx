import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorSchemeContext } from '../../../context/ColorSchemeContext';
import { useRouter, Href } from 'expo-router';
import { routes } from '@/constants/routes';
import { useState } from 'react';
import { useRegistrationFormData } from './regData';
const Reg_Part1 = () => {
    const { colorScheme, toggleColorScheme } = useColorSchemeContext();
    const router = useRouter();
    const {formData, setFormData} = useRegistrationFormData()
    const handleInputChange = (field: keyof typeof formData, value: string) => {
        setFormData({ ...formData, [field]: value });
    };
    const handleNextStep = () => {
        router.push(routes.registration.part2 as Href);
    }
    return (
        <SafeAreaView>
            <StyledPressable onPress={() => router.push('/' as Href)}>
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
                    placeholder="Date of Birth"
                    value={formData.birthDate}
                    onChangeText={(value) => handleInputChange('birthDate', value)}
                />
                <StyledTextInput
                    className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
                    placeholder="Gender"
                    value={formData.gender}
                    onChangeText={(value) => handleInputChange('gender', value)}
                />

                <StyledPressable
                    className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5"
                    onPress={handleNextStep}>
                    <StyledText className="text-white">Next Step</StyledText>
                </StyledPressable>
            </StyledView>
        </SafeAreaView>
    );
};

export default Reg_Part1;

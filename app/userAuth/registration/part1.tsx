import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useRegistrationFormData } from './regData';
import { Button, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
const Reg_Part1 = () => {
    const router = useRouter();
    const { formData, setFormData } = useRegistrationFormData();
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);
  
    const handleInputChange = (field: keyof typeof formData, value: string) => {
      setFormData({ ...formData, [field]: value });
    };
  
    const handleNextStep = () => {
      router.push("/userAuth/registration/part2");
    };
  
    return (
      <SafeAreaView>
        <StyledPressable
          onPress={() => router.push('/')}
          className="absolute top-6 left-4"
        >
          <StyledText className="text-indigo-700 font-semibold">Back</StyledText>
        </StyledPressable>
  
        <StyledView className="flex flex-col items-center justify-center h-screen w-full px-8 bg-gray-100">
          <StyledText className="text-2xl font-bold text-indigo-700 mb-4">
            Let's get to know each other
          </StyledText>
          <StyledText className="text-sm text-gray-500 text-center mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
          </StyledText>
  
          <StyledTextInput
            className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange('firstName', value)}
          />
          <StyledTextInput
            className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={(value) => handleInputChange('lastName', value)}
          />
          <StyledView className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm">
            <StyledPressable onPress={() => setOpen(true)}>
                <StyledText className="text-gray-500">
                {formData.birthDate ? formData.birthDate : "Select Birth Date"}
                </StyledText>
            </StyledPressable>

            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(selectedDate) => {
                setOpen(false);
                const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
                handleInputChange('birthDate', formattedDate);
                }}
                onCancel={() => setOpen(false)}
            />
            </StyledView>
  
          <StyledView className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-6 w-full shadow-sm">
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
            className="bg-indigo-700 py-3 w-full rounded-full shadow-lg"
            onPress={handleNextStep}
          >
            <StyledText className="text-white text-center text-lg font-semibold">
              Next Step
            </StyledText>
          </StyledPressable>
        </StyledView>
      </SafeAreaView>
    );
  };
  
  

export default Reg_Part1 ;
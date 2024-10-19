import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable } from '../../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorSchemeContext } from '../../../context/ColorSchemeContext';
import { useRouter, Href } from 'expo-router';
import { useState } from 'react';
import { useRegistrationFormData } from './regData';
import { Register } from '@/functions/users/users';

const Reg_Part2 = () => {
  const { colorScheme, toggleColorScheme } = useColorSchemeContext();
  const router = useRouter();
  const { formData, setFormData } = useRegistrationFormData();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    const result = await Register(formData);
    if (result) {
      router.push('/')
    } else {
      alert("Registration successful!");
      
    }
  };

  return (
    <SafeAreaView>
      <StyledPressable onPress={() => router.push('/' as Href)}>
        <StyledText>Back</StyledText>
      </StyledPressable>
      <StyledView>
        <StyledTextInput
          className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
        />
        <StyledTextInput
          className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
          secureTextEntry
        />
        <StyledTextInput
          className="bg-transparent border border-gray-300 rounded-md py-2 px-4 my-0.5 w-full"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        {error && <StyledText className="text-red-500">{error}</StyledText>}
        <StyledPressable
          className="bg-indigo-700 text-white py-2 w-full rounded-full my-0.5"
          onPress={handleRegister}>
          <StyledText className="text-white">Register</StyledText>
        </StyledPressable>
      </StyledView>
    </SafeAreaView>
  );
};

export default Reg_Part2;

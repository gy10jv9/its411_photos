import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable, StyledSafeAreaView } from '../../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Href } from 'expo-router';
import { useState } from 'react';
import { useRegistrationFormData } from './regData';
import { Register } from '@/functions/users/users';

const Reg_Part2 = () => {
  const router = useRouter();
  const { formData, setFormData } = useRegistrationFormData();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const handleRegister = async () => {
    setLoading(true); // Start loading
    const result = await Register(formData);
    if (result && result.success) {
      alert("Registration successful!");
      setFormData({
        firstName: '',
        lastName: '',
        birthDate: '',
        gender: '',
        email: '',
        password: ''
      })
      router.push('/userAuth/signin');
    } else {
      alert(result.message || "An error occurred during registration."); 
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-gray-50">
  <StyledPressable
    onPress={() => router.push('/userAuth/registration/part1')}
    className="p-4"
  >
    <StyledText className="text-indigo-600 font-medium">Back</StyledText>
  </StyledPressable>
  <StyledView className="flex flex-col items-center justify-center h-full w-full px-6">
    <StyledTextInput
      className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
      placeholder="Email"
      value={formData.email}
      onChangeText={(value) => setFormData({ ...formData, email: value })}
    />
    <StyledTextInput
      className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
      placeholder="Password"
      value={formData.password}
      onChangeText={(value) => setFormData({ ...formData, password: value })}
      secureTextEntry
    />
    <StyledTextInput
      className="bg-white border border-gray-300 rounded-md py-2 px-4 mb-4 w-full shadow-sm"
      placeholder="Confirm Password"
      value={confirmPassword}
      onChangeText={setConfirmPassword}
      secureTextEntry
    />
    {error && (
      <StyledText className="text-red-500 text-sm mb-4 text-center">
        {error}
      </StyledText>
    )}
    {/* <StyledPressable
      className="bg-indigo-700 py-2 w-full rounded-full shadow-md"
      onPress={handleRegister}
    >
      <StyledText className="text-white text-center font-semibold">
        Register
      </StyledText>
    </StyledPressable> */}
    <StyledPressable
          className={`bg-indigo-700 py-3 px-4 rounded-full w-full mt-4 ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleRegister}
          disabled={loading} // Disable button when loading
        >
          <StyledText className="text-white text-center text-lg font-semibold">
            {loading ? 'Creating Account...' : 'Register'} {/* Show loading text */}
          </StyledText>
        </StyledPressable>
  </StyledView>
    </StyledSafeAreaView>

  );
};

export default Reg_Part2;

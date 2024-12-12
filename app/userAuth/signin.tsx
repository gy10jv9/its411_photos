import { useState } from 'react';
import { StyledView, StyledText, StyledTextInput, StyledButton, StyledPressable, StyledSafeAreaView } from '../../components/StyledComponents';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Href } from 'expo-router';
import { Login } from '@/functions/users/users';
import { useRegistrationFormData } from './registration/regData';
import { useUser } from '@/userContext/userContext';

const Signin = () => {
  const { useruid, setUseruid } = useUser();
  const router = useRouter();
  const { formData, setFormData } = useRegistrationFormData();
  const [loading, setLoading] = useState(false); 

  const handleLogin = async () => {
    setLoading(true); // Start loading
    try {
      const result = await Login(formData);
      if (result.success === true && result.userUID) {
        alert("Login successful!");
        setFormData({
          ...formData,
          email: '',
          password: ''
        });
        setUseruid(result.userUID ?? null);
        router.push('/highlights/addDay');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred during login. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <StyledSafeAreaView>
      <StyledView className="flex flex-col items-center justify-center h-screen w-full px-8 bg-gray-100">
        <StyledText className="text-3xl font-bold text-indigo-700 mb-6">
          Sign In
        </StyledText>

        <StyledTextInput
          className="bg-white border border-gray-300 rounded-md py-2 px-4 my-2 w-full shadow-md"
          placeholder="Email"
          value={formData.email}
          onChangeText={(value) => setFormData({ ...formData, email: value })}
        />
        <StyledTextInput
          className="bg-white border border-gray-300 rounded-md py-2 px-4 my-2 w-full shadow-md"
          placeholder="Password"
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => setFormData({ ...formData, password: value })}
        />

        <StyledPressable
          className={`bg-indigo-700 py-3 px-4 rounded-full w-full mt-4 ${
            loading ? 'opacity-50' : ''
          }`}
          onPress={handleLogin}
          disabled={loading} // Disable button when loading
        >
          <StyledText className="text-white text-center text-lg font-semibold">
            {loading ? 'Signing In...' : 'Login'} {/* Show loading text */}
          </StyledText>
        </StyledPressable>

        <StyledView className="flex flex-row items-center justify-center mt-4">
          <StyledText className="text-gray-600">I don't have an account. </StyledText>
          <StyledPressable onPress={() => router.push("/userAuth/registration/part1")}>
            <StyledText className="text-indigo-700 font-semibold">Register Here</StyledText>
          </StyledPressable>
        </StyledView>

        <StyledPressable className="mt-6" onPress={() => router.replace("/home")}>
          <StyledText className="text-gray-500 underline">Bypass Authentication</StyledText>
        </StyledPressable>
      </StyledView>
    </StyledSafeAreaView>
  );
};

export default Signin;

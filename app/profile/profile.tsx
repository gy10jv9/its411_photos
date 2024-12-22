import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { 
  StyledSafeAreaView, 
  StyledText, 
  StyledView, 
  StyledTextInput, 
  StyledTouchableOpacity, 
  StyledImage 
} from '@/components/StyledComponents';
import { fetchUserDetails } from '@/functions/users/users';
import { User } from '@/Interface/interface';
import { useUser } from '@/userContext/userContext';
import Burger from '../burger/burger';

const Profile: React.FC = () => {
  const { useruid } = useUser();
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [burger, setBurger] = useState(false);

  const openBurger = () => setBurger(true);
  const closeBurger = () => setBurger(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const result = await fetchUserDetails('2ArEMvzZKVSAS8lwsJtfuhZm3a12');
      setUserDetails(result.data);
    }
    fetchUserData();
  }, [useruid]);

  return (
    <StyledSafeAreaView className="bg-white px-6 w-full h-screen">
      {/* Header Section */}
      <StyledView className="pt-5 bg-white border-b border-gray-200">
        <StyledView className="h-20 w-full flex flex-wrap px-2 flex-row items-center justify-between">
          {/* Left Side - Title */}
          <StyledView className="flex-1">
            <StyledText className="text-2xl font-bold">Profile</StyledText>
          </StyledView>
          {/* Right Side - Menu Icon */}
          <StyledTouchableOpacity onPress={openBurger} className="ml-auto">
            <StyledImage source={require('../../assets/images/lifelogo.png')} className="w-12 h-12" />
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      {/* User Profile Details */}
      <FlatList
        data={userDetails}
        renderItem={({ item }) => (
          <StyledView className="rounded-lg bg-gray-100 p-4 mb-4">
            <StyledView className="flex flex-row items-center">
              {/* <StyledImage source={require('../../assets/images/profile-placeholder.png')} className="w-12 h-12 rounded-full" /> */}
              <StyledText className="ml-4 text-lg font-semibold">
                {item.firstName} {item.lastName}
              </StyledText>
            </StyledView>
            <StyledView className="mt-4">
              <StyledText className="text-gray-600">Email: {item.email}</StyledText>
              <StyledText className="text-gray-600">Birth Date: {item.birthDate}</StyledText>
              <StyledText className="text-gray-600">Gender: {item.gender}</StyledText>
            </StyledView>
          </StyledView>
        )}
        keyExtractor={(item) => item.id || `${item.email}-${item.firstName}`}
        ListEmptyComponent={(
          <StyledView className="flex-1 justify-center items-center">
            <StyledText className="text-center text-gray-500">No user details available.</StyledText>
          </StyledView>
        )}
      />

      {/* Burger Menu */}
      {burger && (
        <StyledView className="absolute top-0 right-0 shadow-md rounded-md z-20">
          <Burger closeBurger={closeBurger} />
        </StyledView>
      )}
    </StyledSafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
  },
});

export default Profile;

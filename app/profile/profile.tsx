import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { 
  StyledSafeAreaView, 
  StyledText, 
  StyledView, 
  StyledTextInput 
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
      <StyledView className="pt-5 bg-orange-200">
        <StyledView className="h-20 w-full flex flex-wrap p-2">
          {/* Left Side - Title */}
          <StyledView className="w-2/3 h-full flex justify-center">
            <StyledText className="text-2xl mb-1">Profile</StyledText>
          </StyledView>
          {/* Right Side - Menu Icon */}
          <StyledView className="w-1/3 h-full flex flex-row justify-center items-center">
            <TouchableOpacity onPress={openBurger} style={{ marginLeft: 'auto' }}>
              <Image source={require('../../assets/images/lifelogo.png')} style={styles.logo} />
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* User Profile Details */}
      <FlatList
        data={userDetails}
        renderItem={({ item }) => (
          <StyledView className="rounded-lg bg-orange-100 p-4 mb-4">
            <StyledView className="flex flex-row items-center">
              {/* <Image source={require('../../assets/images/profile-placeholder.png')} style={styles.profile} /> */}
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
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#000',
  },
});

export default Profile;

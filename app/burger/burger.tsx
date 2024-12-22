import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
import { useRouter } from 'expo-router';

// Define the type for props
interface BurgerProps {
  closeBurger: () => void;
}

const Burger: React.FC<BurgerProps> = ({ closeBurger }) => {
  const navigation = useNavigation();

  const handleNavigation = (route: string) => {
    navigation.navigate(route as never);
    closeBurger(); // Close menu after navigation
  };
  const router=useRouter()
  const handleLogout = () => {
    alert('Logged out successfully');
    closeBurger();
  };

  return (
    <StyledSafeAreaView className="w-screen h-screen p-0 bg-transparent flex flex-row-reverse">
      {/* Logo Section */}
      <StyledView className='h-screen w-3/5 opacity-100 bg-white'> 
      <StyledView className="w-full flex-2 justify-center items-center">
        <TouchableOpacity onPress={closeBurger}>
          <Image source={require('../../assets/images/lifelogo.png')} style={styles.logo} />
        </TouchableOpacity>
      </StyledView>
      
      {/* Navigation Section */}
      <StyledView className=" w-full flex-3 justify-evenly items-center">
        <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/profile/profile')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/highlights/addDay')}>
          <Text style={styles.buttonText}>Add Day</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/highlights/viewByYear')}>
          <Text style={styles.buttonText}>Yearly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/highlights/viewByMonth')}>
          <Text style={styles.buttonText}>Monthly</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => router.push('/')}>
          <StyledText className='text-white pr-2 text-xl text-right'>Logout</StyledText>
        </TouchableOpacity>
      </StyledView>
      </StyledView>
    </StyledSafeAreaView>
    
  );
};

export default Burger;

const styles = StyleSheet.create({
  logo: {
    width: 210,
    height: 200,
    marginRight: 0,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 8,
    marginVertical: 8,
    width:200,
  },
  buttonText: {
    color: '#000',
    fontSize: 20,
    paddingLeft:10,
    fontWeight: '600',
    textAlign: 'right'
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
});

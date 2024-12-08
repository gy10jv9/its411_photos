import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyledSafeAreaView, StyledView } from '@/components/StyledComponents';
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
    <StyledSafeAreaView className="w-screen h-screen p-0 bg-transparent z-99">
      {/* Logo Section */}
      <StyledView className="w-3/4 flex-1 justify-center items-center">
        <TouchableOpacity style={styles.button} onPress={closeBurger}>
          <Image source={require('../../assets/images/lifelogo.png')} style={styles.logo} />
        </TouchableOpacity>
      </StyledView>
      
      {/* Navigation Section */}
      <StyledView className="bg-red-300 w-3/4 flex-2 justify-evenly items-center">
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Entries</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Add Day</Text>
        </TouchableOpacity>
      </StyledView>
      
      {/* Logout Section */}
      <StyledView className="bg-blue-300 w-3/4 flex-1 justify-center items-center">
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => router.push('/')}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </StyledView>
    </StyledSafeAreaView>
    
  );
};

export default Burger;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#007bff',
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
});

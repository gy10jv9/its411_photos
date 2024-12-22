import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyledSafeAreaView, StyledText, StyledView, StyledTouchableOpacity, StyledImage } from '@/components/StyledComponents';
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
					<StyledImage source={require('../../assets/images/lifelogo.png')} className="w-52 h-52" />
				</TouchableOpacity>
			</StyledView>
		
			{/* Navigation Section */}
			<StyledView className="w-full flex-3 justify-evenly items-center">
				<StyledTouchableOpacity className="py-4 rounded-lg my-2 w-48 bg-violet-500" onPress={() => router.push('/home')}>
					<StyledText className="text-white text-xl font-semibold text-right pr-4">Home</StyledText>
				</StyledTouchableOpacity>
				<StyledTouchableOpacity className="py-4 rounded-lg my-2 w-48 bg-violet-500" onPress={() => router.push('/home')}>
					<StyledText className="text-white text-xl font-semibold text-right pr-4">Profile</StyledText>
				</StyledTouchableOpacity>
				<StyledTouchableOpacity className="py-4 rounded-lg my-2 w-48 bg-violet-500" onPress={() => router.push('/highlights/momentNav')}>
					<StyledText className="text-white text-xl font-semibold text-right pr-4">Entries</StyledText>
				</StyledTouchableOpacity>
				<StyledTouchableOpacity className="py-4 rounded-lg my-2 w-48 bg-violet-500" onPress={() => router.push('/highlights/addDay')}>
					<StyledText className="text-white text-xl font-semibold text-right pr-4">Add Day</StyledText>
				</StyledTouchableOpacity>
				<StyledTouchableOpacity className="py-4 rounded-lg my-2 w-48 bg-red-600" onPress={() => router.push('/')}>
					<StyledText className='text-white text-xl text-right pr-4'>Logout</StyledText>
				</StyledTouchableOpacity>
			</StyledView>
		</StyledView>
	</StyledSafeAreaView>
  );
};

export default Burger;

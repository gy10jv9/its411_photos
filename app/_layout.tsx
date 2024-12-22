import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '@/userContext/userContext';
import { MomentProvider } from '@/context/MomentContext';
import Burger from './burger/burger';

export default function App() {
	return (
	  <UserProvider>
		<MomentProvider>
		<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='home' options={{ headerShown: false }} />
				<Stack.Screen name='userAuth/signin' options={{ headerShown: false }} />
				<Stack.Screen name='userAuth/registration/part1' options={{ headerShown: false }} />
				<Stack.Screen name='userAuth/registration/part2' options={{ headerShown: false }} />

				<Stack.Screen name='highlights/addDay' options={{ headerTitle: 'Add Moment', headerTitleAlign: 'center' }} />
				<Stack.Screen name='highlights/diaryEntries' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/viewMoment' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/viewByDay' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/viewByMonth' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/viewByYear' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/allMoments' options={{ headerShown: false }} />
				{/* test */}
				<Stack.Screen name='tests/camera' options={{ headerShown: false }} />
				
			</Stack>
		</MomentProvider>
		{/* <ColorSchemeProvider> */}
			
		{/* </ColorSchemeProvider> */}
	  </UserProvider>
	);
  }
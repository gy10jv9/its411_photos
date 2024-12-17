import React from 'react';
import { Stack } from 'expo-router';
import { UserProvider } from '@/userContext/userContext';
import { MomentProvider } from '@/context/MomentContext';

export default function App() {
	return (
	  <UserProvider>
		<MomentProvider>
		<Stack>
				<Stack.Screen name='index' options={{ headerShown: false }} />
				<Stack.Screen name='home' options={{ headerShown: false }} />
				{/* auth */}
				<Stack.Screen name='userAuth/signin' options={{ headerShown: false }} />
				<Stack.Screen name='userAuth/registration/part1' options={{ headerShown: false }} />
				<Stack.Screen name='userAuth/registration/part2' options={{ headerShown: false }} />
				{/* highlights */}
				<Stack.Screen name='highlights/addDay' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/diaryEntries' options={{ headerShown: false }} />
				<Stack.Screen name='highlights/viewMoment' options={{ headerShown: false }} />

				{/* test */}
				<Stack.Screen name='tests/camera' options={{ headerShown: false }} />
				
			</Stack>
		</MomentProvider>
		{/* <ColorSchemeProvider> */}
			
		{/* </ColorSchemeProvider> */}
	  </UserProvider>
	);
  }
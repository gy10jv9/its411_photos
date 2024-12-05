import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';
import { UserProvider } from '@/userContext/userContext';

export default function App() {
	return (
		<UserProvider>
			<ColorSchemeProvider>
			<Stack>
				<Stack.Screen name='userAuth' options={{ headerShown: false }} />
				<Stack.Screen name='highlights' options={{ headerShown: false }} />
				<Stack.Screen name='tests' options={{ headerShown: false }} />
				<Stack.Screen name='home' options={{ headerShown: false }} />
			</Stack>
			</ColorSchemeProvider>
		</UserProvider>
	);
  }

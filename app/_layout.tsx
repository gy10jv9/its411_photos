import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<Stack>
				{/* Add "options={{ headerShown: false }}" para mag hide header */}
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="auth/registration" options={{ headerShown: false }}/>
				<Stack.Screen name="auth/login" options={{ headerShown: false }}/>
			</Stack>
		</ColorSchemeProvider>
	);
}

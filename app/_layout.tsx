import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';
import { routes } from './constants/routes';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<Stack>
				{/* Add "options={{ headerShown: false }}" para mag hide header */}
				<Stack.Screen name={routes.home} options={{ headerShown: false }} />
				<Stack.Screen name={routes.} options={{ headerShown: false }}/>
				<Stack.Screen name="auth/signin" options={{ headerShown: false }}/>
			</Stack>
		</ColorSchemeProvider>
	);
}

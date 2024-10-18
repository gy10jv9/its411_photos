import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<Stack>
				<Stack.Screen name='userAuth' />
				<Stack.Screen name='highlights' />
			</Stack>
		</ColorSchemeProvider>
	);
}

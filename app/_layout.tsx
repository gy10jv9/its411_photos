import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<Stack>
				<Stack.Screen name='userAuth' options={{headerShown: false}}/>
				<Stack.Screen name='highlights' options={{headerShown: false}} />
				<Stack.Screen name='tests'options={{headerShown: false}} />
			</Stack>
		</ColorSchemeProvider>
	);
}

import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';
import { routes } from '@/constants/routes';

export default function RootLayout() {
	return (
		<ColorSchemeProvider>
			<Stack>
				{/* ara sa .constants/routes ang mga string para sa routing */}
				{/* Add "options={{ headerShown: false }}" para mag hide header */}
				<Stack.Screen name={routes.home} options={{ headerShown: false }} />
				<Stack.Screen name={routes.signin} options={{ headerShown: false }}/>
				<Stack.Screen name={routes.registration.part1} options={{ headerShown: false }}/>
				<Stack.Screen name={routes.registration.part2} options={{ headerShown: false }}/>
			</Stack>
		</ColorSchemeProvider>
	);
}

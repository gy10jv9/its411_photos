import React from 'react';
import { Stack } from 'expo-router';
import { ColorSchemeProvider } from '../context/ColorSchemeContext';

export default function RootLayout() {
  return (
    <ColorSchemeProvider>
      <Stack>
        {/* Add "options={{ headerShown: false }}" to hide the header */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/registration" />
        <Stack.Screen name="auth/login" />
      </Stack>
    </ColorSchemeProvider>
  );
}

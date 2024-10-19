import { Stack } from "expo-router";

const RegistrationLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="part1" options={{headerShown: false}} />
            <Stack.Screen name="part2" options={{headerShown: false}}/>
        </Stack>
    )
}

export default RegistrationLayout
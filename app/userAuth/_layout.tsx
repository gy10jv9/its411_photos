import { Tabs } from "expo-router"

const UserAuthLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="signin" options={{headerShown: false}}/>
            <Tabs.Screen name="registration" options={{headerShown: false}}/>
        </Tabs>
    )
}

export default UserAuthLayout
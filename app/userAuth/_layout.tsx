import { Tabs } from "expo-router"

const UserAuthLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="signin" />
            <Tabs.Screen name="registration" />
        </Tabs>
    )
}

export default UserAuthLayout
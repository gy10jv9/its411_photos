// import { StyledView, StyledText, StyledTextInput, StyledPressable } from '../../components/StyledComponents'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import {  Switch } from 'react-native'
// import { useColorSchemeContext } from '../../context/ColorSchemeContext'

// const Login = () => {
//     const  { colorScheme, toggleColorScheme } = useColorSchemeContext()

//     return (
//         <SafeAreaView>
//             <StyledView className='dark:bg-slate-500'>
//                 <StyledText> Login Page </StyledText>
//                 <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Username" />
//                 <StyledTextInput className="border border-gray-300 p-2 mb-4 rounded" placeholder="Password" />
//                 <StyledPressable className="bg-blue-500 p-2 rounded">
//                     <StyledText className="text-white text-center"> Loginnnn </StyledText>
//                 </StyledPressable>
//             </StyledView>

//             <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
//         </SafeAreaView>
//   );
// }

// export default Login;
import React, { useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import '@react-native-firebase/app'

const Login = () => {
    const logButtonPress = async () => {
        await analytics().logEvent('button_press', {
            button: 'example_button',
        });
        console.log('Button press event logged');
    };

    useEffect(() => {
        const logScreenView = async () => {
            await analytics().logEvent('screen_view', {
                screen: 'HomeScreen',
            });
            console.log('Screen view event logged');
        };

        logScreenView();
    }, []);

    return (
        <View>
            <Text>Welcome to the Example Component!</Text>
            <Button title="Log Button Press" onPress={logButtonPress} />
        </View>
    );
};

export default Login;






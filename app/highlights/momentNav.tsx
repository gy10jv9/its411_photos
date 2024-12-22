// import React, { useState } from 'react';
// import { TouchableOpacity, StyleSheet } from 'react-native';
// import { StyledButton, StyledSafeAreaView, StyledText, StyledView } from '@/components/StyledComponents';
// import WrapMoments from './wrapMoments';

// const MomentsNavigator: React.FC = () => {
//   const [groupingType, setGroupingType] = useState<'Year' | 'Month' | 'Day' | 'All'>('All');
  
//   const handlePress = (type: 'Year' | 'Month' | 'Day' | 'All') => {
//     console.log(`Touchable pressed: ${type}`);
//     setGroupingType(type);
//   };

//   return (
//     <StyledSafeAreaView className="flex-1 bg-white p-4">
//       <StyledView className="bg-orange-200 flex flex-row" pointerEvents="auto">
//         <TouchableOpacity style={styles.touchable} onPress={() => handlePress('Year')}>
//           <StyledText className="text-center p-2">Year</StyledText>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.touchable} onPress={() => handlePress('Month')}>
//           <StyledText className="text-center p-2">Month</StyledText>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.touchable} onPress={() => handlePress('Day')}>
//           <StyledText className="text-center p-2">Day</StyledText>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.touchable} onPress={() => handlePress('All')}>
//           <StyledText className="text-center p-2">All</StyledText>
//         </TouchableOpacity>
//       </StyledView>
//       <WrapMoments groupingType={groupingType} />
//     </StyledSafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   touchable: {
//     width: '25%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 20,
//     backgroundColor: '#f0f0f0',
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
// });

// export default MomentsNavigator;

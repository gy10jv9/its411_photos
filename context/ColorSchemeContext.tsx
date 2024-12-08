// import React, { createContext, ReactNode, useContext } from 'react';
// import { useColorScheme as useNativewindColorScheme } from 'nativewind';

// interface ColorSchemeContextType {
//     colorScheme: 'light' | 'dark';
//     toggleColorScheme: () => void;
// }

// const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(undefined);

// interface ColorSchemeProviderProps {
//     children: ReactNode;
// }

// export const ColorSchemeProvider: React.FC<ColorSchemeProviderProps> = ({ children }) => {
//     const { colorScheme, setColorScheme } = useNativewindColorScheme();

//     const toggleColorScheme = () => {
//         setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
//     };

//     return (
//         <ColorSchemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
//             {children}
//         </ColorSchemeContext.Provider>
//     );
// };

// export const useColorSchemeContext = (): ColorSchemeContextType => {
//     const context = useContext(ColorSchemeContext);
//     if (!context) {
//         throw new Error('useColorSchemeContext must be used within a ColorSchemeProvider');
//     }
//     return context;
// };

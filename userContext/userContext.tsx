import React, { createContext, useState, useContext } from 'react';

// Define types
type UserContextType = {
  useruid: string | null;
  username: string | null;
  setUser: (uid: string | null, username: string | null) => void; // Two arguments expected
};


// Create context
const UserContext = createContext<UserContextType | undefined>(undefined);

// UserProvider Component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Correctly define the state
  const [useruid, setUseruid] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  const setUser = (uid: string | null, username: string | null) => {
    setUseruid(uid);
    setUsername(username);
  };

  return (
    <UserContext.Provider value={{ useruid, username, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

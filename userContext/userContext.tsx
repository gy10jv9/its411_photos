import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
  useruid: string | null;
  setUseruid: (uid: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [useruid, setUseruid] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ useruid, setUseruid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};

import React, { createContext, useState, useContext } from 'react';

type UserContextType = {
  momentId: string | null;
  setMomentId: (uid: string | null) => void;
};

const MomentContext = createContext<UserContextType | undefined>(undefined);

export const MomentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [momentId, setMomentId] = useState<string | null>(null);

  return (
    <MomentContext.Provider value={{ momentId, setMomentId }}>
      {children}
    </MomentContext.Provider>
  );
};

export const useMoment = () => {
  const context = useContext(MomentContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
};
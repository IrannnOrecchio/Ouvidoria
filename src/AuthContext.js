import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './connectionFirebase';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  console.log("Valor do contexto em useAuth:", context);

  return context.currentUser;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("Usuário autenticado em AuthProvider:", user);
      setCurrentUser(user);
    });

    return () => {
      console.log("Unsubscribed em AuthProvider");
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
  };

  console.log("Valor do contexto em AuthProvider:", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import "../firebase/firebaseConfig";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
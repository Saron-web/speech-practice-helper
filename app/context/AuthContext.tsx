"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "../firebase/firebaseConfig";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const [user, setUser] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null); // <-- username stored here

  // Listen for Firebase login state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        // Load username from Firestore
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUserData(snap.data()); // { username, email }
        }
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // REGISTER FUNCTION
  const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN FUNCTION
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // LOGOUT FUNCTION
  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
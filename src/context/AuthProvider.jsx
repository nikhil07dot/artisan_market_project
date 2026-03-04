// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import AuthContext from "./AuthContext";
import { onAuthStateChanged, signOut, setPersistence, browserSessionPersistence } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set persistence to session (cleared when tab/browser is closed)
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);
        });

        return () => unsubscribe();
      })
      .catch((error) => {
        console.error("Failed to set session persistence:", error);
      });
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

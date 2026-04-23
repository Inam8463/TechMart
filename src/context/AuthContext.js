import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('techmart_user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('techmart_users') || '[]');
    if (users.find(u => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = { id: Date.now(), name, email, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem('techmart_users', JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    setUser(safeUser);
    localStorage.setItem('techmart_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('techmart_users') || '[]');
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('techmart_user', JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('techmart_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

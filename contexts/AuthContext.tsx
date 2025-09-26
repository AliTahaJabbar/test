
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '../types';
import { FOLLOWER_USERNAME, FOLLOWER_PASSWORD, ADMIN_USERNAME, DEFAULT_ADMIN_PASSWORD } from '../constants';

interface AuthContextType {
  userRole: UserRole;
  login: (role: UserRole, username?: string, password?: string) => boolean;
  logout: () => void;
  changePassword: (current: string, newPass: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('smartAgeUserRole') as UserRole;
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const login = (role: UserRole, username?: string, password?: string): boolean => {
    if (role === 'teamLeader') {
      localStorage.setItem('smartAgeUserRole', role);
      setUserRole(role);
      return true;
    }
    if (role === 'follower' && username === FOLLOWER_USERNAME && password === FOLLOWER_PASSWORD) {
      localStorage.setItem('smartAgeUserRole', role);
      setUserRole(role);
      return true;
    }
    if (role === 'admin' && username === ADMIN_USERNAME) {
      const adminPassword = localStorage.getItem("smartAgeAdminPassword") || DEFAULT_ADMIN_PASSWORD;
      if (password === adminPassword) {
        localStorage.setItem('smartAgeUserRole', role);
        setUserRole(role);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('smartAgeUserRole');
    setUserRole(null);
    window.location.reload();
  };

  const changePassword = (current: string, newPass: string): boolean => {
    if (userRole !== 'admin') return false;
    const currentAdminPassword = localStorage.getItem("smartAgeAdminPassword") || DEFAULT_ADMIN_PASSWORD;
    if (current === currentAdminPassword) {
        localStorage.setItem("smartAgeAdminPassword", newPass);
        return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

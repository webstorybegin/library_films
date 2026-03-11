import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext(null);

const USERS_KEY = "library_films_users";
const SESSION_KEY = "library_films_session";

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getSession = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
};

const saveSession = (user) => {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getSession());

  useEffect(() => {
    saveSession(user);
  }, [user]);

  const register = useCallback((name, email, password) => {
    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      avatar: name.charAt(0).toUpperCase(),
      createdAt: new Date().toISOString(),
    };
    saveUsers([...users, newUser]);
    const { password: _, ...sessionUser } = newUser;
    setUser(sessionUser);
    return { success: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = getUsers();
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    const { password: _, ...sessionUser } = found;
    setUser(sessionUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const resetPassword = useCallback((email, newPassword) => {
    const users = getUsers();
    const idx = users.findIndex((u) => u.email === email);
    if (idx === -1) {
      return { success: false, error: "No account found with this email" };
    }
    users[idx].password = newPassword;
    saveUsers(users);
    return { success: true };
  }, []);

  const findEmailByName = useCallback((name) => {
    const users = getUsers();
    const found = users.filter(
      (u) => u.name.toLowerCase() === name.toLowerCase().trim()
    );
    if (found.length === 0) {
      return { success: false, error: "No account found with this name" };
    }
    return {
      success: true,
      emails: found.map((u) => {
        const [local, domain] = u.email.split("@");
        const masked = local.length <= 2
          ? local[0] + "***"
          : local[0] + "***" + local[local.length - 1];
        return masked + "@" + domain;
      }),
    };
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      const users = getUsers();
      const idx = users.findIndex((u) => u.id === prev.id);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...updates };
        saveUsers(users);
      }
      return updated;
    });
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updateProfile,
    resetPassword,
    findEmailByName,
  };

  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

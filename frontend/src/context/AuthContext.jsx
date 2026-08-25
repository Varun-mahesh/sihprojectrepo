import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  useEffect(() => {
    // Load initial citizen profile for seamless demo
    api.getCurrentUser()
      .then(res => {
        if (res.user) {
          setUser(res.user);
        }
      })
      .catch(() => {
        // Fallback default citizen if offline
        setUser({
          id: 1,
          citizen_id: "CIT-2026-88192",
          full_name: "Yogesh R",
          email: "yogesh@citizen.gov.in",
          mobile: "+91 98765 43210",
          aadhaar_mock_id: "XXXX-XXXX-4910",
          state: "Delhi NCR",
          district: "New Delhi"
        });
      })
      .finally(() => setLoading(false));

    fetchNotificationsCount();
  }, []);

  const fetchNotificationsCount = async () => {
    try {
      const res = await api.getNotifications();
      if (res.unread_count !== undefined) {
        setUnreadNotifications(res.unread_count);
      }
    } catch (e) {
      console.warn("Could not fetch notifications count", e);
    }
  };

  const loginUser = (userData) => {
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
        authModalOpen,
        setAuthModalOpen,
        unreadNotifications,
        fetchNotificationsCount
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

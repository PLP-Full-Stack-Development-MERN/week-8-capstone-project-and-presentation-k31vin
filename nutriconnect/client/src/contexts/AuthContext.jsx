import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Set Axios base URL to match your backend server
axios.defaults.baseURL = 'http://localhost:5000'; // backend port

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [loading, setLoading] = useState(true);

// Check token and load user
useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    // Validate token
    validateToken(token);
    } else {
    setLoading(false);
    }
}, []);

const validateToken = async (token) => {
    try {
    const response = await axios.get('/api/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
    });
    setUser(response.data.user);
    setIsAuthenticated(true);
    } catch {
    logout();
    } finally {
    setLoading(false);
    }
};

const login = async (email, password) => {
    try {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
    
    return user;
    } catch (error) {
    throw error.response.data;
    }
};

const register = async (userData) => {
    try {
    const response = await axios.post('/api/auth/register', userData);
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    setUser(user);
    setIsAuthenticated(true);
    
    return user;
    } catch (error) {
    throw error.response.data;
    }
};

const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
};

return (
    <AuthContext.Provider value={{
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
    }}>
    {!loading && children}
    </AuthContext.Provider>
);
};

// Custom hook for using auth context
export const useAuth = () => {
const context = useContext(AuthContext);
if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
}
return context;
};
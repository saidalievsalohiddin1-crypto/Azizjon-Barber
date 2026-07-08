import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState('screen-login');
    const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem('currentUser')) || null);
    const [appUsers, setAppUsers] = useState(() => JSON.parse(localStorage.getItem('app_users')) || {});
    const [database, setDatabase] = useState(() => JSON.parse(localStorage.getItem('pro_debts')) || []);
    const [activeCurrency, setActiveCurrency] = useState(() => localStorage.getItem('currency') || 'UZS');
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'uz');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(() => localStorage.getItem('notifications_enabled') !== 'false');
    const [autosaveEnabled, setAutosaveEnabled] = useState(() => localStorage.getItem('autosave_enabled') !== 'false');
    const [toastMessage, setToastMessage] = useState(null);
    const [currentMonthFilter, setCurrentMonthFilter] = useState('all');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);

    useEffect(() => {
        localStorage.setItem('currency', activeCurrency);
    }, [activeCurrency]);

    useEffect(() => {
        localStorage.setItem('notifications_enabled', notificationsEnabled);
    }, [notificationsEnabled]);

    useEffect(() => {
        localStorage.setItem('autosave_enabled', autosaveEnabled);
    }, [autosaveEnabled]);

    useEffect(() => {
        if (autosaveEnabled) {
            localStorage.setItem('pro_debts', JSON.stringify(database));
        }
    }, [database, autosaveEnabled]);

    const showToast = (message, type = 'info') => {
        setToastMessage({ message, type, id: Date.now() });
    };

    const login = (user) => {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    };

    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
        setCurrentScreen('screen-login');
    };

    const addDebt = (debt) => {
        setDatabase(prev => [...prev, debt]);
    };

    const deleteDebt = (id) => {
        setDatabase(prev => prev.filter(d => d.id !== id));
    };

    const clearData = () => {
        setDatabase([]);
        localStorage.removeItem('pro_debts');
    };

    return (
        <AppContext.Provider value={{
            currentScreen, setCurrentScreen,
            currentUser, login, logout,
            appUsers, setAppUsers,
            database, addDebt, deleteDebt, clearData, setDatabase,
            activeCurrency, setActiveCurrency,
            language, setLanguage,
            theme, setTheme,
            notificationsEnabled, setNotificationsEnabled,
            autosaveEnabled, setAutosaveEnabled,
            toastMessage, showToast,
            currentMonthFilter, setCurrentMonthFilter
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

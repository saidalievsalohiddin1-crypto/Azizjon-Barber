import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './store/AppContext';

// Components
import AuroraBackground from './components/AuroraBackground';
import DynamicIsland from './components/DynamicIsland';
import ThemeToggle from './components/ThemeToggle';
import LoginScreen from './components/LoginScreen';
import PinScreen from './components/PinScreen';
import VipSupportScreen from './components/VipSupportScreen';
import AdminPanel from './components/AdminPanel';
import MainMenu from './components/MainMenu';
import AddDebtScreen from './components/AddDebtScreen';
import DebtListScreen from './components/DebtListScreen';
import StatsScreen from './components/StatsScreen';
import SettingsScreen from './components/SettingsScreen';
import BottomNav from './components/BottomNav';

function MainApp() {
    const { currentUser, appUsers, setCurrentScreen } = useAppContext();

    useEffect(() => {
        // Initial setup on load to check login state and pin
        if (currentUser) {
            const isExistingUser = !!appUsers[currentUser.userKey];
            setCurrentScreen('screen-pin');
        } else {
            setCurrentScreen('screen-login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AuroraBackground />
            <DynamicIsland />
            <div className="app-container">
                <ThemeToggle />
                
                <LoginScreen />
                <PinScreen />
                <VipSupportScreen />
                <AdminPanel />
                <MainMenu />
                <AddDebtScreen />
                <DebtListScreen />
                <StatsScreen />
                <SettingsScreen />

                <BottomNav />
            </div>
        </>
    );
}

function App() {
    return (
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
}

export default App;

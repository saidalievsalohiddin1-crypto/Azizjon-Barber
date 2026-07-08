import React from 'react';
import { useAppContext } from '../store/AppContext';

export default function BottomNav() {
    const { currentScreen, setCurrentScreen, currentUser, language } = useAppContext();

    if (currentScreen === 'screen-login' || currentScreen === 'screen-pin') {
        return null;
    }

    const isAdmin = currentUser && currentUser.name.toLowerCase() === 'admin' && currentUser.surname?.toLowerCase() === 'saidaliev';

    const handleNav = (screenId) => {
        setCurrentScreen(screenId);
    };

    const labels = {
        uz: { home: 'Bosh sahifa', debts: 'Qarzlar', admin: 'Admin', stats: 'Statistika', settings: 'Sozlamalar' },
        ru: { home: 'Главная', debts: 'Долги', admin: 'Админ', stats: 'Статистика', settings: 'Настройки' },
        en: { home: 'Home', debts: 'Debts', admin: 'Admin', stats: 'Stats', settings: 'Settings' }
    };
    
    const trans = labels[language] || labels['uz'];

    return (
        <div className="bottom-nav" id="bottom-nav" style={{ display: 'flex' }}>
            <button className={`nav-item ${currentScreen === 'screen-menu' ? 'active' : ''}`} onClick={() => handleNav('screen-menu')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span className="nav-label">{trans.home}</span>
            </button>
            <button className={`nav-item ${currentScreen === 'screen-view' ? 'active' : ''}`} onClick={() => handleNav('screen-view')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" />
                    <rect x="14" y="3" width="7" height="5" />
                    <rect x="14" y="12" width="7" height="9" />
                    <rect x="3" y="16" width="7" height="5" />
                </svg>
                <span className="nav-label">{trans.debts}</span>
            </button>
            {isAdmin && (
                <button className={`nav-item ${currentScreen === 'screen-admin' ? 'active' : ''}`} onClick={() => handleNav('screen-admin')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span className="nav-label">{trans.admin}</span>
                </button>
            )}
            <button className={`nav-item ${currentScreen === 'screen-stats' ? 'active' : ''}`} onClick={() => handleNav('screen-stats')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span className="nav-label">{trans.stats}</span>
            </button>
            <button className={`nav-item ${currentScreen === 'screen-settings' ? 'active' : ''}`} onClick={() => handleNav('screen-settings')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span className="nav-label">{trans.settings}</span>
            </button>
        </div>
    );
}

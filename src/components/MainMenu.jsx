import React from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';
import { formatAmount } from '../utils/currency';

export default function MainMenu() {
    const { currentScreen, setCurrentScreen, currentUser, database, language, activeCurrency } = useAppContext();

    if (currentScreen !== 'screen-menu') return null;

    const total = database.reduce((sum, debt) => sum + debt.amount, 0);
    const currentMonth = new Date().getMonth() + 1;
    const monthStr = currentMonth.toString().padStart(2, '0');
    const monthDebts = database.filter(debt => debt.date.split('-')[1] === monthStr);
    const monthTotal = monthDebts.reduce((sum, debt) => sum + debt.amount, 0);

    const trans = translations[language] || translations['uz'];

    return (
        <div className="screen active slide-in" id="screen-menu">
            <div className="menu-header">
                <div className="user-info">
                    <div className="user-avatar" id="user-avatar">{currentUser?.name?.substring(0, 2).toUpperCase()}</div>
                    <div>
                        <div className="welcome-label">{trans.welcomeLabel}</div>
                        <div className="welcome-name" id="welcome-text">{currentUser?.name}</div>
                    </div>
                </div>
                <div className="stats-pill" id="total-pill">
                    <span id="total-count">{database.length}</span> {trans.totalCountLabel}
                </div>
            </div>

            <div className="stats-row">
                <div className="stat-card stat-red">
                    <div className="stat-label">{trans.totalDebtLabel}</div>
                    <div className="stat-value" id="stat-total">{formatAmount(total, activeCurrency)}</div>
                </div>
                <div className="stat-card stat-green">
                    <div className="stat-label">{trans.thisMonthLabel}</div>
                    <div className="stat-value" id="stat-month">{formatAmount(monthTotal, activeCurrency)}</div>
                </div>
            </div>

            <div className="menu-section-label">{trans.whatToDoLabel}</div>

            <div className="main-menu-buttons">
                <button className="menu-btn add-btn" id="menu-to-add" onClick={() => setCurrentScreen('screen-add')}>
                    <div className="icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <div className="btn-text">
                        <h3>{trans.addDebtBtnTitle}</h3>
                        <p>{trans.addDebtBtnDesc}</p>
                    </div>
                    <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <button className="menu-btn view-btn" id="menu-to-view" onClick={() => setCurrentScreen('screen-view')}>
                    <div className="icon-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div className="btn-text">
                        <h3>{trans.viewDebtsBtnTitle}</h3>
                        <p>{trans.viewDebtsBtnDesc}</p>
                    </div>
                    <svg className="btn-arrow" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

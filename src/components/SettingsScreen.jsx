import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';

export default function SettingsScreen() {
    const { 
        currentScreen, setCurrentScreen, language, setLanguage, activeCurrency, setActiveCurrency,
        notificationsEnabled, setNotificationsEnabled, autosaveEnabled, setAutosaveEnabled,
        clearData, logout, showToast, currentUser
    } = useAppContext();
    
    const [showClearConfirm, setShowClearConfirm] = useState(false);

    if (currentScreen !== 'screen-settings') return null;

    const trans = translations[language] || translations['uz'];
    const isAdmin = currentUser && currentUser.name.toLowerCase() === 'admin' && currentUser.surname?.toLowerCase() === 'saidaliev';

    const handleClearConfirm = () => {
        clearData();
        showToast(trans.toastDataCleared, "success");
        setShowClearConfirm(false);
        setCurrentScreen('screen-menu');
    };

    return (
        <div className="screen active slide-in" id="screen-settings">
            <div className="screen-topbar">
                <button className="back-btn to-menu" onClick={() => setCurrentScreen('screen-menu')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trans.backBtn}
                </button>
                <span className="screen-title">{trans.settings}</span>
                <div style={{ width: '80px' }}></div>
            </div>

            <div className="settings-container">
                <div className="settings-group">
                    <div className="setting-item">
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <span id="lbl-setting-language">{trans.settingLanguage}</span>
                        </div>
                        <div className="select-wrapper">
                            <select id="language-select" value={language} onChange={e => {
                                setLanguage(e.target.value);
                                showToast(translations[e.target.value].toastLanguageChanged, "success");
                            }}>
                                <option value="uz">O'zbekcha</option>
                                <option value="ru">Русский</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            <span id="lbl-setting-currency">{trans.settingCurrency}</span>
                        </div>
                        <div className="select-wrapper">
                            <select id="currency-select" value={activeCurrency} onChange={e => {
                                setActiveCurrency(e.target.value);
                                showToast(trans.toastCurrencyChanged, "success");
                            }}>
                                <option value="UZS">So'm (UZS)</option>
                                <option value="USD">USD ($)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="RUB">RUB (₽)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="settings-group">
                    <div className="setting-item">
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                            <span id="lbl-setting-notifications">{trans.settingNotifications}</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={notificationsEnabled} onChange={e => setNotificationsEnabled(e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                    </div>

                    <div className="setting-item">
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            <span id="lbl-setting-autosave">{trans.settingAutosave}</span>
                        </div>
                        <label className="switch">
                            <input type="checkbox" checked={autosaveEnabled} onChange={e => setAutosaveEnabled(e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                <button className="btn-danger" id="clear-data-btn" style={{ marginBottom: '16px' }} onClick={() => setShowClearConfirm(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span id="lbl-clear-data">{trans.clearDataBtn}</span>
                </button>

                <div className="settings-group">
                    <div className="setting-item" id="btn-change-pin" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreen('screen-pin')}>
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <span id="lbl-change-pin">PIN kodni o'zgartirish</span>
                        </div>
                        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ color: 'var(--text-muted)' }}>
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>

                {isAdmin && (
                    <div className="settings-group" id="admin-panel-group" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--green)' }}>
                        <div className="setting-item" id="btn-admin-panel" style={{ cursor: 'pointer' }} onClick={() => setCurrentScreen('screen-admin')}>
                            <div className="setting-item-label" style={{ color: 'var(--green)' }}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <span>Admin Panel</span>
                            </div>
                            <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style={{ color: 'var(--green)' }}>
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                )}

                <button className="btn-danger" id="logout-btn" style={{ background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--border)', marginBottom: '24px' }} onClick={() => {
                    logout();
                    showToast(language === 'uz' ? "Hisobdan chiqildi" : (language === 'ru' ? "Вы вышли из системы" : "Logged out"), "success");
                }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    <span id="lbl-logout">Hisobdan chiqish</span>
                </button>

                <div className="app-info">
                    <div className="app-logo-mini">
                        <svg viewBox="0 0 40 40" fill="none" width="24" height="24">
                            <rect width="40" height="40" rx="8" fill="url(#gradMini)" />
                            <path d="M12 14h16M12 20h10M12 26h13" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="gradMini" x1="0" y1="0" x2="40" y2="40">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#8b5cf6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <span>Qarz Book Pro v2.0</span>
                    </div>
                    <small id="lbl-copyright">{trans.copyrightLabel}</small>
                </div>
            </div>

            {/* Confirm Clear Overlay */}
            {showClearConfirm && (
                <div className="confirm-overlay show">
                    <div className="confirm-box">
                        <div className="confirm-title">{language === 'uz' ? "Ma'lumotlarni tozalash" : (language === 'ru' ? 'Очистка данных' : 'Clear Data')}</div>
                        <div className="confirm-msg">
                            {trans.toastClearDataConfirm}
                        </div>
                        <div className="confirm-actions">
                            <button className="confirm-cancel" onClick={() => setShowClearConfirm(false)}>{trans.backBtn}</button>
                            <button className="confirm-ok" style={{ backgroundColor: 'var(--red)' }} onClick={handleClearConfirm}>
                                {language === 'uz' ? "O'chirish" : (language === 'ru' ? 'Удалить' : 'Delete')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

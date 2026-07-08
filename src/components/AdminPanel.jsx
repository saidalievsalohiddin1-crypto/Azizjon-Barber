import React from 'react';
import { useAppContext } from '../store/AppContext';

export default function AdminPanel() {
    const { currentScreen, setCurrentScreen } = useAppContext();

    if (currentScreen !== 'screen-admin') return null;

    return (
        <div className="screen active slide-in" id="screen-admin">
            <div className="screen-topbar">
                <button className="back-btn to-menu" onClick={() => setCurrentScreen('screen-settings')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Orqaga
                </button>
                <span className="screen-title">Admin Panel</span>
                <div style={{ width: '80px' }}></div>
            </div>
            
            <div className="stats-container">
                <div className="form-card" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.2)', padding: '15px', borderRadius: '12px' }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                        </div>
                        <div>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>VIP Admin</h3>
                            <p style={{ margin: '5px 0 0', opacity: 0.8, fontSize: '0.9rem' }}>Tizim holati va yordam so'rovlari</p>
                        </div>
                    </div>
                </div>

                <div className="menu-section-label">Foydalanuvchilar</div>
                <div className="form-card">
                    <div className="setting-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '15px', marginBottom: '15px' }}>
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            Jami foydalanuvchilar
                        </div>
                        <strong style={{ color: 'var(--primary-color)' }}>1 ta</strong>
                    </div>
                    <div className="setting-item">
                        <div className="setting-item-label">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            Aktiv seanslar
                        </div>
                        <strong style={{ color: 'var(--success-color)' }}>1 ta</strong>
                    </div>
                </div>

                <div className="menu-section-label">Xabarlar</div>
                <div className="form-card" style={{ textAlign: 'center', padding: '30px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="48" height="48" style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                    <p style={{ color: 'var(--text-secondary)' }}>Yangi xabarlar yo'q</p>
                </div>
            </div>
        </div>
    );
}

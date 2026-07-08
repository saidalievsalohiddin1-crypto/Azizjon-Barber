import React from 'react';
import { useAppContext } from '../store/AppContext';

export default function VipSupportScreen() {
    const { currentScreen, setCurrentScreen } = useAppContext();

    if (currentScreen !== 'screen-vip-support') return null;

    return (
        <div className="screen active slide-in" id="screen-vip-support">
            <div className="screen-topbar">
                <button className="back-btn" id="back-to-login" onClick={() => setCurrentScreen('screen-login')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Orqaga
                </button>
                <span className="screen-title">VIP Yordam</span>
                <div style={{ width: '80px' }}></div>
            </div>
            
            <div className="form-card" style={{ textAlign: 'center', marginTop: '20px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" width="64" height="64" style={{ marginBottom: '15px' }}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                <h3>Tizimga kirishda muammo bormi?</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Iltimos, admin bilan bog'laning. Biz darhol yordam beramiz!</p>
                <a href="tel:+998901234567" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', marginBottom: '15px' }}>
                    Qo'ng'iroq qilish
                </a>
                <a href="https://t.me/admin" target="_blank" rel="noreferrer" className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                    Telegram orqali yozish
                </a>
            </div>
        </div>
    );
}

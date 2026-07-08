import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';

export default function LoginScreen() {
    const { currentScreen, setCurrentScreen, showToast, language, appUsers, login } = useAppContext();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('+998 ');

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (!value.startsWith('998')) {
            value = '998' + value;
        }
        value = value.substring(0, 12);
        
        let formatted = '+998 ';
        if (value.length > 3) formatted += '(' + value.substring(3, 5);
        if (value.length > 5) formatted += ') ' + value.substring(5, 8);
        if (value.length > 8) formatted += '-' + value.substring(8, 10);
        if (value.length > 10) formatted += '-' + value.substring(10, 12);
        
        setPhone(formatted);
    };

    const handleLogin = () => {
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName) {
            showToast(language === 'uz' ? "Iltimos, ismingizni kiriting!" : (language === 'ru' ? "Пожалуйста, введите имя!" : "Please enter your name!"), "error");
            return;
        }
        
        if (phone.replace(/\D/g, '').length < 12) {
            showToast(language === 'uz' ? "Telefon raqami noto'g'ri!" : (language === 'ru' ? "Неверный номер телефона!" : "Invalid phone number!"), "error");
            return;
        }

        const userKey = phone.replace(/\D/g, '');
        const user = { name: trimmedName, surname: surname.trim(), phone: trimmedPhone, userKey, loginTime: new Date().toISOString() };
        
        login(user);
        
        // Pass temp state to pin screen via context/localstorage or just logic:
        setCurrentScreen('screen-pin');
    };

    if (currentScreen !== 'screen-login') return null;

    return (
        <div className={`screen active slide-in`} id="screen-login">
            <div className="login-top">
                <div className="app-logo">
                    <svg viewBox="0 0 40 40" fill="none">
                        <rect width="40" height="40" rx="12" fill="url(#grad1)" />
                        <path d="M12 14h16M12 20h10M12 26h13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="27" cy="26" r="5" fill="white" opacity="0.9" />
                        <path d="M25 26l1.5 1.5L29 24" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="40" y2="40">
                                <stop offset="0%" stopColor="#6366f1" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
                <h1 id="login-title">Qarz Book Pro</h1>
                <p id="login-desc">Qarzlarni oson va ishonchli boshqaring</p>
            </div>

            <div className="login-form">
                <div className="input-group">
                    <label htmlFor="login-name">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        Ismingiz
                    </label>
                    <input type="text" id="login-name" placeholder="Masalan: Islom" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="login-surname">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        Familiyangiz
                    </label>
                    <input type="text" id="login-surname" placeholder="Masalan: Karimov" value={surname} onChange={(e) => setSurname(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="login-phone">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Telefon raqam
                    </label>
                    <input type="text" id="login-phone" placeholder="+998 (90) 000-00-00" value={phone} onChange={handlePhoneChange} />
                </div>

                <button className="btn-primary" id="btn-login" onClick={handleLogin}>
                    Kirish
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
                <button className="btn-secondary mt-10" id="btn-vip-support" style={{ marginTop: '15px' }} onClick={() => setCurrentScreen('screen-vip-support')}>
                    Kirishda muammo bormi? (VIP yordam)
                </button>
            </div>
        </div>
    );
}

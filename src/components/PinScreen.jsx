import React, { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';

export default function PinScreen() {
    const { currentScreen, setCurrentScreen, currentUser, appUsers, setAppUsers, showToast, language } = useAppContext();
    const [currentPin, setCurrentPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isSettingPin, setIsSettingPin] = useState(true);
    const [isChangingPinOld, setIsChangingPinOld] = useState(false);
    const [isChangingPinNew, setIsChangingPinNew] = useState(false);
    const [targetPin, setTargetPin] = useState(null);
    const [failedAttempts, setFailedAttempts] = useState(() => parseInt(localStorage.getItem('pin_fails')) || 0);
    const [penaltyEndTime, setPenaltyEndTime] = useState(() => parseInt(localStorage.getItem('pin_penalty_end')) || 0);
    const [remainingPenalty, setRemainingPenalty] = useState(0);
    const [pinTitle, setPinTitle] = useState("PIN kodni o'rnating");
    const [pinSubtitle, setPinSubtitle] = useState("Yangi hisob uchun 4 xonali kod");
    const [errorDots, setErrorDots] = useState(false);

    useEffect(() => {
        if (currentScreen === 'screen-pin') {
            const isExistingUser = currentUser && appUsers[currentUser.userKey];
            const savedPin = isExistingUser ? appUsers[currentUser.userKey].pin : null;
            
            setTargetPin(savedPin);
            setIsChangingPinOld(false);
            setIsChangingPinNew(false);
            
            if (isExistingUser && savedPin) {
                setIsSettingPin(false);
                setPinTitle("PIN kodni kiriting");
                setPinSubtitle("Ilovaga kirish uchun");
            } else {
                setIsSettingPin(true);
                setPinTitle("PIN kodni o'rnating");
                setPinSubtitle("Yangi hisob uchun 4 xonali kod");
            }
            setCurrentPin('');
            setConfirmPin('');
        }
    }, [currentScreen, currentUser, appUsers]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            if (penaltyEndTime > now) {
                setRemainingPenalty(Math.ceil((penaltyEndTime - now) / 1000));
            } else {
                if (remainingPenalty > 0) {
                    setRemainingPenalty(0);
                    setFailedAttempts(0);
                    localStorage.setItem('pin_fails', 0);
                }
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [penaltyEndTime, remainingPenalty]);

    const handleNumClick = (num) => {
        if (remainingPenalty > 0) return;
        if (currentPin.length < 4) {
            setCurrentPin(prev => prev + num);
        }
    };

    const handleAction = (action) => {
        if (remainingPenalty > 0) return;
        if (action === 'clear') {
            setCurrentPin('');
        } else if (action === 'backspace') {
            setCurrentPin(prev => prev.slice(0, -1));
        }
    };

    useEffect(() => {
        if (currentPin.length === 4) {
            handlePinSubmit(currentPin);
        }
    }, [currentPin]);

    const triggerError = () => {
        setErrorDots(true);
        setTimeout(() => setErrorDots(false), 400);
        setCurrentPin('');
    };

    const handlePinSubmit = (pinStr) => {
        if (isChangingPinOld) {
            if (pinStr === targetPin) {
                setIsChangingPinOld(false);
                setIsChangingPinNew(true);
                setIsSettingPin(true);
                setCurrentPin('');
                setConfirmPin('');
                setPinTitle("Yangi PIN kodni kiriting");
                showToast("Eski PIN to'g'ri", "success");
            } else {
                triggerError();
                showToast("Eski PIN noto'g'ri!", "error");
            }
            return;
        }

        if (isSettingPin) {
            if (!confirmPin) {
                setConfirmPin(pinStr);
                setCurrentPin('');
                setPinTitle("PIN ni tasdiqlang");
            } else {
                if (confirmPin === pinStr) {
                    const newAppUsers = { ...appUsers };
                    newAppUsers[currentUser.userKey] = {
                        name: currentUser.name,
                        surname: currentUser.surname,
                        phone: currentUser.phone,
                        pin: pinStr
                    };
                    setAppUsers(newAppUsers);
                    localStorage.setItem('app_users', JSON.stringify(newAppUsers));
                    
                    showToast(isChangingPinNew ? "PIN kod o'zgartirildi!" : "PIN kod o'rnatildi!", "success");
                    
                    if (isChangingPinNew) {
                        setIsChangingPinNew(false);
                        setCurrentScreen('screen-settings');
                    } else {
                        setCurrentScreen('screen-menu');
                        const langStr = translations[language] || translations['uz'];
                        showToast(langStr.toastLoggedIn.replace('{name}', currentUser.name), "success");
                    }
                } else {
                    triggerError();
                    showToast("PIN kodlar mos tushmadi!", "error");
                    setConfirmPin('');
                    setPinTitle(isChangingPinNew ? "Yangi PIN kodni kiriting" : "PIN kodni o'rnating");
                }
            }
        } else {
            if (pinStr === targetPin) {
                setFailedAttempts(0);
                localStorage.setItem('pin_fails', 0);
                setCurrentScreen('screen-menu');
                const langStr = translations[language] || translations['uz'];
                showToast(langStr.toastLoggedIn.replace('{name}', currentUser.name), "success");
            } else {
                const newFails = failedAttempts + 1;
                setFailedAttempts(newFails);
                localStorage.setItem('pin_fails', newFails);
                triggerError();
                
                if (newFails >= 5) {
                    const end = Date.now() + 45000;
                    setPenaltyEndTime(end);
                    localStorage.setItem('pin_penalty_end', end);
                    showToast("Ko'p xato! 45 soniya kuting.", "error");
                } else {
                    showToast(`Xato PIN! Qolgan urinishlar: ${5 - newFails}`, "error");
                }
            }
        }
    };

    if (currentScreen !== 'screen-pin') return null;

    return (
        <div className="screen active slide-in" id="screen-pin">
            <div className="pin-header">
                <div className="app-logo-mini" style={{ margin: '0 auto 20px' }}>
                    <svg viewBox="0 0 40 40" fill="none" width="40" height="40">
                        <rect width="40" height="40" rx="12" fill="url(#grad1)" />
                        <path d="M12 14h16M12 20h10M12 26h13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 id="pin-title">{pinTitle}</h2>
                <p id="pin-subtitle">{pinSubtitle}</p>
                
                {remainingPenalty > 0 && (
                    <div className="pin-timer" id="pin-timer" style={{ display: 'block' }}>
                        Jarima: <span id="penalty-time">{remainingPenalty}</span> soniya
                    </div>
                )}
            </div>

            {remainingPenalty === 0 && (
                <div className={`pin-dots ${errorDots ? 'error' : ''}`} id="pin-dots">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className={`dot ${i < currentPin.length ? 'filled' : ''}`}></div>
                    ))}
                </div>
            )}

            <div className="numpad" style={{ opacity: remainingPenalty > 0 ? 0.5 : 1, pointerEvents: remainingPenalty > 0 ? 'none' : 'auto' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button key={num} className="num-key" onClick={() => handleNumClick(num.toString())}>{num}</button>
                ))}
                <button className="num-key action-key" onClick={() => handleAction('clear')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 6L5 20M5 6l14 14" />
                    </svg>
                </button>
                <button className="num-key" onClick={() => handleNumClick('0')}>0</button>
                <button className="num-key action-key" onClick={() => handleAction('backspace')}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                        <line x1="18" y1="9" x2="12" y2="15" />
                        <line x1="12" y1="9" x2="18" y2="15" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

import React, { useState } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';

export default function AddDebtScreen() {
    const { currentScreen, setCurrentScreen, showToast, language, currentUser, addDebt } = useAppContext();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    if (currentScreen !== 'screen-add') return null;

    const trans = translations[language] || translations['uz'];

    const handleSave = () => {
        const trimmedName = name.trim();
        const numAmount = parseFloat(amount);
        
        if (!trimmedName) {
            showToast(language === 'uz' ? "Qarzdor ismini kiriting!" : (language === 'ru' ? "Введите имя должника!" : "Enter debtor name!"), "error");
            return;
        }
        
        if (!amount || numAmount <= 0 || isNaN(numAmount)) {
            showToast(language === 'uz' ? "To'g'ri summa kiriting!" : (language === 'ru' ? "Введите корректную сумму!" : "Enter correct amount!"), "error");
            return;
        }
        
        if (!date) {
            showToast(language === 'uz' ? "Sanani tanlang!" : (language === 'ru' ? "Выберите дату!" : "Select date!"), "error");
            return;
        }
        
        const newDebt = {
            id: Date.now(),
            name: trimmedName,
            amount: numAmount,
            date: date,
            note: note.trim(),
            createdAt: new Date().toISOString(),
            createdBy: currentUser ? currentUser.name : "Noma'lum"
        };
        
        addDebt(newDebt);
        
        setName('');
        setAmount('');
        setDate(new Date().toISOString().split('T')[0]);
        setNote('');
        
        setCurrentScreen('screen-menu');
        showToast(trans.toastDebtAdded, "success");
    };

    return (
        <div className="screen active slide-in" id="screen-add">
            <div className="screen-topbar">
                <button className="back-btn to-menu" onClick={() => setCurrentScreen('screen-menu')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trans.backBtn}
                </button>
                <span className="screen-title">{trans.newDebtTitle}</span>
                <div style={{ width: '80px' }}></div>
            </div>

            <div className="form-card">
                <div className="input-group">
                    <label htmlFor="debtor-name">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                        </svg>
                        {trans.debtorNameLabel}
                    </label>
                    <input type="text" id="debtor-name" placeholder={trans.debtorNamePlaceholder} value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="debtor-amount">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                        {trans.debtorAmountLabel}
                    </label>
                    <input type="number" id="debtor-amount" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="debtor-date">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {trans.debtorDateLabel}
                    </label>
                    <input type="date" id="debtor-date" value={date} onChange={e => setDate(e.target.value)} />
                </div>

                <div className="input-group">
                    <label htmlFor="debtor-note">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 000 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {trans.debtorNoteLabel}
                    </label>
                    <input type="text" id="debtor-note" placeholder={trans.debtorNotePlaceholder} value={note} onChange={e => setNote(e.target.value)} />
                </div>

                <button className="btn-primary" id="btn-add-debt" onClick={handleSave}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trans.saveBtn}
                </button>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';
import { formatAmount } from '../utils/currency';

export default function DebtListScreen() {
    const { currentScreen, setCurrentScreen, database, deleteDebt, language, activeCurrency, currentMonthFilter, setCurrentMonthFilter, showToast } = useAppContext();
    const [search, setSearch] = useState('');
    const [selectedDebt, setSelectedDebt] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentScreen === 'screen-view') {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 600);
            return () => clearTimeout(timer);
        }
    }, [currentScreen]);

    if (currentScreen !== 'screen-view') return null;

    const trans = translations[language] || translations['uz'];

    let filtered = database;
    if (currentMonthFilter !== 'all') {
        filtered = filtered.filter(debt => debt.date.split('-')[1] === currentMonthFilter);
    }
    if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(debt => 
            debt.name.toLowerCase().includes(lowerSearch) ||
            (debt.note && debt.note.toLowerCase().includes(lowerSearch))
        );
    }

    const total = filtered.reduce((sum, debt) => sum + debt.amount, 0);
    const count = filtered.length;

    const sortedDebts = [...filtered].sort((a, b) => new Date(b.date) - new Date(a.date));

    const handleDelete = (id) => {
        setConfirmDeleteId(id);
    };

    const confirmDelete = () => {
        if (confirmDeleteId !== null) {
            deleteDebt(confirmDeleteId);
            setConfirmDeleteId(null);
            showToast(trans.toastDebtDeleted, "success");
        }
    };

    return (
        <div className="screen active slide-in" id="screen-view">
            <div className="screen-topbar">
                <button className="back-btn to-menu" onClick={() => setCurrentScreen('screen-menu')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trans.backBtn}
                </button>
                <span className="screen-title">{trans.viewDebtsBtnTitle}</span>
                <div style={{ width: '80px', display: 'flex', gap: '8px' }}>
                    {/* Placeholder for export/import if needed */}
                </div>
            </div>

            <div className="search-box">
                <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input type="text" id="search-input" placeholder={trans.searchPlaceholder} value={search} onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="months-sidebar" id="months-sidebar" style={{ display: 'flex' }}>
                <div className="sidebar-tab" style={{ display: 'none' }}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
                    </svg>
                    <span>{language === 'uz' ? 'OY' : (language === 'ru' ? 'МЕСЯЦ' : 'MONTH')}</span>
                </div>
                <div className="month-list">
                    {['all', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].map((m, i) => (
                        <div 
                            key={m} 
                            className={`month-item ${currentMonthFilter === m ? 'active' : ''}`}
                            onClick={() => setCurrentMonthFilter(m)}
                        >
                            {i === 0 ? trans.monthAll : trans[`month${i}`]}
                        </div>
                    ))}
                </div>
            </div>

            {!loading && count > 0 && (
                <div className="view-summary show" id="view-summary">
                    {language === 'uz' ? 'Jami' : (language === 'ru' ? 'Всего' : 'Total')} {count} {trans.totalCountLabel} • {formatAmount(total, activeCurrency)}
                </div>
            )}

            <div className="titles-container" id="titles-list">
                {loading ? (
                    Array(4).fill().map((_, i) => (
                        <div key={i} className="skeleton-card skeleton">
                            <div className="skeleton-badge skeleton"></div>
                            <div className="skeleton-details">
                                <div className="skeleton-line long skeleton"></div>
                                <div className="skeleton-line short skeleton"></div>
                            </div>
                            <div className="skeleton-btn skeleton"></div>
                        </div>
                    ))
                ) : count === 0 ? (
                    <div className="empty-state">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                        </svg>
                        <p>{trans.emptyStateText}</p>
                    </div>
                ) : (
                    sortedDebts.map(debt => {
                        const dateParts = debt.date.split('-');
                        const year = dateParts[0] || '';
                        const month = dateParts[1] || '';
                        const day = dateParts[2] || '';
                        
                        const debtDate = new Date(debt.date);
                        const now = new Date();
                        const monthsDiff = (now.getFullYear() - debtDate.getFullYear()) * 12 + (now.getMonth() - debtDate.getMonth());
                        const isOverdue = monthsDiff > 1;

                        return (
                            <div key={debt.id} className="debt-card" onClick={() => setSelectedDebt(debt)}>
                                <div className="card-date-badge">
                                    <span>{day}/{month}</span>
                                </div>
                                <div className="card-details">
                                    <div className="card-top-info">
                                        <button className="card-name-btn" title="Tafsilotlar">{debt.name.toUpperCase()}</button>
                                        <span className="card-year-badge">{year}</span>
                                        {isOverdue && <span className="overdue-badge">{trans.overdueLabel}</span>}
                                        <button className="sum-btn-badge" title="Tafsilotlar">{formatAmount(debt.amount, activeCurrency)}</button>
                                    </div>
                                    {debt.note && <div className="card-note-full">{debt.note}</div>}
                                </div>
                                <button className="delete-btn" title={trans.clearNotifications} onClick={(e) => { e.stopPropagation(); handleDelete(debt.id); }}>
                                    <svg viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                                    </svg>
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Confirm Delete Overlay */}
            {confirmDeleteId !== null && (
                <div className="confirm-overlay show">
                    <div className="confirm-box">
                        <div className="confirm-title">{language === 'uz' ? "Qarzni o'chirish" : (language === 'ru' ? 'Удаление долга' : 'Delete Debt')}</div>
                        <div className="confirm-msg">
                            {language === 'uz' ? `Qarzni o'chirmoqchimisiz?` : (language === 'ru' ? `Вы действительно хотите удалить долг?` : `Are you sure you want to delete debt?`)}
                            <br/><small>{language === 'uz' ? "Bu amalni qaytarib bo'lmaydi." : (language === 'ru' ? 'Это действие нельзя отменить.' : 'This action cannot be undone.')}</small>
                        </div>
                        <div className="confirm-actions">
                            <button className="confirm-cancel" onClick={() => setConfirmDeleteId(null)}>{trans.backBtn}</button>
                            <button className="confirm-ok" onClick={confirmDelete}>{language === 'uz' ? "O'chirish" : (language === 'ru' ? 'Удалить' : 'Delete')}</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {selectedDebt && (
                <div className="modal-overlay show" id="debt-detail-modal" onClick={() => setSelectedDebt(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close-btn" id="close-detail-modal" onClick={() => setSelectedDebt(null)}>&times;</button>
                        <div className="modal-header">
                            <div className="modal-title-label">QARZ TAFSILOTLARI</div>
                        </div>
                        <div className="modal-body" id="modal-detail-body">
                            <div className="modal-info-group">
                                <div className="modal-info-label">{trans.modalName}</div>
                                <div className="modal-info-value name">{selectedDebt.name.toUpperCase()}</div>
                            </div>
                            <div className="modal-info-group">
                                <div className="modal-info-label">{trans.modalAmount}</div>
                                <div className="modal-info-value amount">{formatAmount(selectedDebt.amount, activeCurrency)}</div>
                            </div>
                            <div className="modal-info-group">
                                <div className="modal-info-label">{trans.modalDate}</div>
                                <div className="modal-info-value">
                                    {new Date(selectedDebt.date).toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'))}
                                </div>
                            </div>
                            {selectedDebt.note && (
                                <div className="modal-info-group">
                                    <div className="modal-info-label">{trans.modalNote}</div>
                                    <div className="modal-info-value note">{selectedDebt.note}</div>
                                </div>
                            )}
                            <div className="modal-info-group" style={{ marginTop: '10px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                                <div className="modal-info-label">{trans.modalMeta}</div>
                                <div className="modal-info-value meta">
                                    {new Date(selectedDebt.createdAt).toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
                                        day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })} ({selectedDebt.createdBy || 'System'})
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

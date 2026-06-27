document.addEventListener("DOMContentLoaded", () => {
    
    // --- STATE VA STORAGE ---
    let currentMonthFilter = 'all';
    let currentUser = null;
    let database = JSON.parse(localStorage.getItem('pro_debts')) || [];
    let activeCurrency = localStorage.getItem('currency') || 'UZS';
    let statsChart = null;

    // --- TRANSLATIONS DICTIONARY ---
    const translations = {
        uz: {
            welcomeLabel: "Xush kelibsiz",
            totalCountLabel: "qarz",
            totalDebtLabel: "Jami qarz",
            thisMonthLabel: "Shu oy",
            whatToDoLabel: "Nima qilmoqchisiz?",
            addDebtBtnTitle: "Qarz qo'shish",
            addDebtBtnDesc: "Yangi qarzdor yozish",
            viewDebtsBtnTitle: "Qarzlar ro'yxati",
            viewDebtsBtnDesc: "Kim qancha qarzdor",
            
            averageDebtLabel: "O'rtacha qarz",
            maxDebtLabel: "Eng katta qarz",
            chartTitle: "Qarzlar dinamikasi",
            recentActivityTitle: "So'nggi faollik",
            
            settingLanguage: "Til / Language",
            settingCurrency: "Valyuta / Currency",
            settingNotifications: "Bildirishnomalar",
            settingAutosave: "Avtomatik saqlash",
            clearDataBtn: "Barcha ma'lumotlarni o'chirish",
            copyrightLabel: "© 2026. Barcha huquqlar himoyalangan.",
            
            notifHeader: "Bildirishnomalar",
            clearNotifications: "Hammasini tozalash",
            
            newDebtTitle: "Yangi qarz",
            debtorNameLabel: "Qarzdor ismi",
            debtorNamePlaceholder: "Ismini kiriting...",
            debtorAmountLabel: "Summa",
            debtorDateLabel: "Sana",
            debtorNoteLabel: "Izoh (ixtiyoriy)",
            debtorNotePlaceholder: "Masalan: uy uchun, telefon uchun...",
            saveBtn: "Saqlash",
            backBtn: "Orqaga",
            searchPlaceholder: "Ism bo'yicha qidirish...",
            
            toastLoggedIn: "Xush kelibsiz, {name}! 👋",
            toastDebtAdded: "Qarz muvaffaqiyatli qo'shildi! ✅",
            toastDebtDeleted: "Qarz muvaffaqiyatli o'chirildi! ✅",
            toastClearDataConfirm: "Haqiqatan ham barcha ma'lumotlarni o'chirib tashlamoqchimisiz? Bu amalni qaytarib bo'lmaydi!",
            toastDataCleared: "Barcha ma'lumotlar o'chirildi!",
            toastLanguageChanged: "Mavzu tili o'zgartirildi",
            toastCurrencyChanged: "Valyuta formati o'zgartirildi",
            toastOffline: "Internet uzildi - Offline rejimda ishlamoqdasiz",
            toastOnline: "Internet ulandi",
            
            overdueLabel: "Kechikkan",
            emptyStateText: "Qarzlar topilmadi",
            
            monthAll: "Hammasi",
            month1: "Yanvar",
            month2: "Fevral",
            month3: "Mart",
            month4: "Aprel",
            month5: "May",
            month6: "Iyun",
            month7: "Iyul",
            month8: "Avgust",
            month9: "Sentabr",
            month10: "Oktabr",
            month11: "Noyabr",
            month12: "Dekabr"
        },
        ru: {
            welcomeLabel: "Добро пожаловать",
            totalCountLabel: "долг(ов)",
            totalDebtLabel: "Общий долг",
            thisMonthLabel: "В этом месяце",
            whatToDoLabel: "Что вы хотите сделать?",
            addDebtBtnTitle: "Добавить долг",
            addDebtBtnDesc: "Записать новый долг",
            viewDebtsBtnTitle: "Список долгов",
            viewDebtsBtnDesc: "Кто сколько должен",
            
            averageDebtLabel: "Средний долг",
            maxDebtLabel: "Наибольший долг",
            chartTitle: "Динамика долгов",
            recentActivityTitle: "Последние действия",
            
            settingLanguage: "Язык / Language",
            settingCurrency: "Валюта / Currency",
            settingNotifications: "Уведомления",
            settingAutosave: "Автосохранение",
            clearDataBtn: "Удалить все данные",
            copyrightLabel: "© 2026. Все права защищены.",
            
            notifHeader: "Уведомления",
            clearNotifications: "Очистить всё",
            
            newDebtTitle: "Новый долг",
            debtorNameLabel: "Имя должника",
            debtorNamePlaceholder: "Введите имя...",
            debtorAmountLabel: "Сумма",
            debtorDateLabel: "Дата",
            debtorNoteLabel: "Примечание (опционально)",
            debtorNotePlaceholder: "Например: для дома, за телефон...",
            saveBtn: "Сохранить",
            backBtn: "Назад",
            searchPlaceholder: "Поиск по имени...",
            
            toastLoggedIn: "Добро пожаловать, {name}! 👋",
            toastDebtAdded: "Долг успешно добавлен! ✅",
            toastDebtDeleted: "Долг успешно удален! ✅",
            toastClearDataConfirm: "Вы действительно хотите удалить все данные? Это действие нельзя отменить!",
            toastDataCleared: "Все данные были успешно удалены!",
            toastLanguageChanged: "Язык интерфейса изменен",
            toastCurrencyChanged: "Валютный формат изменен",
            toastOffline: "Интернет отключен - автономный режим",
            toastOnline: "Интернет подключен",
            
            overdueLabel: "Просрочен",
            emptyStateText: "Долги не найдены",
            
            monthAll: "Все",
            month1: "Январь",
            month2: "Февраль",
            month3: "Март",
            month4: "Апрель",
            month5: "Май",
            month6: "Июнь",
            month7: "Июль",
            month8: "Август",
            month9: "Сентябрь",
            month10: "Октябрь",
            month11: "Ноябрь",
            month12: "Декабрь"
        },
        en: {
            welcomeLabel: "Welcome",
            totalCountLabel: "debts",
            totalDebtLabel: "Total Debt",
            thisMonthLabel: "This Month",
            whatToDoLabel: "What would you like to do?",
            addDebtBtnTitle: "Add Debt",
            addDebtBtnDesc: "Register new debt",
            viewDebtsBtnTitle: "Debt List",
            viewDebtsBtnDesc: "Who owes how much",
            
            averageDebtLabel: "Average Debt",
            maxDebtLabel: "Maximum Debt",
            chartTitle: "Debt Trends",
            recentActivityTitle: "Recent Activity",
            
            settingLanguage: "Language / Til",
            settingCurrency: "Currency / Valyuta",
            settingNotifications: "Notifications",
            settingAutosave: "Autosave",
            clearDataBtn: "Clear all data",
            copyrightLabel: "© 2026. All rights reserved.",
            
            notifHeader: "Notifications",
            clearNotifications: "Clear All",
            
            newDebtTitle: "New Debt",
            debtorNameLabel: "Debtor Name",
            debtorNamePlaceholder: "Enter name...",
            debtorAmountLabel: "Amount",
            debtorDateLabel: "Date",
            debtorNoteLabel: "Note (optional)",
            debtorNotePlaceholder: "E.g., for house rent, phone bill...",
            saveBtn: "Save",
            backBtn: "Back",
            searchPlaceholder: "Search by name...",
            
            toastLoggedIn: "Welcome, {name}! 👋",
            toastDebtAdded: "Debt added successfully! ✅",
            toastDebtDeleted: "Debt deleted successfully! ✅",
            toastClearDataConfirm: "Are you sure you want to clear all data? This action cannot be undone!",
            toastDataCleared: "All data cleared successfully!",
            toastLanguageChanged: "App language changed",
            toastCurrencyChanged: "Currency format changed",
            toastOffline: "Connection lost - Working in offline mode",
            toastOnline: "Connection restored",
            
            overdueLabel: "Overdue",
            emptyStateText: "No debts found",
            
            monthAll: "All",
            month1: "January",
            month2: "February",
            month3: "March",
            month4: "April",
            month5: "May",
            month6: "June",
            month7: "July",
            month8: "August",
            month9: "September",
            month10: "October",
            month11: "November",
            month12: "December"
        }
    };

    // --- DOM ELEMENTLAR ---
    const phoneInput = document.getElementById('login-phone');
    const loginBtn = document.getElementById('btn-login');
    const loginNameInput = document.getElementById('login-name');
    const welcomeText = document.getElementById('welcome-text');
    const userAvatar = document.getElementById('user-avatar');
    const themeBtn = document.getElementById('theme-btn');
    const monthsSidebar = document.getElementById('months-sidebar');
    const titlesList = document.getElementById('titles-list');
    const searchInput = document.getElementById('search-input');
    const viewSummary = document.getElementById('view-summary');
    const totalCountPill = document.getElementById('total-count');
    const totalStat = document.getElementById('stat-total');
    const monthStat = document.getElementById('stat-month');
    const toast = document.getElementById('toast');
    const detailModal = document.getElementById('debt-detail-modal');
    const closeDetailModalBtn = document.getElementById('close-detail-modal');
    const modalDetailBody = document.getElementById('modal-detail-body');
    
    // --- CURRENCY CONVERTER HELPERS ---
    function getCurrencyRate(curr) {
        switch (curr) {
            case 'USD': return 1 / 12800;
            case 'EUR': return 1 / 13800;
            case 'RUB': return 1 / 140;
            case 'UZS':
            default: return 1;
        }
    }
    
    function getCurrencyLocale(curr) {
        switch (curr) {
            case 'USD': return 'en-US';
            case 'EUR': return 'de-DE';
            case 'RUB': return 'ru-RU';
            case 'UZS':
            default: return 'uz-UZ';
        }
    }
    
    function formatAmount(amount) {
        const rate = getCurrencyRate(activeCurrency);
        const converted = amount * rate;
        
        let decimals = activeCurrency === 'UZS' ? 0 : 2;
        let formatted = converted.toFixed(decimals);
        const parts = formatted.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
        formatted = parts.join('.');
        
        switch (activeCurrency) {
            case 'USD': return `$ ${formatted}`;
            case 'EUR': return `€ ${formatted}`;
            case 'RUB': return `₽ ${formatted}`;
            case 'UZS':
            default: return `${formatted} SUM`;
        }
    }

    // --- TRANSLATION FUNCTION ---
    function applyLanguage(lang) {
        const trans = translations[lang] || translations['uz'];
        
        // Welcome label
        const welcomeLabelNode = document.querySelector('.welcome-label');
        if (welcomeLabelNode) welcomeLabelNode.textContent = trans.welcomeLabel;
        
        // Stats Labels
        const redStatLabel = document.querySelector('.stat-card.stat-red .stat-label');
        if (redStatLabel) redStatLabel.textContent = trans.totalDebtLabel;
        
        const greenStatLabel = document.querySelector('.stat-card.stat-green .stat-label');
        if (greenStatLabel) greenStatLabel.textContent = trans.thisMonthLabel;
        
        // Section label
        const sectionLabelNode = document.querySelector('.menu-section-label');
        if (sectionLabelNode) sectionLabelNode.textContent = trans.whatToDoLabel;
        
        // Menu buttons
        const menuToAddTitle = document.querySelector('#menu-to-add h3');
        if (menuToAddTitle) menuToAddTitle.textContent = trans.addDebtBtnTitle;
        const menuToAddDesc = document.querySelector('#menu-to-add p');
        if (menuToAddDesc) menuToAddDesc.textContent = trans.addDebtBtnDesc;
        
        const menuToViewTitle = document.querySelector('#menu-to-view h3');
        if (menuToViewTitle) menuToViewTitle.textContent = trans.viewDebtsBtnTitle;
        const menuToViewDesc = document.querySelector('#menu-to-view p');
        if (menuToViewDesc) menuToViewDesc.textContent = trans.viewDebtsBtnDesc;
        
        // Add Screen title & labels
        const addScreenTitle = document.querySelector('#screen-add .screen-title');
        if (addScreenTitle) addScreenTitle.textContent = trans.newDebtTitle;
        
        const labelName = document.querySelector('label[for="debtor-name"]');
        if (labelName) labelName.lastChild.textContent = ' ' + trans.debtorNameLabel;
        
        const labelAmount = document.querySelector('label[for="debtor-amount"]');
        if (labelAmount) labelAmount.lastChild.textContent = ' ' + trans.debtorAmountLabel;
        
        const labelDate = document.querySelector('label[for="debtor-date"]');
        if (labelDate) labelDate.lastChild.textContent = ' ' + trans.debtorDateLabel;
        
        const labelNote = document.querySelector('label[for="debtor-note"]');
        if (labelNote) labelNote.lastChild.textContent = ' ' + trans.debtorNoteLabel;
        
        const btnAddDebt = document.getElementById('btn-add-debt');
        if (btnAddDebt) btnAddDebt.lastChild.textContent = ' ' + trans.saveBtn;
        
        // Back buttons
        document.querySelectorAll('.back-btn.to-menu').forEach(btn => {
            btn.lastChild.textContent = ' ' + trans.backBtn;
        });
        
        // Placeholders
        if (searchInput) searchInput.placeholder = trans.searchPlaceholder;
        
        const debtorNameInputNode = document.getElementById('debtor-name');
        if (debtorNameInputNode) debtorNameInputNode.placeholder = trans.debtorNamePlaceholder;
        
        const debtorNoteInputNode = document.getElementById('debtor-note');
        if (debtorNoteInputNode) debtorNoteInputNode.placeholder = trans.debtorNotePlaceholder;
        
        // Sidebar tab
        const sidebarTabSpan = document.querySelector('.sidebar-tab span');
        if (sidebarTabSpan) sidebarTabSpan.textContent = lang === 'uz' ? 'OY' : (lang === 'ru' ? 'МЕСЯЦ' : 'MONTH');
        
        // Month list
        const monthItems = document.querySelectorAll('.month-list .month-item');
        if (monthItems.length >= 13) {
            monthItems[0].textContent = trans.monthAll;
            monthItems[1].textContent = trans.month1;
            monthItems[2].textContent = trans.month2;
            monthItems[3].textContent = trans.month3;
            monthItems[4].textContent = trans.month4;
            monthItems[5].textContent = trans.month5;
            monthItems[6].textContent = trans.month6;
            monthItems[7].textContent = trans.month7;
            monthItems[8].textContent = trans.month8;
            monthItems[9].textContent = trans.month9;
            monthItems[10].textContent = trans.month10;
            monthItems[11].textContent = trans.month11;
            monthItems[12].textContent = trans.month12;
        }
        
        // Bottom Nav labels
        const navLabels = document.querySelectorAll('.bottom-nav .nav-label');
        if (navLabels.length >= 4) {
            navLabels[0].textContent = lang === 'uz' ? 'Bosh sahifa' : (lang === 'ru' ? 'Главная' : 'Home');
            navLabels[1].textContent = lang === 'uz' ? 'Qarzlar' : (lang === 'ru' ? 'Долги' : 'Debts');
            navLabels[2].textContent = lang === 'uz' ? 'Statistika' : (lang === 'ru' ? 'Статистика' : 'Stats');
            navLabels[3].textContent = lang === 'uz' ? 'Sozlamalar' : (lang === 'ru' ? 'Настройки' : 'Settings');
        }
        
        // Stats Labels
        const lblAvg = document.getElementById('lbl-average-debt');
        if (lblAvg) lblAvg.textContent = trans.averageDebtLabel;
        const lblMax = document.getElementById('lbl-max-debt');
        if (lblMax) lblMax.textContent = trans.maxDebtLabel;
        const lblChartTitle = document.getElementById('lbl-chart-title');
        if (lblChartTitle) lblChartTitle.textContent = trans.chartTitle;
        const lblRecentAct = document.getElementById('lbl-recent-activity');
        if (lblRecentAct) lblRecentAct.textContent = trans.recentActivityTitle;
        
        // Settings Labels
        const lblSetLang = document.getElementById('lbl-setting-language');
        if (lblSetLang) lblSetLang.textContent = trans.settingLanguage;
        const lblSetCurr = document.getElementById('lbl-setting-currency');
        if (lblSetCurr) lblSetCurr.textContent = trans.settingCurrency;
        const lblSetNotif = document.getElementById('lbl-setting-notifications');
        if (lblSetNotif) lblSetNotif.textContent = trans.settingNotifications;
        const lblSetAuto = document.getElementById('lbl-setting-autosave');
        if (lblSetAuto) lblSetAuto.textContent = trans.settingAutosave;
        const lblClearData = document.getElementById('lbl-clear-data');
        if (lblClearData) lblClearData.textContent = trans.clearDataBtn;
        const lblCopyright = document.getElementById('lbl-copyright');
        if (lblCopyright) lblCopyright.textContent = trans.copyrightLabel;
        const lblNotifHead = document.getElementById('lbl-notif-header');
        if (lblNotifHead) lblNotifHead.textContent = trans.notifHeader;
        const btnClearNotif = document.getElementById('clear-notifications');
        if (btnClearNotif) btnClearNotif.textContent = trans.clearNotifications;
    }

    // --- FUNKSIYALAR ---
    
    // Toast xabarnoma
    function showToast(message, type = 'info') {
        toast.textContent = message;
        toast.className = 'toast';
        toast.classList.add('show');
        
        // Toast gradients
        if (type === 'success') {
            toast.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        } else if (type === 'error') {
            toast.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        } else if (type === 'warning') {
            toast.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        } else {
            toast.style.background = 'linear-gradient(135deg, #4f46e5, #4338ca)';
        }
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
    
    // Statistikani yangilash
    function updateStats() {
        const total = database.reduce((sum, debt) => sum + debt.amount, 0);
        const currentMonth = new Date().getMonth() + 1;
        const monthStr = currentMonth.toString().padStart(2, '0');
        const monthDebts = database.filter(debt => {
            const debtMonth = debt.date.split('-')[1];
            return debtMonth === monthStr;
        });
        const monthTotal = monthDebts.reduce((sum, debt) => sum + debt.amount, 0);
        
        totalStat.textContent = formatAmount(total);
        monthStat.textContent = formatAmount(monthTotal);
        totalCountPill.textContent = database.length;
    }
    
    // Badge rangini hisoblash
    function getBadgeColor(name) {
        const colors = [
            'fee2e2', 'fef3c7', 'dcfce7', 'ccfbf1', 'e0f2fe',
            'e0e7ff', 'f3e8ff', 'fae8ff', 'ffe4e6', 'ffedd5',
            'e2e8f0', 'd1fae5', 'cffafe', 'ede9fe', 'fce7f3',
            'dbeafe', 'fed7aa', 'fce7f3', 'ccfbf1', 'd1fae5'
        ];
        
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        
        const index = Math.abs(hash) % colors.length;
        return colors[index];
    }
    
    // Ro'yxatni chizish
    function renderDebtsList(debts = database) {
        titlesList.innerHTML = '';
        const lang = localStorage.getItem('language') || 'uz';
        
        if (debts.length === 0) {
            titlesList.innerHTML = `
                <div class="empty-state">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
                    </svg>
                    <p>${translations[lang].emptyStateText}</p>
                </div>
            `;
            viewSummary.classList.remove('show');
            return;
        }
        
        const total = debts.reduce((sum, debt) => sum + debt.amount, 0);
        const count = debts.length;
        
        const countLabel = translations[lang].totalCountLabel;
        viewSummary.textContent = `${lang === 'uz' ? 'Jami' : (lang === 'ru' ? 'Всего' : 'Total')} ${count} ${countLabel} • ${formatAmount(total)}`;
        viewSummary.classList.add('show');
        
        const sortedDebts = [...debts].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        sortedDebts.forEach(debt => {
            const dateParts = debt.date.split('-');
            const year = dateParts[0] || '';
            const month = dateParts[1] || '';
            const day = dateParts[2] || '';
            
            const debtDate = new Date(debt.date);
            const now = new Date();
            const monthsDiff = (now.getFullYear() - debtDate.getFullYear()) * 12 + 
                               (now.getMonth() - debtDate.getMonth());
            const isOverdue = monthsDiff > 1;
            
            const card = document.createElement('div');
            card.className = 'debt-card';
            card.setAttribute('data-id', debt.id);
            card.innerHTML = `
                <div class="card-date-badge">
                    <span>${day}/${month}</span>
                </div>
                <div class="card-details">
                    <div class="card-top-info">
                        <button class="card-name-btn" title="Tafsilotlar">${debt.name.toUpperCase()}</button>
                        <span class="card-year-badge">${year}</span>
                        ${isOverdue ? `<span class="overdue-badge">${translations[lang].overdueLabel}</span>` : ''}
                        <button class="sum-btn-badge" title="Tafsilotlar">${formatAmount(debt.amount)}</button>
                    </div>
                    ${debt.note ? `<div class="card-note-full">${debt.note}</div>` : ''}
                </div>
                <button class="delete-btn" data-id="${debt.id}" title="${translations[lang].clearNotifications}">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"/>
                    </svg>
                </button>
            `;
            titlesList.appendChild(card);
        });
        
        // Kartaga bosganda modal oynasini ochish
        document.querySelectorAll('.debt-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.delete-btn')) return;
                
                const id = parseInt(card.getAttribute('data-id'));
                const debt = database.find(d => d.id === id);
                if (debt) {
                    showDebtDetailModal(debt);
                }
            });
        });
        
        // O'chirish tugmalari
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                showConfirmDialog(id);
            });
        });
    }
    
    // Tasdiqlash dialogi
    function showConfirmDialog(id) {
        const debt = database.find(d => d.id === id);
        if (!debt) return;
        
        const lang = localStorage.getItem('language') || 'uz';
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-box">
                <div class="confirm-title">${lang === 'uz' ? 'Qarzni o\'chirish' : (lang === 'ru' ? 'Удаление долга' : 'Delete Debt')}</div>
                <div class="confirm-msg">
                    ${lang === 'uz' ? `"${debt.name}" nomli ${formatAmount(debt.amount)} miqdordagi qarzni o'chirmoqchimisiz?` : 
                      (lang === 'ru' ? `Вы действительно хотите удалить долг "${debt.name}" на сумму ${formatAmount(debt.amount)}?` :
                       `Are you sure you want to delete "${debt.name}"'s debt of ${formatAmount(debt.amount)}?`)}
                    <br><small>${lang === 'uz' ? 'Bu amalni qaytarib bo\'lmaydi.' : (lang === 'ru' ? 'Это действие нельзя отменить.' : 'This action cannot be undone.')}</small>
                </div>
                <div class="confirm-actions">
                    <button class="confirm-cancel">${translations[lang].backBtn}</button>
                    <button class="confirm-ok">${lang === 'uz' ? 'O\'chirish' : (lang === 'ru' ? 'Удалить' : 'Delete')}</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        setTimeout(() => overlay.classList.add('show'), 10);
        
        overlay.querySelector('.confirm-cancel').addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.querySelector('.confirm-ok').addEventListener('click', () => {
            database = database.filter(debt => debt.id !== id);
            localStorage.setItem('pro_debts', JSON.stringify(database));
            updateStats();
            renderDebtsList(getFilteredDebts());
            showToast(translations[lang].toastDebtDeleted, "success");
            
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
    }
    
    // Tafsilotlar modal oynasini ko'rsatish
    function showDebtDetailModal(debt) {
        const lang = localStorage.getItem('language') || 'uz';
        const formattedDate = new Date(debt.date).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US'), {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        const createdDate = debt.createdAt ? new Date(debt.createdAt).toLocaleDateString(lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US'), {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }) : formattedDate;
        
        const langLabels = {
            uz: { name: "Qarzdor", amount: "Qarz summasi", date: "Sana", note: "Izoh", meta: "Yozilgan vaqti" },
            ru: { name: "Должник", amount: "Сумма долга", date: "Дата", note: "Примечание", meta: "Время записи" },
            en: { name: "Debtor", amount: "Debt Amount", date: "Date", note: "Note", meta: "Created At" }
        };
        
        const labels = langLabels[lang] || langLabels['uz'];
        
        modalDetailBody.innerHTML = `
            <div class="modal-info-group">
                <div class="modal-info-label">${labels.name}</div>
                <div class="modal-info-value name">${debt.name.toUpperCase()}</div>
            </div>
            
            <div class="modal-info-group">
                <div class="modal-info-label">${labels.amount}</div>
                <div class="modal-info-value amount">${formatAmount(debt.amount)}</div>
            </div>
            
            <div class="modal-info-group">
                <div class="modal-info-label">${labels.date}</div>
                <div class="modal-info-value">${formattedDate}</div>
            </div>
            
            ${debt.note ? `
            <div class="modal-info-group">
                <div class="modal-info-label">${labels.note}</div>
                <div class="modal-info-value note">${debt.note}</div>
            </div>
            ` : ''}
            
            <div class="modal-info-group" style="margin-top: 10px; border-top: 1px solid var(--border); padding-top: 12px;">
                <div class="modal-info-label">${labels.meta}</div>
                <div class="modal-info-value meta">${createdDate} (${debt.createdBy || 'System'})</div>
            </div>
        `;
        
        detailModal.classList.add('show');
    }

    // Modal yopish voqealari
    closeDetailModalBtn.addEventListener('click', () => {
        detailModal.classList.remove('show');
    });
    
    detailModal.addEventListener('click', (e) => {
        if (e.target === detailModal) {
            detailModal.classList.remove('show');
        }
    });
    
    // Filtrlangan qarzlarni olish
    function getFilteredDebts() {
        let filtered = database;
        
        // Oylar bo'yicha filtr
        if (currentMonthFilter !== 'all') {
            filtered = filtered.filter(debt => {
                const month = debt.date.split('-')[1];
                return month === currentMonthFilter;
            });
        }
        
        // Qidiruv bo'yicha filtr
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(debt => 
                debt.name.toLowerCase().includes(searchTerm) ||
                (debt.note && debt.note.toLowerCase().includes(searchTerm))
            );
        }
        
        return filtered;
    }

    // --- CHART IMPLEMENTATION ---
    function drawChart() {
        const chartCanvas = document.getElementById('debtChart');
        if (!chartCanvas) return;
        const ctx = chartCanvas.getContext('2d');
        
        if (statsChart) {
            statsChart.destroy();
        }
        
        const lang = localStorage.getItem('language') || 'uz';
        const months = [
            translations[lang].month1,
            translations[lang].month2,
            translations[lang].month3,
            translations[lang].month4,
            translations[lang].month5,
            translations[lang].month6,
            translations[lang].month7,
            translations[lang].month8,
            translations[lang].month9,
            translations[lang].month10,
            translations[lang].month11,
            translations[lang].month12
        ];
        
        const rate = getCurrencyRate(activeCurrency);
        const chartData = Array(12).fill(0);
        
        database.forEach(debt => {
            const month = parseInt(debt.date.split('-')[1]) - 1;
            if (!isNaN(month) && month >= 0 && month < 12) {
                chartData[month] += debt.amount * rate;
            }
        });
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        if (isDark) {
            gradient.addColorStop(0, 'rgba(129, 140, 248, 0.4)');
            gradient.addColorStop(1, 'rgba(129, 140, 248, 0.02)');
        } else {
            gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
            gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
        }
        
        statsChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: months,
                datasets: [{
                    label: lang === 'uz' ? 'Qarz miqdori' : (lang === 'ru' ? 'Сумма долга' : 'Debt amount'),
                    data: chartData,
                    borderColor: isDark ? '#818cf8' : '#6366f1',
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.35,
                    pointBackgroundColor: isDark ? '#818cf8' : '#6366f1',
                    pointBorderColor: isDark ? '#06060c' : '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        grid: {
                            color: isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            font: {
                                family: 'Inter',
                                size: 10
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            color: isDark ? '#94a3b8' : '#64748b',
                            font: {
                                family: 'Inter',
                                size: 9
                            }
                        }
                    }
                }
            }
        });
    }

    // --- STATISTICS & ACTIVITY UPDATER ---
    function updateStatsAndActivity() {
        const total = database.reduce((sum, debt) => sum + debt.amount, 0);
        const average = database.length > 0 ? (total / database.length) : 0;
        const max = database.length > 0 ? Math.max(...database.map(d => d.amount)) : 0;
        
        document.getElementById('stat-average').textContent = formatAmount(average);
        document.getElementById('stat-max').textContent = formatAmount(max);
        
        const activityList = document.getElementById('activity-list');
        if (!activityList) return;
        activityList.innerHTML = '';
        
        const lang = localStorage.getItem('language') || 'uz';
        
        if (database.length === 0) {
            activityList.innerHTML = `<div style="text-align:center; font-size:12px; color:var(--text-muted); padding:15px;">${lang === 'uz' ? 'Harakatlar yo\'q' : (lang === 'ru' ? 'Нет действий' : 'No activities')}</div>`;
            return;
        }
        
        const sortedForActivity = [...database]
            .filter(d => d.createdAt)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);
            
        sortedForActivity.forEach(debt => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            
            const dateObj = new Date(debt.createdAt);
            const formattedTime = dateObj.toLocaleDateString(lang === 'uz' ? 'uz-UZ' : (lang === 'ru' ? 'ru-RU' : 'en-US'), {
                day: '2-digit',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            let actText = '';
            if (lang === 'uz') {
                actText = `<b>${debt.name}</b> uchun <b>${formatAmount(debt.amount)}</b> qarz yozildi.`;
            } else if (lang === 'ru') {
                actText = `Записан долг <b>${formatAmount(debt.amount)}</b> для <b>${debt.name}</b>.`;
            } else {
                actText = `Recorded <b>${formatAmount(debt.amount)}</b> debt for <b>${debt.name}</b>.`;
            }
            
            item.innerHTML = `
                <div class="activity-line"></div>
                <div class="activity-dot dot-add"></div>
                <div class="activity-info">
                    <div class="activity-text">${actText}</div>
                    <div class="activity-time">${formattedTime}</div>
                </div>
            `;
            activityList.appendChild(item);
        });
    }

    // Export ma'lumotlarni JSON faylga
    function exportData() {
        const dataStr = JSON.stringify(database, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `qarzlar_${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        const lang = localStorage.getItem('language') || 'uz';
        showToast(lang === 'uz' ? "Ma'lumotlar yuklab olindi!" : (lang === 'ru' ? "Данные скачаны!" : "Data downloaded!"), "success");
    }
    
    // Import ma'lumotlarni JSON fayldan
    function importData(file) {
        const reader = new FileReader();
        const lang = localStorage.getItem('language') || 'uz';
        
        reader.onload = function(e) {
            try {
                const importedData = JSON.parse(e.target.result);
                
                const overlay = document.createElement('div');
                overlay.className = 'confirm-overlay';
                overlay.innerHTML = `
                    <div class="confirm-box">
                        <div class="confirm-title">${lang === 'uz' ? 'Ma\'lumotlarni yuklash' : (lang === 'ru' ? 'Импорт данных' : 'Import Data')}</div>
                        <div class="confirm-msg">
                            ${lang === 'uz' ? `${importedData.length} ta qarz yuklanmoqda. Hozirgi ma'lumotlar bilan birlashtirilsinmi yoki almashtirilsinmi?` :
                              (lang === 'ru' ? `Загружается ${importedData.length} записей. Объединить со старыми или заменить их полностью?` :
                               `Loading ${importedData.length} records. Do you want to merge with existing data or replace it completely?`)}
                        </div>
                        <div class="confirm-actions">
                            <button class="confirm-cancel">${translations[lang].backBtn}</button>
                            <button id="merge-btn" style="flex:1; padding:12px; background:var(--primary); color:white; border:none; border-radius:var(--radius-md); font-weight:700; cursor:pointer;">${lang === 'uz' ? 'Birlashtirish' : (lang === 'ru' ? 'Объединить' : 'Merge')}</button>
                            <button id="replace-btn" style="flex:1; padding:12px; background:var(--red); color:white; border:none; border-radius:var(--radius-md); font-weight:700; cursor:pointer;">${lang === 'uz' ? 'Almashtirish' : (lang === 'ru' ? 'Заменить' : 'Replace')}</button>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(overlay);
                setTimeout(() => overlay.classList.add('show'), 10);
                
                overlay.querySelector('.confirm-cancel').addEventListener('click', () => {
                    overlay.classList.remove('show');
                    setTimeout(() => overlay.remove(), 300);
                });
                
                overlay.querySelector('#merge-btn').addEventListener('click', () => {
                    const maxId = database.length > 0 ? Math.max(...database.map(d => d.id)) : 0;
                    importedData.forEach((item, index) => {
                        item.id = maxId + index + 1;
                        if (!item.createdAt) item.createdAt = new Date().toISOString();
                    });
                    
                    database = [...database, ...importedData];
                    localStorage.setItem('pro_debts', JSON.stringify(database));
                    updateStats();
                    renderDebtsList(getFilteredDebts());
                    showToast(lang === 'uz' ? `${importedData.length} ta qarz qo'shildi!` : (lang === 'ru' ? `Добавлено ${importedData.length} записей!` : `Added ${importedData.length} records!`), "success");
                    
                    overlay.classList.remove('show');
                    setTimeout(() => overlay.remove(), 300);
                });
                
                overlay.querySelector('#replace-btn').addEventListener('click', () => {
                    database = importedData;
                    database.forEach(item => {
                        if (!item.createdAt) item.createdAt = new Date().toISOString();
                    });
                    localStorage.setItem('pro_debts', JSON.stringify(database));
                    updateStats();
                    renderDebtsList(getFilteredDebts());
                    showToast(lang === 'uz' ? "Barcha ma'lumotlar yangilandi!" : (lang === 'ru' ? "Все данные заменены!" : "All data updated!"), "success");
                    
                    overlay.classList.remove('show');
                    setTimeout(() => overlay.remove(), 300);
                });
                
            } catch (error) {
                showToast(lang === 'uz' ? "Fayl formatida xatolik!" : (lang === 'ru' ? "Ошибка в формате файла!" : "Invalid file format!"), "error");
            }
        };
        
        reader.readAsText(file);
    }
    
    // --- EVENT LISTENERS ---
    
    // Telefon maskasi
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        
        if (!value.startsWith('998')) {
            value = '998' + value;
        }
        
        value = value.substring(0, 12);
        
        let formatted = '+998 ';
        if (value.length > 3) {
            formatted += '(' + value.substring(3, 5);
        }
        if (value.length > 5) {
            formatted += ') ' + value.substring(5, 8);
        }
        if (value.length > 8) {
            formatted += '-' + value.substring(8, 10);
        }
        if (value.length > 10) {
            formatted += '-' + value.substring(10, 12);
        }
        
        e.target.value = formatted;
    });
    
    // Kirish
    loginBtn.addEventListener('click', () => {
        const name = loginNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const lang = localStorage.getItem('language') || 'uz';
        
        if (!name) {
            const errName = lang === 'uz' ? "Iltimos, ismingizni kiriting!" : (lang === 'ru' ? "Пожалуйста, введите имя!" : "Please enter your name!");
            showToast(errName, "error");
            loginNameInput.focus();
            return;
        }
        
        if (phone.replace(/\D/g, '').length < 12) {
            const errPhone = lang === 'uz' ? "Telefon raqami noto'g'ri!" : (lang === 'ru' ? "Неверный номер телефона!" : "Invalid phone number!");
            showToast(errPhone, "error");
            phoneInput.focus();
            return;
        }
        
        currentUser = { 
            name, 
            phone,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        welcomeText.textContent = name;
        userAvatar.textContent = name.substring(0, 2).toUpperCase();
        
        updateStats();
        switchScreen('screen-menu');
        
        const welcomeToast = translations[lang].toastLoggedIn.replace('{name}', name);
        showToast(welcomeToast, "success");
    });
    
    // Qarz qo'shish
    document.getElementById('btn-add-debt').addEventListener('click', () => {
        const name = document.getElementById('debtor-name').value.trim();
        const amount = parseFloat(document.getElementById('debtor-amount').value);
        const date = document.getElementById('debtor-date').value;
        const note = document.getElementById('debtor-note').value.trim();
        const lang = localStorage.getItem('language') || 'uz';
        
        if (!name) {
            const errDebtorName = lang === 'uz' ? "Qarzdor ismini kiriting!" : (lang === 'ru' ? "Введите имя должника!" : "Enter debtor name!");
            showToast(errDebtorName, "error");
            document.getElementById('debtor-name').focus();
            return;
        }
        
        if (!amount || amount <= 0 || isNaN(amount)) {
            const errDebtorAmt = lang === 'uz' ? "To'g'ri summa kiriting!" : (lang === 'ru' ? "Введите корректную сумму!" : "Enter correct amount!");
            showToast(errDebtorAmt, "error");
            document.getElementById('debtor-amount').focus();
            return;
        }
        
        if (!date) {
            const errDebtorDate = lang === 'uz' ? "Sanani tanlang!" : (lang === 'ru' ? "Выберите дату!" : "Select date!");
            showToast(errDebtorDate, "error");
            document.getElementById('debtor-date').focus();
            return;
        }
        
        const newDebt = {
            id: Date.now(),
            name: name,
            amount: amount,
            date: date,
            note: note || '',
            createdAt: new Date().toISOString(),
            createdBy: currentUser ? currentUser.name : 'Noma\'lum'
        };
        
        database.push(newDebt);
        localStorage.setItem('pro_debts', JSON.stringify(database));
        
        // Formani tozalash
        document.getElementById('debtor-name').value = '';
        document.getElementById('debtor-amount').value = '';
        document.getElementById('debtor-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('debtor-note').value = '';
        
        updateStats();
        switchScreen('screen-menu');
        showToast(translations[lang].toastDebtAdded, "success");
    });
    
    // Qidiruv
    searchInput.addEventListener('input', () => {
        renderDebtsList(getFilteredDebts());
    });
    
    // Oylar filtr
    document.querySelectorAll('.month-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.month-item').forEach(el => 
                el.classList.remove('active'));
            e.target.classList.add('active');
            currentMonthFilter = e.target.getAttribute('data-month');
            renderDebtsList(getFilteredDebts());
        });
    });
    
    // Tema o'zgartirish
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        
        if (newTheme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
        
        localStorage.setItem('theme', newTheme);
        
        const lang = localStorage.getItem('language') || 'uz';
        const themeText = newTheme === 'dark' ? 
            (lang === 'uz' ? '🌙 qorongʻi rejim' : (lang === 'ru' ? '🌙 темная тема' : '🌙 dark mode')) :
            (lang === 'uz' ? '☀️ yorugʻ rejim' : (lang === 'ru' ? '☀️ светлая тема' : '☀️ light mode'));
            
        showToast((lang === 'uz' ? `Tema ${themeText}ga o'zgartirildi` : 
                  (lang === 'ru' ? `Тема изменена на ${themeText}` : `Theme changed to ${themeText}`)));
        
        // Redraw chart if active to update colors
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id === 'screen-stats') {
            drawChart();
        }
    });
    
    // Screen navigatsiya
    function switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.classList.remove('slide-in');
        });
        
        const targetScreen = document.getElementById(screenId);
        targetScreen.classList.add('active');
        targetScreen.classList.add('slide-in');
        
        const bottomNav = document.getElementById('bottom-nav');
        if (screenId === 'screen-login') {
            bottomNav.style.display = 'none';
        } else {
            bottomNav.style.display = 'flex';
        }
        
        // Highlight bottom navigation active tab
        document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        if (screenId === 'screen-view') {
            monthsSidebar.style.display = 'flex';
            renderDebtsList(getFilteredDebts());
        } else {
            monthsSidebar.style.display = 'none';
        }
        
        if (screenId === 'screen-stats') {
            drawChart();
            updateStatsAndActivity();
        } else if (screenId === 'screen-menu') {
            updateStats();
        }
    }
    
    // Bottom navigation click handler
    document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const screenId = e.currentTarget.getAttribute('data-screen');
            switchScreen(screenId);
        });
    });
    
    // Navigatsiya tugmalari
    document.getElementById('menu-to-add').addEventListener('click', () => 
        switchScreen('screen-add'));
    document.getElementById('menu-to-view').addEventListener('click', () => 
        switchScreen('screen-view'));
    
    document.querySelectorAll('.back-btn.to-menu').forEach(btn => {
        btn.addEventListener('click', () => switchScreen('screen-menu'));
    });

    // --- SETTINGS INTERACTION LOGIC ---
    document.getElementById('language-select').addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('language', lang);
        applyLanguage(lang);
        showToast(translations[lang].toastLanguageChanged, "success");
        
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id === 'screen-stats') {
            drawChart();
            updateStatsAndActivity();
        }
    });

    document.getElementById('currency-select').addEventListener('change', (e) => {
        const curr = e.target.value;
        localStorage.setItem('currency', curr);
        activeCurrency = curr;
        updateStats();
        
        const lang = localStorage.getItem('language') || 'uz';
        showToast(translations[lang].toastCurrencyChanged, "success");
        
        const activeScreen = document.querySelector('.screen.active');
        if (activeScreen && activeScreen.id === 'screen-stats') {
            drawChart();
            updateStatsAndActivity();
        }
    });

    document.getElementById('notifications-toggle').addEventListener('change', (e) => {
        localStorage.setItem('notifications_enabled', e.target.checked);
    });

    document.getElementById('autosave-toggle').addEventListener('change', (e) => {
        localStorage.setItem('autosave_enabled', e.target.checked);
    });

    document.getElementById('clear-data-btn').addEventListener('click', () => {
        const lang = localStorage.getItem('language') || 'uz';
        showClearConfirmDialog(lang);
    });

    function showClearConfirmDialog(lang) {
        const overlay = document.createElement('div');
        overlay.className = 'confirm-overlay';
        overlay.innerHTML = `
            <div class="confirm-box">
                <div class="confirm-title">${lang === 'uz' ? 'Ma\'lumotlarni tozalash' : (lang === 'ru' ? 'Очистка данных' : 'Clear Data')}</div>
                <div class="confirm-msg">
                    ${translations[lang].toastClearDataConfirm}
                </div>
                <div class="confirm-actions">
                    <button class="confirm-cancel">${translations[lang].backBtn}</button>
                    <button class="confirm-ok" style="background-color: var(--red);">${lang === 'uz' ? 'O\'chirish' : (lang === 'ru' ? 'Удалить' : 'Delete')}</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
        setTimeout(() => overlay.classList.add('show'), 10);
        
        overlay.querySelector('.confirm-cancel').addEventListener('click', () => {
            overlay.classList.remove('show');
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.querySelector('.confirm-ok').addEventListener('click', () => {
            database = [];
            localStorage.removeItem('pro_debts');
            updateStats();
            renderDebtsList(getFilteredDebts());
            showToast(translations[lang].toastDataCleared, "success");
            
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
                switchScreen('screen-menu');
            }, 300);
        });
    }
    
    // Export/Import tugmalari qo'shish
    function addExportImportButtons() {
        const viewTopbar = document.querySelector('#screen-view .screen-topbar');
        if (!viewTopbar) return;
        
        const actionsDiv = viewTopbar.querySelector('div');
        actionsDiv.innerHTML = `
            <div style="display: flex; gap: 8px;">
                <button id="export-btn" title="Yuklab olish" style="
                    background: var(--bg-input);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-sm);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--text-main);
                ">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                </button>
                <button id="import-btn" title="Yuklash" style="
                    background: var(--bg-input);
                    border: 1px solid var(--border);
                    border-radius: var(--radius-sm);
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--text-main);
                ">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                </button>
                <input type="file" id="import-file" accept=".json" style="display: none;">
            </div>
        `;
        
        document.getElementById('export-btn').addEventListener('click', exportData);
        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        
        document.getElementById('import-file').addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                importData(e.target.files[0]);
                e.target.value = ''; // Reset input
            }
        });
    }
    
    // --- INITIALIZATION ---
    
    // Tema ni yuklash
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'dark') {
        document.getElementById('sun-icon').style.display = 'none';
        document.getElementById('moon-icon').style.display = 'block';
    }
    
    // Settings select values load
    const savedLang = localStorage.getItem('language') || 'uz';
    document.getElementById('language-select').value = savedLang;
    applyLanguage(savedLang);
    
    document.getElementById('currency-select').value = activeCurrency;
    
    const savedNotifs = localStorage.getItem('notifications_enabled') !== 'false';
    document.getElementById('notifications-toggle').checked = savedNotifs;
    
    const savedAutosave = localStorage.getItem('autosave_enabled') !== 'false';
    document.getElementById('autosave-toggle').checked = savedAutosave;

    // Foydalanuvchi ma'lumotlarini yuklash
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            welcomeText.textContent = currentUser.name;
            userAvatar.textContent = currentUser.name.substring(0, 2).toUpperCase();
            switchScreen('screen-menu');
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
    
    // Dastlabki statistikani ko'rsatish
    updateStats();
    
    // Export/Import tugmalarini qo'shish
    setTimeout(addExportImportButtons, 100);
    
    // Avtomatik saqlash
    window.addEventListener('beforeunload', () => {
        const isAutosave = localStorage.getItem('autosave_enabled') !== 'false';
        if (isAutosave) {
            localStorage.setItem('pro_debts', JSON.stringify(database));
        }
    });
    
    // Offline mode uchun
    window.addEventListener('online', () => {
        const lang = localStorage.getItem('language') || 'uz';
        showToast(translations[lang].toastOnline, "success");
    });
    
    window.addEventListener('offline', () => {
        const lang = localStorage.getItem('language') || 'uz';
        showToast(translations[lang].toastOffline, "warning");
    });
    
    // PWA uchun
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
});
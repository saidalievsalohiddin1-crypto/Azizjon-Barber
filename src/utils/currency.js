export function getCurrencyRate(curr) {
    switch (curr) {
        case 'USD': return 1 / 12800;
        case 'EUR': return 1 / 13800;
        case 'RUB': return 1 / 140;
        case 'UZS':
        default: return 1;
    }
}

export function formatAmount(amount, activeCurrency) {
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

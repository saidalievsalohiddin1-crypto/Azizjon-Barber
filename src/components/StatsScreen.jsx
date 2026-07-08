import React, { useMemo } from 'react';
import { useAppContext } from '../store/AppContext';
import { translations } from '../utils/translations';
import { formatAmount, getCurrencyRate } from '../utils/currency';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function StatsScreen() {
    const { currentScreen, setCurrentScreen, database, language, activeCurrency, theme } = useAppContext();

    if (currentScreen !== 'screen-stats') return null;

    const trans = translations[language] || translations['uz'];

    const total = database.reduce((sum, debt) => sum + debt.amount, 0);
    const average = database.length > 0 ? (total / database.length) : 0;
    const max = database.length > 0 ? Math.max(...database.map(d => d.amount)) : 0;

    const sortedForActivity = [...database]
        .filter(d => d.createdAt)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

    const months = [
        trans.month1, trans.month2, trans.month3, trans.month4,
        trans.month5, trans.month6, trans.month7, trans.month8,
        trans.month9, trans.month10, trans.month11, trans.month12
    ];

    const chartDataValues = Array(12).fill(0);
    const rate = getCurrencyRate(activeCurrency);
    
    database.forEach(debt => {
        const month = parseInt(debt.date.split('-')[1]) - 1;
        if (!isNaN(month) && month >= 0 && month < 12) {
            chartDataValues[month] += debt.amount * rate;
        }
    });

    const isDark = theme === 'dark';

    const data = {
        labels: months,
        datasets: [
            {
                label: language === 'uz' ? 'Qarz miqdori' : (language === 'ru' ? 'Сумма долга' : 'Debt amount'),
                data: chartDataValues,
                borderColor: isDark ? '#818cf8' : '#6366f1',
                borderWidth: 3,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 180);
                    if (isDark) {
                        gradient.addColorStop(0, 'rgba(129, 140, 248, 0.4)');
                        gradient.addColorStop(1, 'rgba(129, 140, 248, 0.02)');
                    } else {
                        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
                        gradient.addColorStop(1, 'rgba(99, 102, 241, 0.02)');
                    }
                    return gradient;
                },
                fill: true,
                tension: 0.35,
                pointBackgroundColor: isDark ? '#818cf8' : '#6366f1',
                pointBorderColor: isDark ? '#06060c' : '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }
        ]
    };

    const options = {
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
    };

    return (
        <div className="screen active slide-in" id="screen-stats">
            <div className="screen-topbar">
                <button className="back-btn to-menu" onClick={() => setCurrentScreen('screen-menu')}>
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {trans.backBtn}
                </button>
                <span className="screen-title">{trans.stats}</span>
                <div style={{ width: '80px' }}></div>
            </div>

            <div className="stats-container">
                <div className="stats-grid">
                    <div className="stat-card stat-purple">
                        <div className="stat-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="1" x2="12" y2="23" />
                                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                        </div>
                        <div className="stat-card-info">
                            <div className="stat-label" id="lbl-average-debt">{trans.averageDebtLabel}</div>
                            <div className="stat-value" id="stat-average">{formatAmount(average, activeCurrency)}</div>
                        </div>
                    </div>

                    <div className="stat-card stat-blue">
                        <div className="stat-icon-wrap">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <div className="stat-card-info">
                            <div className="stat-label" id="lbl-max-debt">{trans.maxDebtLabel}</div>
                            <div className="stat-value" id="stat-max">{formatAmount(max, activeCurrency)}</div>
                        </div>
                    </div>
                </div>

                <div className="chart-section">
                    <h3 id="lbl-chart-title">{trans.chartTitle}</h3>
                    <div className="chart-container" style={{ position: 'relative', height: '200px', width: '100%' }}>
                        <Line data={data} options={options} />
                    </div>
                </div>

                <div className="recent-activity">
                    <h3 id="lbl-recent-activity">{trans.recentActivityTitle}</h3>
                    <div id="activity-list" className="activity-list">
                        {sortedForActivity.length === 0 ? (
                            <div style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', padding: '15px' }}>
                                {language === 'uz' ? "Harakatlar yo'q" : (language === 'ru' ? 'Нет действий' : 'No activities')}
                            </div>
                        ) : (
                            sortedForActivity.map(debt => {
                                const dateObj = new Date(debt.createdAt);
                                const formattedTime = dateObj.toLocaleDateString(language === 'uz' ? 'uz-UZ' : (language === 'ru' ? 'ru-RU' : 'en-US'), {
                                    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
                                });
                                
                                let actText;
                                if (language === 'uz') {
                                    actText = <><b>{debt.name}</b> uchun <b>{formatAmount(debt.amount, activeCurrency)}</b> qarz yozildi.</>;
                                } else if (language === 'ru') {
                                    actText = <>Записан долг <b>{formatAmount(debt.amount, activeCurrency)}</b> для <b>{debt.name}</b>.</>;
                                } else {
                                    actText = <>Recorded <b>{formatAmount(debt.amount, activeCurrency)}</b> debt for <b>{debt.name}</b>.</>;
                                }

                                return (
                                    <div key={debt.id} className="activity-item">
                                        <div className="activity-line"></div>
                                        <div className="activity-dot dot-add"></div>
                                        <div className="activity-info">
                                            <div className="activity-text">{actText}</div>
                                            <div className="activity-time">{formattedTime}</div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

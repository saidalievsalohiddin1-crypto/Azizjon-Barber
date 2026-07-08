import React, { useEffect, useState } from 'react';
import { useAppContext } from '../store/AppContext';

export default function DynamicIsland() {
    const { toastMessage } = useAppContext();
    const [expanded, setExpanded] = useState(false);
    const [currentToast, setCurrentToast] = useState(null);

    useEffect(() => {
        if (toastMessage) {
            setCurrentToast(toastMessage);
            setExpanded(false);
            
            // Force reflow for animation restart
            setTimeout(() => {
                setExpanded(true);
            }, 50);

            const timer = setTimeout(() => {
                setExpanded(false);
            }, 3500);

            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    const getIcon = (type) => {
        switch(type) {
            case 'success': return '✓';
            case 'error': return '✕';
            case 'warning': return '!';
            default: return 'i';
        }
    };

    return (
        <div className="dynamic-island-container">
            <div className={`dynamic-island ${expanded ? 'expanded' : ''}`} id="dynamic-island">
                <div className="di-content" id="di-content">
                    <div className={`di-icon ${currentToast?.type || 'info'}`} id="di-icon">
                        {getIcon(currentToast?.type)}
                    </div>
                    <div className="di-text" id="di-text">
                        {currentToast?.message || ''}
                    </div>
                </div>
            </div>
        </div>
    );
}

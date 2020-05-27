import React from 'react';
import './TabPanelHeader.css';

type TabRecord = {
    id: number,
    title: string
}

type TabPanelHeaderProps = {
    tabs: TabRecord[],
    activeTab: number,
    setSelectedTab: (id: number) => void,
    onAddTab: (event: React.MouseEvent<HTMLButtonElement>) => void,
    onCloseTab: (index: number) => void,
}

const TabPanelHeader: React.FC<TabPanelHeaderProps> = ({ tabs, activeTab, onAddTab, onCloseTab, setSelectedTab }) => {
    return (
        <div className='tab-panel-header'>
            <button onClick={onAddTab}>Add deal</button>
            {tabs.map((tab) => (
                <div key={`tab-${tab.id}`} className={tab.id === activeTab ? 'active' : undefined} onClick={() => setSelectedTab(tab.id)}>
                    <span>{tab.title || `Deal ${tab.id}`}</span>
                    <button className='tab-panel-header-close-icon' onClick={() => onCloseTab(tab.id)}>X</button>
                </div>
            ))}
        </div>
    );
}

export default TabPanelHeader;

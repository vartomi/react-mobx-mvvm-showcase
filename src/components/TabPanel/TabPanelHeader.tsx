import React from 'react';
import './TabPanelHeader.css';

export type TabRecord = {
    id: string,
    title: string
}


type ButtonRecord = {
    title: string,
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

type TabPanelHeaderProps = {
    tabs: TabRecord[],
    activeTab: string,
    setSelectedTab: (id: string) => void,
    buttons: ButtonRecord[],
    onCloseTab: (id: string) => void
}

const TabPanelHeader: React.FC<TabPanelHeaderProps> = ({ tabs, activeTab, buttons, onCloseTab, setSelectedTab }) => {
    return (
        <div className='tab-panel-header'>
            {buttons.map((button: ButtonRecord, idx) => <button key={`button-${idx}`} onClick={button.callback}>{button.title}</button>)} 
            {tabs.map((tab) => (
                <div key={`tab-${tab.id}`} className={tab.id === activeTab ? 'active' : undefined} onClick={() => setSelectedTab(tab.id)}>
                    <span>{tab.title}</span>
                    <button className='tab-panel-header-close-icon' onClick={() => onCloseTab(tab.id)}>X</button>
                </div>
            ))}
        </div>
    );
}

export default TabPanelHeader;

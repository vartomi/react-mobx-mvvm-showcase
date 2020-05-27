import React from 'react';

import './TabPanel.css';
import TabPanelBody from './TabPanelBody';
import TabPanelHeader from './TabPanelHeader';

interface iTabPanel extends React.FC {
    Header: typeof TabPanelHeader
    Body: typeof TabPanelBody
}

export const TabPanel: iTabPanel = (props) => {
    return (
        <div className='tab-panel-container'>
            {props.children}
        </div>
    );
}

TabPanel.Header = TabPanelHeader;
TabPanel.Body = TabPanelBody;


import React from 'react';
import './TabPanelBody.css';

const TabPanelBody: React.FC = (props) => {
    return (
        <div className='tab-panel-body'>
            {props.children}
        </div>
    );
}

export default TabPanelBody;

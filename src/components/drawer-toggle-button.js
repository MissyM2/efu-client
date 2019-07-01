import React from 'react';

import './css/drawer-toggle-button.css';

const DrawerToggleButton = props => (
    <button className="toggle-button" onClick={props.rightdrawertoggleclickhandler}>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/>
        <div className="toggle-button_line"/> 
    </button>


);

export default DrawerToggleButton;
import React from 'react';

import './css/backdrop.css';

export default class Backdrop extends React.Component{
    
    render() {
        return(
            <div className="backdrop" onClick={this.props.rightbackdropclickhandler} />
        );
    }
}

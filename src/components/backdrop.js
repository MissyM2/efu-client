import React from 'react';

import './css/backdrop.css';

export default class Backdrop extends React.Component{
    
    render() {
        console.log('backdrop: this.props', this.props);
        return(
            <div className="backdrop" onClick={this.props.rightbackdropclickhandler} />
        );
    }
}

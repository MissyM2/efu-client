import React from 'react';
import './css/dashboard.css';

export default class AvailableWeek extends React.Component {
    
    setSelectedWeek(e) {
        e.preventDefault();
        const selweek = e.currentTarget.getAttribute("data-identifier");
        this.props.getcurrentweek(selweek);
    }
    render() {

        let weekClasses = 'available-weeks';
        if (this.props.currentweek == this.props.weekNum) {
            weekClasses='available-weeks selected';
        }
        
        return (            
            <div 
                className={weekClasses}
                data-identifier={this.props.weekNum}
                onClick={(e) =>{
                this.setSelectedWeek(e)
            }}>
                Week {this.props.weekNum}
            </div>
        );

    }
    
}

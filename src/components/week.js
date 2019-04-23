import React from 'react';
import AddweekForm from './addweek-form';
import {addWeek} from '../actions/protected-data';
import {connect} from 'react-redux';

import './css/week.css';


export class Week extends React.Component {
    addWeek(weekNum, weekStartDate, weekEndDate) {
        this.props.dispatch(addWeek((weekNum, weekStartDate, weekEndDate), this.props.index));
    }
    
    render() {
        const weekslist = this.props.weekslist.map((weeklist, index) => 
            <li className="week-wrapper" key={index}>
                    <Week {...weeklist} />
            </li>
        );

        return (
            <div>
                <h2>weeks-form</h2>
                <h2>{this.props.title}</h2>
                <ul className="weekslist">
                    {weekslist}
                    <li className="add-week-wrapper">
                        <AddweekForm
                            type="week"
                            onAdd={(weekNum, weekStartDate, weekEndDate) => 
                                this.addWeek(weekNum, weekStartDate, weekEndDate)} />
                    </li>
                </ul>
            </div>
        );
    }
}

Week.defaultProps = {
    title: ''
};

export default connect()(Week);
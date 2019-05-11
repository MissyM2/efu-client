import React from 'react';

import {required, nonEmpty, isTrimmed} from '../validators';

import './css/review-current-week.css';

export class UpdateWeekForm extends React.Component {
    submitFetch(e) {
        e.preventDefault();
        const updatedWeek = {
            termDesc: 'Spring, 2019',
            weekNum: 2,
            likedLeast: this.likedLeastInput.value.trim(),
            likedMost: this.likedMostInput.value.trim(),
            mostDifficult: this.mostDifficultInput.value.trim(),
            leastDifficult: this.leastDifficultInput.value.trim()
        }

        console.log('updated week is ', updatedWeek)
        if (updatedWeek && this.props.onUpdate) {
            this.props.onUpdate(updatedWeek);
        }
        const test = this.props.courseDropDown;
        console.log(test);
        alert('made it to submit fetch');
    };

    render() {
   

        return (
            <div>
                <div className="myweeksectionlabels">
                    <div className="item-label likedLeast">Course You Liked Least</div>
                    <div className="item-label likedMost">Course You Liked Most</div>
                </div>
                <div className="myweeksection">
                        <select className="item likedLeast" type="text" ref={input => this.likedLeastInput = input} name="liked-least" validate={[required, nonEmpty, isTrimmed]} >
                            {this.props.courseDropDown}
                        </select>
                        <select className="item likedMost" type="text" ref={input => this.likedMostInput = input} name="liked-most" validate={[required, nonEmpty, isTrimmed]}>
                            {this.props.courseDropDown}
                        </select>
                </div>
                <div className="myweeksectionlabels">
                    <div className="item-label mostDifficult">Your Most Difficult Course</div>
                    <div className="item-label leastDifficult">Your Least Difficult Course</div>
                </div>
                <div className="myweeksection">
                        <select className="item mostDifficult" type="text" ref={input => this.mostDifficultInput = input} name="most-difficult" validate={[required]}>
                            {this.props.courseDropDown}
                        </select>
                        <select className="item leasttDifficult" type="text" ref={input => this.leastDifficultInput = input} name="least-difficult" validate={[required, nonEmpty, isTrimmed]}>
                            {this.props.courseDropDown}
                    </select>
                </div>
                <div>
                        <button className="action-btns" onClick={e => this.submitFetch(e)}>Commit Week Details</button>
                </div>
                    
                       
                    </div> 
        );

    }
}

import React from 'react';

import {required, nonEmpty, isTrimmed} from '../validators';

import './css/add-form.css';

export class AddWeekForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();

        const newWeek = {
            termDesc: this.termDescInput.value.trim(),
            weekNum:this.weekNumInput.value,
            startDate:this.startDateInput.value,
            endDate: this.endDateInput.value
        }
        console.log(newWeek);
        if (newWeek && this.props.onAdd) {
            this.props.onAdd(newWeek);
        }
        this.termDescInput.value = '';
        this.weekNumInput.value='';
        this.startDateInput.value='';
        this.endDateInput.value='';
    };

    setEditing(editing) {
        this.setState({
            editing
        });
    }


    render() {
        if (!this.state.editing) {
            return (
                <div className="add-button"
                    onClick={() => this.setEditing(true)}>
                    <a href='#'> Add a {this.props.type}...</a>
                </div> 
            )
        }
        return (
            <form 
                className="week week-form"
                onSubmit={e => this.onSubmit(e)} >
                    <label htmlFor="term">Term</label>
                    <input type="text" 
                        ref={input => this.termDescInput = input}
                        placeholder="Spring, 2019" 
                        name="term"
                        validate={[required, nonEmpty, isTrimmed]} 
                    />
                    <label htmlFor="week-num">Week Number</label>
                    <input type="number" 
                        ref={input => this.weekNumInput = input}
                        name="week-num"
                        validate={[required, nonEmpty]} 
                    />
                    <label htmlFor="week-startdate">Week Start Date</label>
                    <input type="date" 
                        ref={input => this.startDateInput = input}
                        placeholder="01/01/2000" 
                        name="start-date"
                        validate={[required, nonEmpty]} 
                    />
                    <label htmlFor="week-enddate">Week End Date</label>
                    <input type="date" 
                        ref={input => this.endDateInput = input}
                        placeholder="01/08/2000" 
                        name="end-date"
                        validate={[required, nonEmpty]} 
                    />
                    <button 
                        type="submit" 
                        disabled={this.props.pristine || this.props.submitting}>
                        Add Week
                    </button>
                    <button
                        type="button"
                        onClick={() => this.setEditing(false)}>
                        Cancel
                    </button>     
            </form>
           
        );
    } 
}
 
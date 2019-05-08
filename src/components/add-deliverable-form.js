import React from 'react';

import {Link} from 'react-router-dom';

import {required, nonEmpty, isTrimmed} from '../validators';

import './css/plan-next-week.css';

export class AddDeliverableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const newDeliverable = {
            dueDate: this.dueDateInput.value,
            deliverableName: this.deliverableNameInput.value.trim(),
            pressure: this.pressureInput.value.trim(),
            deliverableDesc: this.deliverableDescInput.value.trim(),
            prephrs: this.prephrsInput.value
        }
        console.log(newDeliverable)
        if (newDeliverable && this.props.onAdd) {
            this.props.onAdd(newDeliverable);
        }
        this.termDescInput.value = '';
        this.courseNameInput.value = '';
    }
    
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
                    <Link to='#'> Add a {this.props.type}...</Link>
                </div>
            )
        }
        return (
                <form 
                    className="adddeliverable-form"
                    onSubmit={this.props.handleSubmit(values => this.onSubmit(values)
                        )}>
                        <label htmlFor="due-date">Due Date</label>
                        <input type="date" 
                            ref={input => this.dueDateInput = input}
                            name="due-date"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="deliverable-name">Deliverable Name</label>
                        <input type="text" 
                            ref={input => this.deliverableNameInput = input}
                            name="deliverable-name"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="pressure">Pressure</label>
                        <input type="text" 
                            ref={input => this.pressureInput = input}
                            name="pressure"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="deliverable-desc">Deliverable Description</label>
                        <input type="text" 
                            ref={input => this.deliverableDescInput = input}
                            name="deliverable-desc"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <label htmlFor="prephrs">How many Prep Hours do you need?</label>
                        <input type="number" 
                            ref={input => this.prephrsInput = input}
                            name="prephrs"
                            validate={[required, nonEmpty, isTrimmed]} 
                        />
                        <button type="submit">Add Deliverable</button>
                        <button type="button" onClick={() => this.setEditing(false)}>
                            Cancel
                        </button> 
            </form>
        );
    }
}

        
   
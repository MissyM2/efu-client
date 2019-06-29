import React from 'react';

import {Link} from 'react-router-dom';

import './css/deliverables.css';

export default class AddDeliverableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            fields: {
                dueDate:"",
                deliverableName:"",
                impact:"",
                desc: "",
                prephrs: ""
            },
            errors: {}
        }
    }

    _onFocus(e){
        e.currentTarget.type = "date";
    }

    _onBlur(e){
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Enter a Date";
    }

    addDeliverableSubmit(e) {
        e.preventDefault();
        const newDeliverable = {
            termDesc: this.props.currentterm,
            courseName: this.props.currentcoursename,
            dueDate: this.state.fields.dueDate,
            deliverableName: this.state.fields.deliverableName,
            impact: this.state.fields.impact,
            desc: this.state.fields.desc,
            prephrs: this.state.fields.prephrs
        }

        this.setState({
            fields:{
                dueDate:"",
                deliverableName:"",
                impact:"",
                desc: "",
                prephrs: ""
            }
        });

        this.setEditing(false);
        this.props.submitadddeliverable(newDeliverable);
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
    }
    
    setEditing(editing) {
        this.setState({
            editing
        });
    }
    
    render() {

        const delNames = this.props.deliverableNames.map((delname, index) => {
            return (
                    <option 
                        key = {index}
                        value={delname}
                    >
                            {delname}
                    </option>
            );
        });

        const prephrsoptions = this.props.prephrs.map((option, index) => {
            return (
                <option 
                        key = {index}
                        value={option}
                    >
                            {option}
                </option>
            );
        });

            if (!this.state.editing) {
                const text = `Add a Deliverable`;
                return (
                    <div className="blue-btn btn-med tenpx-bottom-margin"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setEditing(true);
                            this.props.setdeliverableadded(false);
                            this.props.setdeliverableischanged(false);
                        }}>
                        <Link to='#'>{text}...</Link>
                    </div>
                )
            }

       
        //console.log('add-deliverable-form, this.props', this.props);
        return (
                <div className="add-deliverable-form">
                    <form className="del-form" onSubmit={this.addDeliverableSubmit.bind(this)}>

                        <div className="error-msg">
                                {this.state.errors["emptyFields"]}
                        </div>

                        <ul className="unit-container-blue ul-deliverable">

                        
                                <li className="del-row">
                                        <input 
                                                className="del-unit-container fivepx-margin duedate color-dark"
                                                placeholder="Due Date"
                                                type="text"
                                                onFocus={this._onFocus}
                                                onBlur={this._onBlur}
                                                onChange={this.handleChange.bind(this, "dueDate")}
                                                value={this.state.fields["duedate"]}
                                                aria-label="dueDate"
                                        />
                                        <select 
                                                className="del-unit-container fivepx-margin delname color-dark" 
                                                defaultValue="DEFAULT"
                                                type="text"
                                                onChange={this.handleChange.bind(this, "deliverableName")}
                                                aria-label="deliverableName"
                                                >
                                                    <option className="default-value" value="DEFAULT" disabled>What kind of deliverable is this?  Make a choice.</option> 
                                                    {delNames}
                                        </select>


                                        <select 
                                                className="del-unit-container fivepx-margin prephrs color-dark" 
                                                defaultValue="DEFAULT"
                                                type="number"
                                                onChange={this.handleChange.bind(this, "prephrs")}
                                                aria-label="prephrs"
                                                >
                                                    <option className="default-value" value="DEFAULT" disabled>How many hours of prep do you need? Make a choice.</option>
                                                    {prephrsoptions}
                                        </select>
                                </li>
                                <li className="del-row">
                                        <select 
                                                className="del-unit-container fivepx-margin impact color-dark" 
                                                defaultValue="DEFAULT" 
                                                type="text"
                                                onChange={this.handleChange.bind(this, "impact")}
                                                aria-label="impact"
                                                >
                                                        <option className="default-value" value="DEFAULT" disabled>How will it impact your grade?  Make a choice.</option> 
                                                        <option 
                                                                key = "1"
                                                                value='low'
                                                                >
                                                                Low Impact: less than 5% of final grade
                                                        </option>
                                                        <option 
                                                                key = "2"
                                                                value='moderate'
                                                                >
                                                                Moderate Impact: about 10% of final grade
                                                        </option>
                                                        <option 
                                                                key = "3"
                                                                value='high'
                                                                >
                                                                High Impact: 15% or greater of final grade
                                                        </option>
                                        </select>
                                        <input 
                                                className="del-unit-container fivepx-margin desc"
                                                placeholder="Study chapters..."
                                                type="text"
                                                onChange={this.handleChange.bind(this, "desc")}
                                                aria-label="deliverable-desc"
                                        />
                                </li>
                                
                        </ul>
                        <div className="action-btns">
                            <button type="submit" className="blue-btn btn-small fivepx-margin">Add </button>
                            <button className="blue-btn btn-small fivepx-margin" type="button" onClick={() => this.setEditing(false)}>
                                Cancel
                            </button>    
                        </div>
                    </form> 

                </div>
                
        );
    }
}

        
   
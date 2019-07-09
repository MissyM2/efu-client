import React from 'react';

import {Link} from 'react-router-dom';

import './css/add-deliverable-form.css';

export default class AddDeliverableForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            fields: {
                dueDate:"",
                deliverableName:"",
                desc: "",
            },
            errors: {}
        }
        this.setSelectedCourseForAdd = this.setSelectedCourseForAdd.bind(this);
    }

    _onFocus(e){
        e.currentTarget.type = "date";
    }

    _onBlur(e){
        e.currentTarget.type = "text";
        e.currentTarget.placeholder = "Enter a Date";
    }
   
    handleChange(field,e){
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({fields});
        console.log('handleChange', this.state.fields["dueDate"]);
    }

    setSelectedCourseForAdd(e) {
        e.preventDefault();
        this.props.setdeliverableadded(false);
        this.props.setdeliverableupdated(false);
        this.setState({
            courseSelected: e.target.value,
            courseIsChanged:true,
            setEditing: true
        }, () => {
                this.props.setdeliverableadding(true);
                this.props.setcurrentcoursename(this.state.courseSelected);
        });

    }
/*
    setEditing(editing) {
        this.setState({
            editing
        });
    }
    */
/****** DO I NEED THIS?? 
    handleValidation() {
        console.log('made it to handleValidation');
        let fields = this.state.fields;
        let errors={};
        let formIsValid = true;

        if(!fields["courseName"] || !fields["dueDate"] || !fields["deliverableName"] ) {
                console.log('one of the fields is false', this.state.fields);
                formIsValid = false;
                errors["emptyFields"] = "All the following information is required:  Course Name, Due Date, Deliverable Name, Grade Impact and Prep Hours Needed.";
        }

        this.setState({
                errors:errors
        });

        return formIsValid;
       

}
*/

    addDeliverableSubmit(e) {
        e.preventDefault();
        console.log('made it to adddeliverablesubmit, deliverableName)', this.state.fields.deliverableName);
        let impactValue = "";
        let prephrsValue = 0;
        switch(this.state.fields.deliverableName) {
            case "Quiz":
                console.log('Quiz');
                    impactValue = "moderate";
                    prephrsValue = 6;
              break;
            case "Test":
                    console.log('Test');
                            impactValue = "high";
                            prephrsValue = 16;
              break;
            case "Midterm":
                    console.log('Midterm');
                            impactValue = "high-plus";
                            prephrsValue = 20;
              break;
            case "Final":
                    console.log('Final');
                            impactValue = "high-plus";
                            prephrsValue = 20;
              break;
            case "Lab/Essay":
                    console.log('Lab/Essay');
                            impactValue = "moderate";
                            prephrsValue = 2;
              break;
            case "Term Paper/Group Project Final":
                    console.log('Term Paper/Group Project Final');
                            impactValue = "high-plus";
                            prephrsValue = 20;
              break;
            case "Term Paper/Group-Project Checkpoint":
                    console.log('Term Paper/Group-Project Checkpoint');
                            impactValue = "moderate";
                            prephrsValue = 6;
              break;
            case "Homework":
                    console.log('Homework');
                            impactValue = "low";
                            prephrsValue = 2;
              break;
            case "Participation":
                    console.log('Participation');
                            impactValue = "low";
                            prephrsValue = 2;
                            console.log('prephrsValue', prephrsValue);
                break;
            default:
                            impactValue = "moderate";
                            prephrsValue = 6;
          }

          console.log('prephrsValue', prephrsValue);

        const newDeliverable = {
            termDesc: this.props.currentterm,
            courseName: this.props.currentcoursename,
            dueDate: this.state.fields["dueDate"],
            deliverableName: this.state.fields["deliverableName"],
            impact: impactValue,
            desc: this.state.fields["desc"],
            prephrs: prephrsValue
        }
        console.log('newDeliverable', newDeliverable);

        this.setState({
            dueDate:"",
            deliverableName:"",
            desc: ""
        });

        //this.setEditing(false);
        this.props.submitadddeliverable(newDeliverable);
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

        const mycoursedropdown = this.props.thistermcourses.map((course, index) => {
            return (
                <option 
                    key={index}
                    value={course.courseName}
                    onChange={this.handleChange}
                    >
                    {course.courseName}
                </option>
            );
        });
/*
            if (!this.state.editing) {
                const text = `Add a Deliverable`;
                return (
                    <div className="blue-btn btn-med tenpx-bottom-margin"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setEditing(true);
                            this.props.setdeliverableadded(false);
                            this.props.setdeliverableupdated(false);
                        }}>
                        <Link to='#'>{text}...</Link>
                    </div>
                )
            }
*/
        return (
                <div className="add-deliverable-form">
                    <select
                            type="text"
                            className="course-select"
                            defaultValue='DEFAULT'
                            onChange={this.setSelectedCourseForAdd}
                            >
                            <option value="DEFAULT" selected disabled>Choose a course</option>
                                    {mycoursedropdown}
                    </select>
                    <form className="del-form" onSubmit={this.addDeliverableSubmit.bind(this)}>

                        <div className="message-style">
                                {this.state.errors["emptyFields"]}
                        </div>

                        <ul className="unit-container-blue ul-deliverable">

                        
                                <li className="del-row">
                                        <input 
                                                className="del-unit-container fivepx-margin duedate"
                                                placeholder="Due Date"
                                                type="text"
                                                onFocus={this._onFocus}
                                                onBlur={this._onBlur}
                                                onChange={this.handleChange.bind(this, "dueDate")}
                                                value={this.state.fields["dueDate"]}
                                                aria-label="dueDate"
                                        />
                                        <select 
                                                className="del-unit-container fivepx-margin delname" 
                                                defaultValue="DEFAULT"
                                                type="text"
                                                onChange={this.handleChange.bind(this, "deliverableName")}
                                                aria-label="deliverableName"
                                                required
                                                >
                                                    <option className="default-value" value="DEFAULT" disabled selected hidden>What kind of deliverable is this?  Make a choice.</option> 
                                                    {delNames}
                                        </select>

                                </li>
                                <li className="del-row">
                                        <input 
                                                className="del-unit-container fivepx-margin desc"
                                                placeholder="Describe what needs to be prepped(i.e. study chapters...)"
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

        
   
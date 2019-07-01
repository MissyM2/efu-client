import React from 'react';

import './css/deliverable.css';

export default class DeliverableFromMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            oldDueDateFormatted:this.props.dueDateFormatted,
            oldPrephrs:this.props.prephrs,
            oldDeliverableName:this.props.deliverableName,
            oldDesc: this.props.desc,
            oldImpact:this.props.impact,
            deliverableCount:0,
            currDelDate:"01/20/1963",
            fields: {
                newDueDateFormatted: null,
                newPrephrs:0,
                newDeliverableName:"",
                newDesc: "",
                newImpact:""
            }
        }
        this.dueDateFormatted = React.createRef();
        this.prephrs = React.createRef();
        this.deliverableName = React.createRef();
        this.desc = React.createRef();
        this.impact = React.createRef();
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this.prepDelete = this.prepDelete.bind(this);
    }

    prepDelete() {

        let delToBeDeleted = {
            termDesc: this.props.termDesc,
            courseName: this.props.courseName,
            dueDate: this.state.oldDueDateFormatted,
            deliverableName: this.state.oldDeliverableName,
            prephrs: this.state.oldPrephrs,
            desc: this.state.oldDesc,
            impact:this.state.oldImpact
        };
        this.props.setdeliverabletobedeleted(delToBeDeleted);
        //this.props.setdeliverabledeletemodal(true);
   }


   handleChange(field, e) {
       console.log('field', field);
       this.props.setdeliverableischanged(false);
       let fields = this.state.fields;
       console.log('fields', fields);
       
       fields[field] = e.target.value;
       console.log('fields[field]', fields[field]);
       this.setState({
           fields
       });
       this.props.setdeliverableischanged(true); 
   }

   _onFocus(e){
        this.setState({
            currDelDate: e.currentTarget.value
        });
        e.currentTarget.type = "date";
    }

    _onBlur(e){
        e.currentTarget.type = "text";
        e.currentTarget.value = this.props.dueDateFormatted;
    }

   updateSubmit(e) {
        e.preventDefault();
        let dueDate;
        let deliverableName;
        let prephrs;
        let desc;
        let impact;

        if(this.state.fields["newDueDateFormatted"]) {
            dueDate=this.state.fields["newDueDateFormatted"];
        } else {
            dueDate=this.state.oldDueDate;
        }

        if(this.state.fields["newDeliverableName"]) {
            deliverableName=this.state.fields["newDeliverableName"];
        } else {
            deliverableName=this.state.oldDeliverableName;
        }

        if(this.state.fields["newPrepHrs"]) {
            prephrs=this.state.fields["newPrephrs"];
        } else {
            prephrs=this.state.oldPrephrs;
        }

        if(this.state.fields["newDesc"]) {
            desc=this.state.fields["newDesc"];
        } else {
            desc=this.state.oldDesc;
        }

       if(this.state.fields["newImpact"]) {
            impact=this.state.fields["newImpact"];
       } else {
            impact=this.state.oldImpact;
       }

       let updatedDeliverable = {
           termDesc: this.props.termDesc,
           courseName: this.props.courseName,
           dueDate: dueDate,
           deliverableName: deliverableName,
           prephrs: prephrs,
           desc: desc,
           impact:impact
       };
       this.props.submitupdatedeliverable(updatedDeliverable);
       this.props.setdeliverableischanged(true);
       /*
       this.setState({
            oldCourseName: course,
            oldDueDateFormatted:this.props.dueDateFormatted,
            oldPrephrs:this.props.prephrs,
            oldCourseName: this.props.courseName,
            oldDeliverableName:this.props.deliverableName,
            oldDesc: this.props.desc,
            oldImpact:this.props.impact,
           fields:{
               newCourseName: ""
           }
       })
       */
   }

   render() {
       const prephrsoptions = this.props.allprephrs.map((option, index) => {
                return (
                    <option 
                            key = {index}
                            value={option}
                        >
                               {option}
                    </option>
                );
        });
        

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
    console.log('deliverablefrommenu: this.props', this.props);
    return (
            
                <div>
                    {/*<form onSubmit={this.updateSubmit.bind(this)}>*/}
                        <div className="course-container-blue tenpx-bottom-margin">
                            {(this.props.deliverableischanged) ? (
                                <div className="error-msg">
                                    Your deliverable has been updated.
                                </div>
                            ):(
                                <div>
                                    <form onSubmit={this.updateSubmit.bind(this)}>
                                            <div className="center">
                                                    <div className="deliverable-sub-section sec-one">
                                                            <div className="column">
                                                                <label className="small-titles light-label"> Course Name</label>
                                                                <div className="course-name">{this.props.courseName}</div>
                                                            </div>
                                                            <div className="column">
                                                                    <label className="small-titles light-label">Due Date</label>
                                                                    <input
                                                                        ref={element => this.dueDateFormatted = element}
                                                                        type="text"
                                                                        onFocus={this._onFocus}
                                                                        onBlur={this._onBlur}
                                                                        onChange={this.handleChange.bind(this, "newDueDateFormatted")}
                                                                        defaultValue={this.state["oldDueDateFormatted"]}
                                                                        aria-label="dueDateFormatted"
                                                                    />
                                                            </div>
                                                            
                                                    </div>
                                                    <div className="deliverable-sub-section sec-three">
                                                                <div className="column">
                                                                        <label className="small-titles light-label">Prep Hours</label>
                                                                        <select
                                                                            ref={element => this.prephrs = element}
                                                                            type="number"
                                                                            onChange={this.handleChange.bind(this, "newPrephrs")}
                                                                            defaultValue={this.state["oldPrephrs"]}
                                                                            aria-label="prephrs"
                                                                        >  
                                                                        {prephrsoptions}
                                                                        </select>
                                                                </div>
                                                                <div className="column">
                                                                    <label className="small-titles light-label"> Deliverable Name</label>
                                                                    <select
                                                                            ref={element => this.deliverableName = element}
                                                                            type="text"
                                                                            onChange={this.handleChange.bind(this, "newDeliverableName")}
                                                                            defaultValue={this.state["oldDeliverableName"]}
                                                                            aria-label="DeliverableName"
                                                                    >
                                                                        {delNames}
                                                                    </select>
                                                                </div> 
                                                    </div>
                                                    <div className="deliverable-sub-section sec-two">
                                                                <div className="column">
                                                                        <label className="small-titles light-label"> Description</label>
                                                                        <input
                                                                                ref={element => this.desc = element}
                                                                                type="text"
                                                                                onChange={this.handleChange.bind(this, "desc")}
                                                                                defaultValue={this.state["oldDesc"]}
                                                                                aria-label="Desc"
                                                                            />
                                                                    
                                                                </div>
                                                                <div className="column">
                                                                        <label className="small-titles light-label"> Impact</label>
                                                                        <select
                                                                                ref={element => this.impact = element}
                                                                                type="text"
                                                                                onChange={this.handleChange.bind(this, "impact")}
                                                                                defaultValue={this.state["oldImpact"]}
                                                                                aria-label="Impact"
                                                                        >
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
                                                                </div>    
                                                    </div>
                                                    <div className="action-btns">
                                                        <button 
                                                            className="green-btn btn-small fivepx-margin" 
                                                            type="submit" 
                                                            value="Update"
                                                        >
                                                            Update
                                                        </button>
                                                    </div>
                                            </div>
                                    </form>
                                            <div className="center">
                                                    <div className="action-btns">
                                                        <button 
                                                            className="green-btn btn-small fivepx-margin" 
                                                            onClick={this.prepDelete}
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                            </div>
                                </div>
                                
                            )}
                                
                        </div>   
                </div>
            );
        } 
}
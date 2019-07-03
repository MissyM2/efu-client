import React from 'react';

import './css/deliverable-profile.css';

export default class DeliverableProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delUpdatingId:"",
            delDeletingId:"",
            oldPrephrs:this.props.prephrs,
            oldDesc: this.props.desc,
            oldImpact:this.props.impact,
            deliverableCount:0,
            currDelDate:"01/20/1963",
            impact:"",
            prephrs:0,
            desc:"",
            newPrephrs:0,
            newDesc: "",
            newImpact:"",
            message:""
            }
        this.initialState={...this.state}
        this.prephrs = React.createRef();
        this.desc = React.createRef();
        this.impact = React.createRef();
        this.deleteSubmit = this.deleteSubmit.bind(this);
    }


   handleChange(field, e) {
        let delFieldValue = e.target.value;
        switch(field) {
            case "prephrs":
                    this.setState({
                        newPrephrs: delFieldValue
                    }, () => {
                        //console.log('this.state', this.state);
                    });
                break;
            case "desc":
                    this.setState({
                        newDesc: delFieldValue
                    }, () => {
                        //console.log('this.state', this.state);
                    });
                break;
            case "impact":
                    this.setState({
                        newImpact: delFieldValue
                    }, () => {
                        //console.log('this.state', this.state);
                    });
                break;
            default:
                console.log('field names did not match any of the options.');
        }
     
    }

    deleteSubmit() {
        this.setState({
            delDeletingId:this.props.id,
            message: "Your deliverable has been deleted."
        }, () => {
            console.log("this.state.deliverableDeletingId", this.state.delDeletingId);
        });

        let deliverable = {
            termDesc: this.props.termDesc,
            courseName: this.props.courseName,
            dueDate: this.props.dueDateFormatted,
            deliverableName: this.props.deliverableName,
            prephrs: this.state["oldPrephrs"],
            desc: this.props.desc,
            impact:this.props.impact
        };
        console.log('prepDelete, delToBeDeletet', deliverable);
        this.props.submitdeletedeliverable(deliverable);
        
   }

   updateSubmit(e) {
        e.preventDefault();
        this.setState({
            delUpdatingId:this.props.id,
            message: "Your deliverable has been updated."
        }, () => {
            //console.log("this.state.deliverableUpdatingId", this.state.delUpdatingId);
        });

        let prephrs;
        let desc;
        let impact;

        if(this.state.newPrephrs !== "") {
            prephrs=this.state.newPrephrs;
        } else {
            prephrs=this.state.oldPrephrs;
        }

        if(this.state.newDesc !== "") {
            desc=this.state.newDesc;
        } else {
            desc=this.state.oldDesc;
        }

       if(this.state.newImpact !== "") {
            impact=this.state.newImpact;
       } else {
            impact=this.state.oldImpact;
       }

       let deliverable = {
           termDesc: this.props.termDesc,
           courseName: this.props.courseName,
           dueDate: this.props.dueDate,
           deliverableName: this.props.deliverableName,
           prephrs: prephrs,
           desc: desc,
           impact:impact
       };

       this.props.submitupdatedeliverable(deliverable);   
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

    return (  
                <div>
                         <div className="course-container-blue tenpx-bottom-margin">
                                <div>
                                    <form onSubmit={this.updateSubmit.bind(this)}>
                                            <div className="center">
                                                    <div className="deliverable-sub-section three-items-top">
                                                            <div className="column">
                                                                <label className="small-titles light-label"> Course Name</label>
                                                                <div className="del-read-only">{this.props.courseName}</div>
                                                            </div>
                                                            <div className="column">
                                                                    <label className="small-titles light-label">Due Date</label>
                                                                    <div className="del-read-only">{this.props.dueDateFormatted}</div>
                                                            </div>
                                                            <div className="column">
                                                                    <label className="small-titles light-label"> Deliverable Name</label>
                                                                    <div className="del-read-only">{this.props.deliverableName}</div>
                                                                </div> 
                                                    </div>
                                                    <div className="deliverable-sub-section three-items-bottom">
                                                            <div className="select-prephrs">
                                                                                <label className="small-titles light-label">Prep Hours</label>
                                                                                <select
                                                                                    className="center"
                                                                                    ref={element => this.prephrs = element}
                                                                                    delPrepHrs = {this.props.prephrs}
                                                                                    type="number"
                                                                                    onChange={this.handleChange.bind(this, "prephrs")}
                                                                                    defaultValue={this.props.prephrs}
                                                                                    aria-label="prephrs"
                                                                                >
                                                                                <option
                                                                                    key="1"
                                                                                    value={this.props.prephrs}
                                                                                >
                                                                                    {this.props.prephrs}
                                                                                </option>
                                                                                {prephrsoptions}
                                                                                </select>
                                                                </div>
                                                            <div className="select-impact">
                                                                        <label className="small-titles light-label">Impact</label>
                                                                        <select
                                                                                ref={element => this.impact = element}
                                                                                type="text"
                                                                                value={this.props.impact}
                                                                                onChange={this.handleChange.bind(this, "impact")}
                                                                                defaultValue={this.props.impact}
                                                                                aria-label="Impact"
                                                                        >
                                                                            <option
                                                                                key="1"
                                                                                value={this.props.impact}
                                                                            >
                                                                                {this.props.impact}
                                                                            </option>
                                                                            <option 
                                                                                key = "2"
                                                                                value='Low'
                                                                                >
                                                                                Low
                                                                            </option>
                                                                            <option 
                                                                                key = "3"
                                                                                value='Moderate'
                                                                                >
                                                                                Moderate
                                                                            </option>
                                                                            <option 
                                                                                key = "4"
                                                                                value='High'
                                                                                >
                                                                                High
                                                                            </option>
                                                                            <option 
                                                                                key = "5"
                                                                                value='High Plus'
                                                                                >
                                                                                High-Plus
                                                                            </option>
                                                                        </select>
                                                                </div>    
                                                            <div className="input-desc">
                                                                    <label className="small-titles light-label"> Description</label>
                                                                    <input
                                                                            ref={element => this.desc = element}
                                                                            type="text"
                                                                            onChange={this.handleChange.bind(this, "desc")}
                                                                            defaultValue={this.props.desc}
                                                                            aria-label="Desc"
                                                                        />
                                                                
                                                            </div>
                                                    </div>
                                                    {(this.props.deliverableIsChanged &&
                                                        this.props.id === this.state.delUpdatingId)
                                                             ? (
                                                            <div className="msg-style">{this.state.message}</div>
                                                            ):(
                                                        ""
                                                    )}
                                                    <div className="action-btns">
                                                            <button 
                                                                name="action-btn"
                                                                className="green-btn btn-small fivepx-margin" 
                                                                type="submit" 
                                                                value="Update"
                                                            >
                                                                Update
                                                            </button>
                                                            <button 
                                                                name="action-btn"
                                                                className="green-btn btn-small fivepx-margin" 
                                                                type="button"
                                                                value="Delete"
                                                                onClick={this.deleteSubmit}
                                                            >
                                                                Delete
                                                            </button>
                                                    </div>
                                            </div>
                                    </form>  
                                </div>
                        </div>   
                </div> 
            );
        } 
}
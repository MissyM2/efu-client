import React from 'react';

import './css/deliverable-profile.css';

export default class DeliverableProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliverableUpdatingId:"",
            deliDeletingId:"",
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
        }
     
    }

    deleteSubmit() {
        this.setState({
            delDeletingId:this.props.id
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
        this.props.submitdeletedeliverable(deliverable);
        this.setState = (this.initialState);
        
   }

   updateSubmit(e) {
        e.preventDefault();
        this.setState({
            deliverableUpdatingId:this.props.id,
            message: "Your deliverable has been updated."
        }, () => {
            console.log("this.state.deliverableUpdatingId", this.state.deliverableUpdatingId);
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
                                            <div className="center deliverables-all-items">
                                                    <div className="deliverable-sub-section three-items-top">
                                                            <div className="column">
                                                                <label className="small-titles tall-titles light-label"> Course Name</label>
                                                                <div className="del-read-only">{this.props.courseName}</div>
                                                            </div>
                                                            <div className="column">
                                                                    <label className="small-titles tall-titles light-label">Due Date</label>
                                                                    <div className="del-read-only">{this.props.dueDateFormatted}</div>
                                                            </div>
                                                            <div className="column">
                                                                    <label className="small-titles tall-titles  light-label"> Deliverable Name</label>
                                                                    <div className="del-read-only">{this.props.deliverableName}</div>
                                                                </div> 
                                                    </div>
                                                    <div className="two-items-bottom">
                                                    <div className="deliverable-sub-section two-items-middle">
                                                            <div className="column select-prephrs">
                                                                                <label className="small-titles  sometimes-tall-titles light-label">Prep Hours</label>
                                                                                <div className="del-editable">
                                                                                        <select
                                                                                            ref={element => this.prephrs = element}
                                                                                            delprephrs = {this.props.prephrs}
                                                                                            type="number"
                                                                                            onChange={this.handleChange.bind(this, "prephrs")}
                                                                                            //defaultValue={this.props.prephrs}
                                                                                            value={this.props.prephrs}
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
                                                                               
                                                            </div>
                                                            <div className="column select-impact">
                                                                        <label className="small-titles  sometimes-tall-titles light-label">Impact</label>
                                                                        <div className="del-editable">
                                                                            <select
                                                                                ref={element => this.impact = element}
                                                                                type="text"
                                                                                value={this.props.impact}
                                                                                onChange={this.handleChange.bind(this, "impact")}
                                                                                //defaultValue={this.props.impact}
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
                                                                                                                                        </div>    
                                                     </div>
                                                     <div className="deliverable-sub-section one-item-bottom">
                                                            <div className="column input-desc">
                                                                    <label className="small-titles sometimes-tall-titles light-label"> Description</label>
                                                                    <div className="del-editable">
                                                                        <input
                                                                                ref={element => this.desc = element}
                                                                                type="text"
                                                                                onChange={this.handleChange.bind(this, "desc")}
                                                                                value={this.props.desc}
                                                                                aria-label="Desc"
                                                                            />

                                                                    </div>
                                                                    
                                                                
                                                            </div>
                                                    </div>

                                                    </div>
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
                                {(this.props.deliverableUpdated === true &&
                                    this.props.id === this.state.deliverableUpdatingId) ? (
                                        <div className="message-style">{this.state.message}</div>
                                ):(
                                        null
                                )}  
                        </div>
                        
                </div> 
            );
        } 
}
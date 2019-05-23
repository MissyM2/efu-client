import React from 'react';

export default class Course extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oldCourseName: this.props.courseName,
            newCourseName: ""
        }
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    setDelete(e) {
        e.preventDefault();
        let selectedCourse = {
            termDesc: this.props.termDesc,
            courseName:this.props.courseName
        };
        this.props.deletecourse(selectedCourse); 
    }

    handleChange(e, field) {
        this.setState({
            [field]: e.target.value
          });
    }

    handleUpdate(e) {
        e.preventDefault();
    
        let updateCourse = {
            termDesc: this.props.termDesc,
            oldCourseName: this.state.oldCourseName,
            newCourseName:this.state.newCourseName
        };
        this.props.updateCourse(updateCourse); 
    }

    render () {
        return (
            <div>
                <form onSubmit={this.handleUpdate}>
                    <div>
                        <input
                             className="item"
                            type="text"
                            defaultValue={this.props.courseName}
                            onChange={e => this.handleChange(e,"newCourseName")}>
                        </input>
                    </div>
                    <div className="list-horizontal">
                        <input className="btn" type="button" value="Update" />
                        <button className="btn delete-btn" onClick={(e) => this.setDelete(e)}>Delete</button>
                    </div>
                    
                    
                
                
                </form>
                
            </div>
            
                
            
            );
    }
    
}
import React from 'react';

export default class Course extends React.Component {

    setDelete(e) {
        e.preventDefault();
    
        let selectedCourse = {
            termDesc: this.props.termDesc,
            courseName:this.props.courseName
        };
        this.props.deletecourse(selectedCourse); 
    }

    render () {
       // console.log('course props', this.props);
        return ( 
            <div>
               <p>{this.props.courseName}</p>
               <div>
                    <div className="edit-btn update-btn"><i className="far fa-edit"></i></div>
                    <div className="edit-btn delete-btn" onClick={(e) => this.setDelete(e)}><i className="far fa-trash-alt"></i></div>
                </div>
            </div>
            );
    }
    
}
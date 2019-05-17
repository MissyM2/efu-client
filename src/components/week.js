import React from 'react';

export default class Week extends React.Component {

    setDelete(e) {
        e.preventDefault();
    
        let selectedWeek = {
            termDesc: this.props.termDesc,
            weekNum:this.props.weekNum
        };
        this.props.deleteweek(selectedWeek); 
    }


    

    render() {
        return ( 
            <div className="list-horizontal">
               <p className="item">{this.props.weekNum}</p>
               <p className="item">{this.props.termDesc}</p>
               <p className="item">{this.props.likedLeast}</p>
               <p className="item">{this.props.likedMost}</p>
               <p className="item">{this.props.mostDifficult}</p>
               <p className="item">{this.props.leastDifficult}</p>
               <div className="list-horizontal">
                    <div className="edit-btn update-btn"><i className="far fa-edit"></i></div>
                    <div className="edit-btn delete-btn" onClick={(e) => this.setDelete(e)}><i className="far fa-trash-alt"></i></div>
                </div>
               
            </div>
            );
    }
    
}
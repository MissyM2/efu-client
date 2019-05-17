import React from 'react';

export default class Term extends React.Component {
   

    setSelectedTerm(e) {
        e.preventDefault();
        const selterm = e.currentTarget.getAttribute("id");
        console.log('made it to setSelectedTerm', selterm);
        this.props.getselectedterm(selterm); 
    }
    render() {
        return ( 
            <div>
                <div 
                    id={this.props.termDesc}
                    onClick={(e) =>{
                    this.setSelectedTerm(e)}}>
                    {this.props.termDesc}
                </div>
            </div>
        );

    }
    
}

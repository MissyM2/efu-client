import React from 'react';

export default class Term extends React.Component {
   

    setSelectedTerm(e) {
        e.preventDefault();
        const selterm = e.currentTarget.getAttribute("data-identifier");
        this.props.getcurrentterm(selterm); 
    }
    render() {
        return ( 
            <div>
                <div 
                    className="input-look-term"
                    data-identifier={this.props.termDesc}
                    onClick={(e) =>{
                    this.setSelectedTerm(e)}}>
                    {this.props.termDesc}
                </div>
            </div>
        );

    }
    
}

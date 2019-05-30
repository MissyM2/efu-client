import React from 'react';

export default class Term extends React.Component {
   

    setSelectedTerm(e) {
        e.preventDefault();
        const selterm = e.currentTarget.getAttribute("data-identifier");
        console.log("term: setSelectedTerm", selterm);
        console.log('term: this.props in setSelectedTerm', this.props);
        this.props.getcurrentterm(selterm); 
    }
    render() {
        console.log('term: this.props after render', this.props);
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

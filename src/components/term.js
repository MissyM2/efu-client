import React from 'react';

import './css/term.css';

export default class Term extends React.Component {
   

    setSelectedTerm(e) {
        e.preventDefault();
        const selterm = e.currentTarget.getAttribute("data-identifier");
        this.props.getcurrentterm(selterm);


    }
    render() {
        console.log('term: this.props.currentterm in render', this.props.currentterm);

        let termClasses = 'available-terms';
        // whatever term is in currentterm, the class should be selected
        if (this.props.currentterm === this.props.termDesc) {
            termClasses='available-terms selected';
        }
        
        return (
                <div 
                    className={termClasses}
                    data-identifier={this.props.termDesc}
                    onClick={(e) =>{
                    this.setSelectedTerm(e)}}>
                    {this.props.termDesc}
                </div>
        );

    }
    
}

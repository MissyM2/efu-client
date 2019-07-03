import React from 'react';

import './css/suggestion.css';

class Suggestion extends React.Component {
    render() {
        return (
            <ul className="skills-suggestion"> 
                    <li>
                        <div>{this.props.currentsuggestion.category}</div> 
                    </li>
                    <li>
                    <div>{this.props.currentsuggestion.desc}</div>
                    <div>~ {this.props.currentsuggestion.credit}</div>

                    </li>
            </ul> 
        );
    }
    
}

export default Suggestion;
import React from 'react';
import {connect} from 'react-redux';

import {fetchGetSuggestions} from '../actions/protected-data';

import './css/suggestions.css';

export class Suggestions extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetSuggestions());    
    }
    
    render() {

        return (
            <div className="suggestion-wrapper">
                <ul className="suggestion-details">
                    <li className="suggestion-data-item category">A Suggestion from the {this.props.currentSuggestion.category} category</li>
                    <li className="suggestion-data-item desc">{this.props.currentSuggestion.desc}</li>
                    <li className="suggestion-data-item credit">~ {this.props.currentSuggestion.credit}</li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
            currentSuggestion: state.protectedData.suggestions[Math.floor(Math.random() * state.protectedData.suggestions.length)],
            title: "Your Daily Suggestion"
    };
    
};

export default connect(mapStateToProps)(Suggestions);
                
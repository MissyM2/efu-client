import React from 'react';
import {connect} from 'react-redux';

import {fetchGetSuggestions} from '../actions/protected-data';

import './css/index.css';
import './css/dashboard.css';

export class Suggestions extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetSuggestions());    
    }
    
    render() {

        return (
            <div className="wrapper">
                <ul className="suggestion-details">
                    <li className="item category">A Suggestion from the {this.props.currentSuggestion.category} category</li>
                    <li className="item desc">{this.props.currentSuggestion.desc}</li>
                    <li className="item credit">~ {this.props.currentSuggestion.credit}</li>
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
                
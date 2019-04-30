import React from 'react';
import {connect} from 'react-redux';

import {fetchGetSuggestions} from '../actions/protected-data';

import './css/view-profile.css';

export class Suggestions extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetSuggestions());    
    }
    
    render() {

        return (
            <div className="data-wrapper">
                <h2>{this.props.title}</h2>
                <ul className="item-details">
                    <li className="item-data">{this.props.currentSuggestion.category}</li>
                    <li className="item-data">{this.props.currentSuggestion.desc}</li>
                    <li className="item-data">{this.props.currentSuggestion.credit}</li>
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
                
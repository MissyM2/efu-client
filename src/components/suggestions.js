import React from 'react';
import {connect} from 'react-redux';

import {SingleSuggestion} from './single-suggestion';

import {fetchGetSuggestions} from '../actions/protected-data';

import './css/view-profile.css';

export class Suggestions extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetSuggestions());    
    }
    
    render() {
        const suggestions = this.props.suggestions.map((singlesuggestion, index) => 
                <li key={index}>
                    <SingleSuggestion index={index} {...singlesuggestion} />
                </li>

                );

        return (
                <div className="data-wrapper">
                    <h2>{this.props.title}</h2>
                    <ul className="data-list">
                        {suggestions}
                    </ul>
                   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
            suggestions: state.protectedData.suggestions,
            title: "Your Daily Suggestion"
    };
    
};

export default connect(mapStateToProps)(Suggestions);
                
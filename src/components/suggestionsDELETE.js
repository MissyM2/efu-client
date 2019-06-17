import React, { useEffect, useState } from 'react';
import { FetchCalls } from '../fetch-calls';

const Suggestions = ()=> {
    const [currentsuggestions, setcurrentsuggestions] = useState("");
    const [loading, setloading] = useState([]);


    useEffect(() => {
        // set current suggestions
        FetchCalls.getSuggestions.then(suggestions => {
            let mysuggestions = [];
            suggestions
                .forEach(suggestion => {
                    return mysuggestions.push({
                        category: suggestion.category,
                        desc: suggestion.desc,
                        credit: suggestion.credit
                    })
                });
            setcurrentsuggestions(mysuggestions);
        }); 
    });

    return (
        <div>
            <ul className="suggestion-details">
                <li className="item category">A Suggestion from the {this.props.currentSuggestion.category} category</li>
                <li className="item desc">{this.props.currentSuggestion.desc}</li>
                <li className="item credit">~ {this.props.currentSuggestion.credit}</li>
            </ul>
        </div>
    );
}


export default Suggestions;
                
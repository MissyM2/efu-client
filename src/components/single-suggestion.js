import React from 'react';

import './css/view-suggestions.css';

export function SingleSuggestion(props) {
        return (
            <div className="single-suggestion">
                <div className="item-data category">{props.category}</div>
                <div className="item-data termdesc">{props.desc}</div>
                <div className="item-data termdesc">{props.credit}</div>
            </div>
        );
}

export default (SingleSuggestion);
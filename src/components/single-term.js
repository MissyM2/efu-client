import React from 'react';

import './css/single-term.css';

export function SingleTerm(props) {
        return (
            <div className="single-term">
                <div className="item-data termdesc">{props.termDesc}</div>
            </div>
        );
}

export default (SingleTerm);
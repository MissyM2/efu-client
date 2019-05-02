import React from 'react';

import {EditBtns} from './edit-btns';


import './css/terms.css';

export function SingleTerm(props) {
        return (
            <div className="single-term">
                <div className="term-data-item termdesc">{props.termDesc}</div>
                <EditBtns type="term" />
            </div>
        );
}

export default (SingleTerm);
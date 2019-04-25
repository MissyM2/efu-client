import React from 'react';
import AddtermForm from './addterm-form';
import {fetchAddterm} from '../actions/protected-data';

import {connect} from 'react-redux';

import './css/school-term.css';

export class Term extends React.Component {
    /* component did mount for the get of the terms} */
    
    render() {
        const terms = this.props.terms.map((term, index) => 
        <li className="term-wrapper" key={index}>
            <Term {...term} />
        </li>
        );

        return (
        <div>
                    <h2>schoolterm-form</h2>
                    <h2>{this.props.title}</h2>
                    <ul className="terms">
                        {terms}
                        <li className="add-term-wrapper">
                            <AddtermForm
                                type="term"
                                onAdd={term =>
                                    this.fetchAddterm(term)} />
                        </li>
                    </ul>
            </div>
        );
    }
}

Term.defaultProps = {
    title: ''
};

export default connect()(Term);
                
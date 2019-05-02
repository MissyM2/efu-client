import React from 'react';
import {connect} from 'react-redux';

import {SingleTerm} from './single-term';
import {AddTermForm} from './add-term-form';

import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';

import './css/terms.css';

export class Terms extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetTerms());    
    }

    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }
    
    render() {
        const terms = this.props.terms.map((singleterm, index) => 
                <li class="li-wrapper" key={index}>
                    <SingleTerm index={index} {...singleterm} />
                </li>

                );

        return (
                <div className="data-wrapper">
                    <h2>{this.props.title}</h2>
                    <div className="term-section">
                        <ul className="term-list">
                            {terms} 
                        </ul>
                        <div className="add-term-wrapper">
                            <AddTermForm
                                type="term"
                                onAdd={term => 
                                    this.fetchAddTerm(term)}  />
                        </div>
                    </div>
                    
                   
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
            terms: state.protectedData.terms,
            title: "Your Terms"
    };
    
};

export default connect(mapStateToProps)(Terms);
                
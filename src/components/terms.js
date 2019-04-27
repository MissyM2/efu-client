import React from 'react';

import {connect} from 'react-redux';

import {SingleTerm} from './single-term';

import {fetchGetTerms} from '../actions/protected-data';

//import AddtermForm from './addterm-form';
//import {fetchAddterm} from '../actions/protected-data';



import './css/view-terms.css';

export class Terms extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetTerms());    
 }
    
    render() {
        const terms = this.props.terms.map((singleterm, index) => 
                <li key={index}>
                    <SingleTerm {...singleterm} />
                </li>
                );

        return (
                <div className="terms-wrapper">
                    <h2>{this.props.title}</h2>
                    <ul className="terms-list">
                        {terms}
                       {/*} <li className="add-term-wrapper">
                            <AddtermForm
                                type="term"
                                onAdd={term =>
                                    this.fetchAddterm(term)} />
                                </li>*/}
                    </ul>
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
                
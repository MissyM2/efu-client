import React from 'react';
import {connect} from 'react-redux';
import { Link} from 'react-router-dom';

import {SingleTerm} from './single-term';
import {AddTermForm} from './add-term-form';

//import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';

import './css/terms.css';

export function Terms(props) {
    
    componentDidMount() {
        this.props.dispatch(fetchGetTerms()); 
    };

    const terms = props.termList.map((singleterm, index) => 
    <li className="term-menu-list-item" key={term.id}>
        <Link to={`/${singleterm.termId}`}><SingleTerm onClick={e => this.onClick(term)} index={index} {...singleterm} /></Link> 
    </li>

    );
    

    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }
    
    onClick(term) {
        this.setState({
            selectedTerm: term
        });
        this.setState({
            message: `I clicked and changed to ${this.state.selectedTerm}`
        });
    }

    render() {

        return (
                <div className="data-wrapper">
                   
                    <h2>props title will go here</h2>

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
                    <div>
                        render->state={this.state.selectedTerm} - {this.state.message}
                    </div>
                </div>
                
        );
    }

const mapStateToProps = state => {
    termList: Object.keys(state).map(termId => state[termId]);
    
    return {
            terms: state.protectedData.terms,
            title: "Your Terms"
    };
    
};

export default connect(mapStateToProps)(Terms);
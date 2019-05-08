import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {AddTermForm} from './add-term-form';
import {SingleTerm} from './single-term';

import './css/profile.css';

export class ProfileNav extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetTerms());
    };


    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }
/*
    onClick(term) {
        this.setState({
            selectedTerm: term
        });
        this.setState({
            message: `I clicked and changed to ${this.state.selectedTerm}`
        });
    }
  */ 
    render() {
        const terms = this.props.termList.map((term, index) => 
        <li className="term-menu-list-item" key={index}>
            <Link to={`/${term.termDesc}`}>
            {/*<SingleTerm onClick={e => this.onClick(term)} index={index} {...singleterm} />*/}
                <SingleTerm index={index} {...term} />
            </Link> 
        </li>
        );
        return (
            <div className="nav profile-nav">
            <h2>{this.props.title}</h2>
                <div className="term-section">
                    <nav className="term-menu">
                        <ul className="term-menu-list">
                            {terms}
                        </ul>
                    </nav> 
                </div>
                <div className="term-section">
                    <AddTermForm
                        type="term"
                        onAdd={term => 
                            this.fetchAddTerm(term)}  />
                </div>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    const terms = state.protectedData.terms;
    return {
        title: "Your Terms",
        termList: Object.keys(terms).map(termId => terms[termId])
    };
};

export default connect(mapStateToProps)(ProfileNav);

   
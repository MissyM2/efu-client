import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {AddTermForm} from './add-term-form';
//import {SingleTerm} from './single-term';
import {EditBtns} from './edit-btns';

import './css/profile.css';

export class ProfileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileSelectedTerm: 'Spring, 2019'
        };

    }

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
        <li className="item" key={index}>
            <Link to={`/${term.termDesc}`}>
            {/*<SingleTerm onClick={e => this.onClick(term)} index={index} {...singleterm} />*/}
                <div className="term-data-item termdesc" onClick={this.onClick}>{term.termDesc}</div>
                <EditBtns type="term" />
            </Link> 
        </li>
        );
        return (
            <div>
                <div className="term-section">
                    <h3>{this.props.title}</h3>
                    <nav className="term-menu">
                        <ul className="list-horizontal">
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
    const {currentUser} = state.auth;
    return {
        title: "Your Terms",
        termList: Object.keys(terms).map(termId => terms[termId]),
        firstname: currentUser.firstName
    };
};

export default connect(mapStateToProps)(ProfileNav);

   
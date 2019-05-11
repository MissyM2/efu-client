import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchGetTerms, fetchAddTerm} from '../actions/protected-data';
import {AddTermForm} from './add-term-form';
import {CourseList} from './course-list';
//import {SingleTerm} from './single-term';
import {EditBtns} from './edit-btns';

import './css/profile.css';

export class ProfileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profileSelectedTerm:'',
        };
        this.onClick = this.onClick.bind(this);

    }

    componentDidMount() {
        this.props.dispatch(fetchGetTerms());
    };


    fetchAddTerm(term) {
        this.props.dispatch(fetchAddTerm(term));
    }

    onClick(e) {
        e.preventDefault();
       this.setState({profileSelectedTerm: e.currentTarget.dataset.term});
    }



   // handleChange: function(evt) {

        //onclick, change the state to the 
    //    this.setState({profileSelectedTerm: e.currentTarget.dataset.course})
    //input was changed, update component state (or call parent method if child)
    //this.setState({changed: true});
//},

    render() {
        console.log('props term  is ', this.props.term);
        //console.log('profileSelectedTerm is ', this.state.profileSelectedTerm)


        const terms = this.props.termList.map((term, index) => 
        <li className="item" key={index}>
            <Link to={`/${term.termDesc}`}>
                <div className={this.state.profileSelectedTerm === term.termDesc ? 'item termDesc highlight': 'item termDesc'} data-term={term.termDesc} onClick={this.onClick}>{term.termDesc}</div>
                <div className="item edit-btns"><EditBtns type="term" /></div>
            </Link> 
        </li>
        );
        return (
            <div>
                <div>{this.state.profileSelectedTerm}</div>
                <div className="section">
                    <h3>{this.props.title}</h3>
                    <nav className="term-menu">
                        <ul className="list-horizontal">
                            {terms}
                        </ul>
                    </nav> 
                </div>
                <div className="section">
                    <AddTermForm
                        type="term"
                        onAdd={term => 
                            this.fetchAddTerm(term)}  />
                </div>
                <div className="section">
                    <CourseList term={this.state.profileSelectedTerm} />
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

   
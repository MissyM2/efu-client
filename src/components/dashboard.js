import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getCurrentDate} from '../utils';

import {fetchGetDeliverables} from '../actions/protected-data';

import TodayDeliverables from './today-deliverables';
import MainNav from './main-nav';
import {SingleDeliverable} from './single-deliverable';
import Suggestions from './suggestions';
//import ReviewLastWeek from './review-last-week';

import './css/index.css';
import './css/dashboard.css';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchGetDeliverables());
    }

    render() {
        console.log(getCurrentDate());
        const thisWeeksDeliverables = this.props.myWeekDeliverables.map((singledeliverable, index) =>
                        <li key={index}>
                                    <SingleDeliverable index={index} deliverable={singledeliverable} />
                        </li>
                );
        return (
                <div className="dashboard">
                    <div>
                            <MainNav />
                    </div>
                    <h2>{this.props.firstname}'s Dashboard</h2>
                    <h3> Your are working with {this.props.currentTerm} term and week number {this.props.currentWeek}</h3>
                    
                    <div className="skills-suggestion">
                        <Suggestions />
                    </div>
                    <div >
                        <h3>This Week's Deliverables, Week {this.props.currentWeek}</h3>
                        <TodayDeliverables />
                    </div>
                    <div> 
                        <h3>This Week's Deliverables, Week {this.props.currentWeek}</h3>
                        <ul className="generic-list">
                            {thisWeeksDeliverables}
                        </ul>
                    </div>
                    <div className="review-and-plan">
                        <h3>Review Last Week and Plan for Next Week</h3>
                        <Link to="/reviewlastweek">Review Last Week</Link>
                        <Link to="/plannextweek">Plan Next Week</Link>
                    </div>

                </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    const weekNum = state.protectedData.selectedWeek;
    const termDesc = state.protectedData.selectedTerm;
   // console.log('currentUser', currentUser);
   console.log('state', state.protectedData);
    return {
            currentWeek:weekNum,
            currentTerm: termDesc,
            user: currentUser,
            myWeekDeliverables: state.protectedData.deliverables.filter(deliverable =>{
                    return(deliverable.termDesc === termDesc && deliverable.weekNum === weekNum);
            }),
            myDayDeliverables: state.protectedData.deliverables.filter(deliverable => {
                return (deliverable.dueDate === "05/08/2019");
            }),
            firstname: currentUser.firstName
    };
    
};


export default requiresLogin()(connect(mapStateToProps)(Dashboard));
       
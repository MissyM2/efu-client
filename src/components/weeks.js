import React from 'react';

import { connect } from 'react-redux';

import {SingleWeek} from './single-week';

import {fetchGetWeeks} from '../actions/protected-data';

//import AddweekForm from './addweek-form';
//import {fetchAddweek} from '../actions/protected-data';



import './css/view-weeks.css';

export class Weeks extends React.Component {
        componentDidMount() {
                this.props.dispatch(fetchGetWeeks());
            }

        //fetchAddweek(week) {
    //    this.props.dispatch(fetchAddweek(week, this.props.index));
    //}

        render() {
                const weeks = this.props.weeks.map((singleweek, index) => 
                        <li key={index}>
                                <SingleWeek {...singleweek} />
                        </li>
                        );

                return (
                        <div className="weeks-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="weeks-list">
                                        {weeks}
                                {/*<li className="add-course-wrapper">
                                        <AddcourseForm
                                                type="course"
                                                onAdd={(course) => 
                                                this.fetchAddcourse(course)}  />
                                                </li>*/}
                                </ul>
                        </div>  
                );
        }
}

const mapStateToProps = state => {
        return {
                weeks: state.protectedData.weeks,
                title: "Your weeks"
        }
}

export default connect(mapStateToProps)(Weeks);

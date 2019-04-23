import React from 'react';
import {fetchGetWeeks} from '../actions/protected-data';
import { connect } from 'react-redux';

import './css/weeks.css';

export class Weeks extends React.Component {
        fetchGetWeeks(week) {
                this.props.dispatch(fetchGetWeeks(week, this.props.index));
        }

        render() {
                const weeks = this.props.weeks.map((week, index) => 
                        <li className="week-wrapper" key={index}>
                                <Weeks {...weeks} />
                        </li>
                        );

                return (
                        <div>
                                <h2>weeks</h2>
                                <h2>{this.props.title}</h2>
                                <ul className="weeks">
                                {weeks}
                                </ul>
                        </div>  
                        );
        }
}

Weeks.defaultProps = {
        title: ''
};

export default connect()(Weeks);

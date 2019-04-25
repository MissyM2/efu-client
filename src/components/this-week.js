import React from 'react';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'
import {connect} from 'react-redux';

import './css/this-week.css';

export class ThisWeek extends React.Component{
        componentDidMount() {
                this.props.dispatch(fetchGetDeliverables());
        }

        render() {
                const deliverables = this.props.deliverables.map((deliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
                                <SingleDeliverable {...deliverable} />
                        </li>
                        );
                return (
                        <div>
                                <h2>{this.props.title}</h2>
                                <ul className="deliverables">
                                        {deliverables}
                                </ul>
                        </div>  
                        );
        }
}

const mapStateToProps = props => {
        return {
                deliverables: props.deliverables,
                title: "these are the deliverables for this week"
        }
}

export default connect(mapStateToProps)(ThisWeek);
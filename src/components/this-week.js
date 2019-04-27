import React from 'react';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'
import {connect} from 'react-redux';

import './css/view-deliverables.css';

export class ThisWeek extends React.Component{
        componentDidMount() {
                this.props.dispatch(fetchGetDeliverables());
        }

        render() {
                const deliverables = this.props.deliverables.map((deliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
                                <SingleDeliverable index={index} {...deliverable} />
                        </li>
                        );
                return (
                        <div className="deliverables-wrapper">
                                <h2>{this.props.title}</h2>
                                <ul className="deliverables-list">
                                        {deliverables}
                                </ul>
                        </div>  
                        );
        }
}

const mapStateToProps = state => {
        return {
                deliverables: state.protectedData.deliverables,
                title: "Deliverables for this week"
        }
}

export default connect(mapStateToProps)(ThisWeek);
import React from 'react';
import {connect} from 'react-redux';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'

import './css/today.css';

export class Today extends React.Component {
        //componentDidMount() {
         //       this.props.dispatch(fetchProtectedData());
        //}
        fetchGetDeliverables(deliverable) {
                this.props.dispatch(fetchGetDeliverables(deliverable, this.props.index));
        }

        render() {
                const deliverables = this.props.deliverables.map((deliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
                                <SingleDeliverable {...deliverable} />
                        </li>
                        );
                
                return (
                        <div>
                                <h2>Today's Deliverables</h2>
                                <h2>{this.props.title}</h2>
                                <ul className="deliverables">
                                        {deliverables}
                                </ul>
                        </div>  
                );
                );
        }
}

Today.defaultProps = {
        title: ''
};

export default connect()(Today);
        
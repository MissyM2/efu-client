import React from 'react';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'
import {connect} from 'react-redux';

import './css/this-week.css';

export class ThisWeek extends React.Component{
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
                                <h2>deliverables</h2>
                                <h2>{this.props.title}</h2>
                                <ul className="deliverables">
                                        {deliverables}
                                </ul>
                        </div>  
                        );
        }
}

Deliverable.defaultProps = {
        title: ''
};

export default connect()(ThisWeek);
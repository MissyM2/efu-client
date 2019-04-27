import React from 'react';
import {connect} from 'react-redux';


import {SingleDeliverable} from './single-deliverable';

//import {fetchGetDeliverables} from '../actions/protected-data';

import './css/view-deliverables.css';

export class Today extends React.Component {
        render() {
               const deliverables = this.props.deliverables.map((singledeliverable, index) =>
                        <li className="singledeliverable-wrapper" key={index}>
                                <SingleDeliverable index={index} {...singledeliverable} />
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
                title: "Deliverables for Today"
        };
        
};

export default connect(mapStateToProps)(Today);
        
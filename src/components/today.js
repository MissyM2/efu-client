import React from 'react';
import {connect} from 'react-redux';


import {SingleDeliverable} from './single-deliverable';

import {fetchGetDeliverablesToday} from '../actions/protected-data';

import './css/view-deliverables.css';

export class Today extends React.Component {
       componentDidMount() {
               this.props.dispatch(fetchGetDeliverablesToday());    
        }
       
        render() {
               const deliverables = this.props.deliverables.map((singledeliverable, index) =>
                        <li className="deliverable-wrapper" key={index}>
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
        console.log(state);
        return {
                deliverables: state.protectedData.deliverables,
                title: "Deliverables for Today"
        };
        
};

export default connect(mapStateToProps)(Today);
        
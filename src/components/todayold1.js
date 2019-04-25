import React from 'react';
import {connect} from 'react-redux';
import {fetchGetDeliverables} from '../actions/protected-data';
import {SingleDeliverable} from './single-deliverable'

import './css/today.css';

export class Today extends React.Component {
       componentDidMount() {
               this.props.dispatch(fetchGetDeliverables());
               
        }
       
        render() {
                const {error, loading} = this.props;
               const deliverables = this.props.deliverables.map((singledeliverable, index) =>
                      <li className="deliverable-wrapper" key={index}>
                               <SingleDeliverable {...singledeliverable} />
                       </li>
               );
               if (error) {
                       return <div>Error! {error.message}</div>
               }

               if (loading) {
                       return <div>Loading...</div>
               }
                
                return (
                        <div>
                                <h2>{this.props.title}</h2>
                                <ul className="deliverables">
                                        {deliverables}
                                </ul>
                        </div>  

                                //<ul>
                                  //      {this.props.deliverables.map(deliverable =>
                                    //            <li key={deliverable.id}>{deliverable.deliverableName}</li>
                                     //           )}
                                      //  </ul> 
                        );
        }
}

const mapStateToProps = state => {
        console.log(state);
        return {
                deliverables: state.protectedData.deliverables,
                loading: state.protectedData.loading,
                error: state.protectedData.error
        };
        
};

export default connect(mapStateToProps)(Today);
        
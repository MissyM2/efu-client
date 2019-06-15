import React from 'react';
import './css/modal.css';

class ModalAddDeliverableComplete extends React.Component {

    render() {
        console.log('modal-delete-course, this.props', this.props);
        return (
            <div className="modal">
                    <header className="modal__header">Your deliverable has been added.</header>
                    <section className="modal__content">
                        <div className="message">
                            Would you like to add another?
                        </div>
                        <div className="content-sub-container action-links">
                            <button className="link navitem item blue-btn" onClick={this.props.addanother}>Add</button>
                            
                        </div>        
                    </section>
                    
            </div>

        )
    }
}

export default ModalAddDeliverableComplete;

import React from 'react';
import './css/modal.css';

export default class ModalDeleteCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen:true
        }
        this.cancelModal = this.cancelModal.bind(this);
    }

    cancelModal(e) {
        e.preventDefault();
       this.setState({
           modalOpen:false
       }, () => {
            this.props.setcoursedeletemodal(false);
       });
       
   }

    render() {
        return (
            <div className="modal">
                    <header className="modal__header">There are grades for this course</header>
                    <section className="modal__content">
                        <div className="message">
                            All GRADE and DELIVERABLE information for this course will be deleted if you delete this class.  Proceed with deletion?
                        </div>
                        <div className="content-sub-container action-links">
                            <button className="link navitem item blue-btn tenpx-bottom-margin" onClick={this.props.deletecoursedetails}>Delete</button>
                            <button className="link navitem item blue-btn tenpx-bottom-margin" onClick={this.cancelModal}>Cancel</button>
                        </div>        
                    </section>
                    
            </div>

        )
    }
}


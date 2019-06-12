import React from 'react';
import './css/modal.css';

class ModalDeleteCourse extends React.Component {

    render() {
        console.log('modal-delete-course, this.props', this.props);
        return (
            <div className="modal">
                    <header className="modal__header">There are grades for this course</header>
                    <section className="modal__content">
                        <div className="message">
                            All grade information for this course will be deleted if you delete this class.  Proceed with deletion?
                        </div>
                        <div className="content-sub-container action-links">
                            <button className="link navitem item blue-btn" onClick={this.props.deletecourse}>Delete</button>
                            <button className="link navitem item blue-btn" onClick={this.props.cancelcoursedelete}>Cancel</button>
                        </div>        
                    </section>
                    
            </div>

        )
    }
}

export default ModalDeleteCourse;

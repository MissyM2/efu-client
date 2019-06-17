import React from 'react';
import './css/modal.css';

class ModalDeleteCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen:true
        }
        this.cancelModal = this.cancelModal.bind(this);
    }

    cancelModal(e) {
        //debugger;
        e.preventDefault();
        console.log('cancelModal', this.state);
       this.setState({
           modalOpen:false
       }, () => {
           console.log('modalOPen')
        this.props.setcoursedeletemodal(false);
       });
       
   }

    render() {
        console.log('modal-delete-course, this.props', this.props);
        console.log('modal-deletecourse, this.state', this.state);
        return (
            <div className="modal">
                    <header className="modal__header">There are grades for this course</header>
                    <section className="modal__content">
                        <div className="message">
                            All grade information for this course will be deleted if you delete this class.  Proceed with deletion?
                        </div>
                        <div className="content-sub-container action-links">
                            <button className="link navitem item blue-btn" onClick={this.props.deletecoursedetails}>Delete</button>
                            <button className="link navitem item blue-btn" onClick={this.cancelModal}>Cancel</button>
                        </div>        
                    </section>
                    
            </div>

        )
    }
}

export default ModalDeleteCourse;

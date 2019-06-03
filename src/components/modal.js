import React from 'react';
import './css/modal.css';

import Term from './term';

class Modal extends React.Component {

    render() {

        const myterms = this.props.terms.map((term, index) => {
            return (
                <li key={index} >
                    <Term {...term} {...this.props} />
                </li>
            );
        });
        return (
            <div className="modal">
                    <header className="modal__header">{this.props.title}</header>
                    <section className="modal__content">
                        <ul className="modal-row term-list">
                            {myterms}
                        </ul>
                    </section>
                    
            </div>

        )
    }
}

export default Modal;

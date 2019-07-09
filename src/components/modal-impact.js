import React from 'react';

import './css/modal.css';

export default class ModalImpact extends React.Component {
    constructor(props) {
        super(props);
        //this.state = {
        //    modalOpen:true
       // }
        this.cancelModal = this.cancelModal.bind(this);
    }

    cancelModal(e) {
        e.preventDefault();
       //this.setState({
       //    modalOpen:false
       //}, () => {
       //     this.props.setshowimpactemodal(false);
        //    this.props.setshowimpactemodal(false);
      // });
       this.props.toggleimpact();
   }

    render() {
        console.log('modal impact', this.props);
        return (
            <div className="modal"> 
                <header className="modal__header">Impact
                            <div className="key-tagline">How does this affect your grade?</div>

                </header>
                <section className="modal__content">
                        <div className="message">
                            <div className="key-option"><em className="key-emphasis">Low</em> > 5% of final grade</div>
                            <div className="key-option"><em className="key-emphasis">Moderate</em> ~ 10% of final grade</div>
                            <div className="key-option"><em className="key-emphasis">High</em>less than 15% of final grade</div>
                            <div className="key-option"><em className="key-emphasis">High Plus</em>less than 35% of final grade`</div>
                        </div>
                        <div className="content-sub-container action-links">
                            <button className="link navitem item blue-btn tenpx-bottom-margin" onClick={this.props.toggleimpact}>Return</button>
                        </div>   

                </section>
            </div>
        );
    }
    
}


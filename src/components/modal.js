import React from 'react';
import './css/modal.css';

export default class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            termSelected: props.currentterm
        }
       this.setSelectedTerm = this.setSelectedTerm.bind(this);
    }

    setSelectedTerm(e) {
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
            this.props.setcurrentterm(this.state.termSelected);
            this.props.setPageFlags("Dashboard");
        });
    }

    render() {

        const allterms = this.props.terms.map((term, index) => {
            return (
                <option 
                    key={index}
                    value={term.termDesc}
                    data-identifier={term.termDesc}
                    onChange={this.setSelectedTerm}
                >
                    {term.termDesc}
                </option>
            );
        });
        return (
            <div className="modal">
                    <header className="modal__header">Term</header>
                    <section className="modal__content">
                        <div className="hundredpercent-width fivepx-margin">
                            <select
                                className="hundredpercent-width"
                                defaultValue={'DEFAULT'}
                                onChange={this.setSelectedTerm}
                                >
                                    <option value="DEFAULT" disabled>Select an Academic Term...</option> 
                                    {allterms}
                            </select>
                        </div>
                        
                            
                    </section>
                    
            </div>

        )
    }
}

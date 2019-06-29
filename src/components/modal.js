import React from 'react';
import './css/modal.css';

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            termSelected: props.currentterm
        }
       this.setSelectedTerm = this.setSelectedTerm.bind(this);
    }

/*
    componentDidMount() {
        this.setState({
            termSelected:this.props.currentterm
        })
        this.props.getcurrentterm(this.props.currentterm);
        console.log('profile: componentDidMount this.props.currentcourses', this.props.currentcourses);
    }
*/

    setSelectedTerm(e) {
        e.preventDefault();
        this.setState({
            termSelected: e.target.value
        }, () => {
            this.props.setcurrentterm(this.state.termSelected);

        });
    }

    render() {

        let termClasses = 'dropdown-large';
        // whatever term is in currentterm, the class should be selected
        if (this.props.currentterm === this.props.termDesc) {
            termClasses='dropdown-item selected';
        }

        const allterms = this.props.terms.map((term, index) => {
            return (
                <option 
                    key={index}
                    value={term.termDesc}
                    className={termClasses}
                    data-identifier={term.termDesc}
                    onChange={this.setSelectedTerm}
                >
                    {term.termDesc}
                </option>
            );
        });
        return (
            <div className="modal">
                    <header className="modal__header">{this.props.title}</header>
                    <section className="modal__content">
                        <select 
                            className="term-row dropdown-large" 
                            defaultValue={'DEFAULT'}
                            onChange={this.setSelectedTerm}
                            >
                                <option value="DEFAULT" disabled>Select an Academic Term...</option> 
                                {allterms}
                        </select>
                            
                    </section>
                    
            </div>

        )
    }
}

export default Modal;

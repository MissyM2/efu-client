import React from 'react';
import {Link} from 'react-router-dom';

import './css/add-form.css';

export class AddTermForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const term = this.textInput.value.trim();
        if (term && this.props.onAdd) {
            this.props.onAdd(term);
        }
        this.textInput.value = '';
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }


    
    render() {
       if (!this.state.editing) {
           return (
               <div className="add-button"
                onClick={() => this.setEditing(true)}>
                    <Link to= '#'>Add a {this.props.type}...</Link>
               </div>
           );
       }

        return (
            <form className="term add-form" onSubmit={e => this.onSubmit(e)}>
                    <input type="text" ref={input => this.textInput = input} />
                    <button type="submit">Add Term</button>
                    <button type="button" onClick={() => this.setEditing(false)}>
                       Cancel
                    </button>
            </form>
        );

    }
    
}

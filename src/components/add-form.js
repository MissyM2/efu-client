import React from 'react';

import './css/add-form.css';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: ''
        }
    }


 
    onSubmit(e) {
        e.preventDefault();
        const text = this.state.text;
        let newcourse = {
            termDesc: this.props.currentterm,
            courseName:text
        }
        this.setText('');
        this.setEditing(false);
            this.props.submitaddcourse(newcourse);
           // this.props.generateweeksforterm(this.props.currentterm);
           // this.props.getcurrentweeks();

           // this.props.generategradesforcourse(this.props.currentterm, this.state.text);
    }

    setText(text) {
        this.setState({
            text
        });
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        if (!this.state.editing) {
            const text = `Add a ${this.props.type}`;
            return (
                <div className="btn add-form"
                        onClick={(e) => {
                            e.preventDefault();
                            this.setEditing(true)
                        }}>
                        <a href="#">{text}...</a>
                </div>
            );
        }
        const label = `Enter a ${this.props.type}`;
        return (
            <form className='add-form course' onSubmit={(e) => this.onSubmit(e)} >
                <div>Add Your Course</div>
                <div>
                    <input
                        className="course-input"
                        type="text"
                        value = {this.state.text}
                        onChange = {e => this.setText(e.target.value)}
                        aria-label={label}
                    />
                </div>
                <div>
                    <button className="btn add-btn">Add </button>
                    <button className="btn cancel-btn" type="button" onClick={() => this.setEditing(false)}>
                        Cancel
                    </button>    

                </div>
            </form>
        );
    }

}
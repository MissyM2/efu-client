import React from 'react';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }
    }


 
    onSubmit(e) {
       
        e.preventDefault();
        console.log('am i making it to onsubmit?');
        const text =this.textInput.value.trim();
        if(this.props.type === 'term') {
            let newTerm = {
                termDesc:text
            }
            this.props.submitAddTerm(newTerm);
        } else if(this.props.type === 'course') {
            console.log('inside onSubmit', this.props);
            let newCourse = {
                termDesc: this.props.currentterm,
                courseName:text
            }
            this.props.submitAddCourse(newCourse);
        } else if(this.props.type === 'week') {
        console.log('inside onSubmit', this.props);
        let newWeek = {
            termDesc: this.props.currentterm,
            weekNum:text
        }
        this.props.submitAddWeek(newWeek);
        }
        //TODO:  add the term, course or week
        this.textInput.value="";
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
                <div className="add-button"
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
            <form className="course add-form" onSubmit={(e) => this.onSubmit(e)} >
                <input 
                    type="text"
                    ref={input => this.textInput = input}
                    aria-label={label}
                />
                <button>Add </button>
                <button type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>      

            </form>
        );
    }

}
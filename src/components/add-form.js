import React from 'react';

export default class AddForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            text: ''
        }
    }


 
    onSubmit(e) {
        console.log('right after onSumbit', this.props);
        e.preventDefault();
        const text = this.state.text;
        if(this.props.type === 'term') {
            let newterm = {
                termDesc:text
            }
            this.props.submitaddterm(newterm);

        } else if(this.props.type === 'course') {
            let newcourse = {
                termDesc: this.props.currentterm,
                courseName:text
            }
            this.props.submitaddcourse(newcourse);

        } else if(this.props.type === 'week') {
        let newweek = {
            termDesc: this.props.currentterm,
            weekNum:text
        }
        console.log('newweek', newweek);
        console.log('this.props', this.props);
        debugger;

        this.props.submitaddweek(newweek);
        }
        this.setState({
            text: ""
        })
        this.setEditing(false);
        
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
        console.log('add-form, lthis.props', this.props);
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
            <form className="course add-form" onSubmit={(e) => this.onSubmit(e)} >
                <input 
                    type="text"
                    value = {this.state.text}
                    onChange = {e => this.setText(e.target.value)}
                    aria-label={label}
                />
                <button className="btn">Add </button>
                <button className="btn" type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>      

            </form>
        );
    }

}
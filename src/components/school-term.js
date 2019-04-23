import React from 'react';
import AddschooltermForm from './addschoolterm-form';
import {connect} from 'react-redux';

import './css/school-term.css';

export class SchoolTerm extends React.Component {
    render() {
        const schoolterms = this.props.schoolterms.map((schoolterm, index) => 
        <li className="schoolterm-wrapper" key={index}>
            <Schoolterm {...termcourse} />
        </li>
        );

        return (
        <div>
                    <h2>schoolterm-form</h2>
                    <h2>{this.props.title}</h2>
                    <ul className="schoolterms">
                        {schoolterms}
                        <li className="add-term-wrapper">
                            <AddschooltermForm
                                type="schoolterm"
                                onAdd={schoolTermName =>
                                    this.addSchoolTerm(schoolTermName)} />
                        </li>
                    </ul>
            </div>
        );
    }
}

Schoolterm.defaultProps = {
    title: ''
};

export default connect()(SchoolTerm);
                
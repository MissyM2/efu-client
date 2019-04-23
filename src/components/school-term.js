import React from 'react';
import AddschooltermForm from './addschoolterm-form';
import {fetchAddSchoolterm} from '../actions/protected-data';

import {connect} from 'react-redux';

import './css/school-term.css';

export class SchoolTerm extends React.Component {
    fetchAddSchoolterm(schoolterm) {
        this.props.dispatch(fetchAddSchoolterm((schoolterm), this.props.index));
    }
    render() {
        const schoolterms = this.props.schoolterms.map((schoolterm, index) => 
        <li className="schoolterm-wrapper" key={index}>
            <SchoolTerm {...schoolterm} />
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
                                onAdd={schoolterm =>
                                    this.fetchAddSchoolterm(schoolterm)} />
                        </li>
                    </ul>
            </div>
        );
    }
}

SchoolTerm.defaultProps = {
    title: ''
};

export default connect()(SchoolTerm);
                
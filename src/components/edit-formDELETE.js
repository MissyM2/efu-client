import React from 'react';
import './css/edit-btns.css';

export function EditForm(props) {
    console.log('Editform props', this.props);
    return (
                <div className="edit-btns">
                    <div className="btn update-btn"><i className="far fa-edit"></i></div>
                    <div className="btn delete-btn"><i className="far fa-trash-alt"></i></div>
                    {/*<button type="button" className="btn update-btn">update</button>
                    <button type="button" className="btn delete-btn">delete</button>*/}
                </div>

            );

}

export default (EditForm);
import React from 'react';
import './css/edit-btns.css';

export function EditForm(props) {
    console.log('Editform props', this.props);
    return (
                <div className="edit-btns">
                    <div className="edit-btn update-btn"><i className="far fa-edit"></i></div>
                    <div className="edit-btn delete-btn"><i className="far fa-trash-alt"></i></div>
                    {/*<button type="button" className="edit-btn update-btn">update</button>
                    <button type="button" className="edit-btn delete-btn">delete</button>*/}
                </div>

            );

}

export default (EditForm);
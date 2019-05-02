import React from 'react';

import './css/edit-btns.css';

export function EditBtns(props) {
    return (
                <div className="edit-btns">
                    <button type="button" className="edit-btn update-btn">update</button>
                    <button type="button" className="edit-btn delete-btn">delete</button>
                </div>

            );

}

export default (EditBtns);
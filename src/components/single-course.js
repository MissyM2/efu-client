import React from 'react';

import './css/view-profile.css';

export function SingleCourse(props) {
    return (
            <div className="single-course">
                <div className="item-data courseName">{props.courseName}</div>
                <div className="edit-btns">
                    <button type="button" className="edit-btn course-update-btn">update</button>
                    <button type="button" className="edit-btn course-delete-btn">delete</button>
                    </div>
            </div>  
            );

}

export default (SingleCourse);
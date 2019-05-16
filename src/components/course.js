import React from 'react';

export default function Course(props) {
    //console.log('this.props', props);

    return ( 
    <div>
       <p>{props.courseName}</p>
    </div>
    );
}
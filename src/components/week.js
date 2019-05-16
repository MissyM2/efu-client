import React from 'react';

export default function Week(props) {
    //console.log('this.props', props);

    return ( 
    <div className="list-horizontal">
       <p className="item">{props.weekNum}</p>
       <p className="item">{props.termDesc}</p>
       <p className="item">{props.likedLeast}</p>
       <p className="item">{props.likedMost}</p>
       <p className="item">{props.mostDifficult}</p>
       <p className="item">{props.leastDifficult}</p>
    </div>
    );
}
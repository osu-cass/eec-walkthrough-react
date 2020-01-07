import React, {useState} from 'react';

const BulletPoint = (props) => {
    return (
        <p>
            <i className={`fas fa-${props.icon} text-dark`}></i>
            {props.text}
        </p>
    );
}

export default BulletPoint;


import React, {useState} from 'react';
import Edit from './Edit';
import BulletPoint from './BulletPoint';

const Card = (props) => {
    return (
        <div id={props.category} className='my-3 p-3 bg-white card rounded shadow-sm'>
            <div id='header' className='d-flex justify-content-between border-bottom border-gray pb-2'>
                <h5>{props.category}</h5>
                <Edit />
            </div>
            <div className='mt-2'>
            {
                (props.description).map((desc, i) => {
                    return(
                        <div>
                            <BulletPoint
                                icon={props.icon}
                                text={desc}
                            />
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
}

export default Card;


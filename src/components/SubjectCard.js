import React, {useState} from 'react';
import Card from './Card';
import './SubjectCard.css';

function hideCard(e){

}

const SubjectCard = (props) => {
    return (
        <div className='d-flex justify-content-between p-3 my-3 text-dark-50 bg-white rounded shadow'>
        <h4 className='flex-grow-1'>{props.subject}</h4>
            <span className='mr-5 mt-1 icons' onClick={(event) => hideCard(event.target.getAttribute('value'))}>
                <i id='plus-filter' className={`fas fa-plus text-dark mr-3`} value="Pros"></i>
                <i id='minus-filter' className={`fas fa-minus text-dark mr-3`} value="Cons"></i>
                <i id='thumbs-up-filter' className={`fas fa-thumbs-up text-dark mr-3`} value="Rules of Thumb"></i>
                <i id='image-filter' className={`fas fa-image text-dark mr-3`} value="Images"></i>
                <i id='ruler-filter' className={`fas fa-ruler text-dark mr-3`} value="Figures"></i>
                <i id='reset' className={`fas fa-reset text-dark mr-3`} value="reset"></i>
            </span>
        </div>
    );
}

export default SubjectCard;

      
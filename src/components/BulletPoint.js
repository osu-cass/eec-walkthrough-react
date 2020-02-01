import React, { useState } from 'react'

const BulletPoint = props => {
  return (
    <div className='mb-3'>
      <i className={`fas fa-${props.icon} text-dark mr-2`}></i>
			{props.text}
			<div className='pl-5 mt-3'>{props.children}</div>
    </div>
  )
}

export default BulletPoint

import React, { Fragment } from 'react'
import Image from './Image'
import './BulletPoint.css'
import Col from 'react-bootstrap/Col';

function styleText(icon) {
	if (icon === 'check-square')
		return 'font-weight-bold';
	if (icon === 'flag')
		return 'font-italic mt-4';	//break between every flag icon
	if (icon === 'opportunity-desc')
		return 'opportunity-desc';
}

function isBold(bold) {
	if (bold)
		return 'font-weight-bold';
}

function addColor(child) {
	if (child)
		return 'text-child';
}

function filter(check) {
	if (check)
		return 'hide';
	else return 'active';
}


const BulletPoint = props => {
	return (
		<div key={props.id} className={`mb-2 ${filter(props.hide)}`}>
			<i className={`fas fa-${props.icon} ${addColor(props.child)} mr-2 ${styleText(props.icon)} `}></i>
			<span className={styleText(props.icon) || isBold(props.bold)}>
				{props.text}
			</span>
			{props.url ?
				<Fragment>
					{props.label}
					<Image url={props.url} header={props.text} />
				</Fragment>
				: ""}
			<div className='pl-5 mt-2'>{props.children}</div>
		</div >
	)
}

export default BulletPoint

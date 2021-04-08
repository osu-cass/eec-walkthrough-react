import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import BulletPointItem from './BulletPointItem'
import BulletPointGraphic from './BulletPointGraphic'
import BulletPointResource from './BulletPointResource'
import BulletPointText from './BulletPointText'
import './BulletPoint.css'

// Represents a single bullet point inside a card
function BulletPoint(props) {
	// set item selected state in create training mode (mode === 3)
	const [selected, setSelected] = useState(false)
	const [openAnnotation, setOpenAnnotation] = useState(false)
	const [annotationInput, setAnnotationInput] = useState('')
	const [annotationAdded, setAnnotationAdded] = useState(false)

	const handleSelect = e => {
		if (selected) {
			setSelected(false)
			setOpenAnnotation(false)
			setAnnotationInput('')
		} else {
			setSelected(true)
		}
	}
	const handleAnnotationClicked = e => {
		setOpenAnnotation(!openAnnotation)
	}

	const handleOnAccept = () => {
		console.log("You've added annotion: ", annotationInput)
		setAnnotationAdded(true)
	}

	const handleOnCancel = () => {
		setAnnotationInput('')
		setOpenAnnotation(false)
	}

	// Don't show bullet points that are internal when we are viewing in public mode
	return !props.internal || !props.publicMode ? (
		<div
			className={`
    ${props.mode === 3 && selected === false ? 'grayed-out' : ''}
    
    `}
		>
			{/* If the bullet point is an item */}
			{props.groupIndex === 1 && props.icon !== 'font' ? (
				<BulletPointItem
					id={props.id}
					text={props.text}
					icon={props.icon}
					indentation={props.indentation}
					mode={props.mode}
					color={props.color}
					tooltip={props.tooltip}
					setCheck={(state, id) => props.setCheck(state, id)}
					checked={props.checked}
					highlightStyle={props.highlightStyle}
					internal={props.internal}
					source={props.source}
					sourceText={props.sourceText}
					inline={props.inline}
					onSelect={handleSelect}
					selected={selected}
					onAnnotationClicked={handleAnnotationClicked}
				/>
			) : null}
			{/* If the bullet point is a text field */}
			{props.groupIndex === 1 && props.icon === 'font' ? (
				<BulletPointText
					id={props.id}
					text={props.text}
					mode={props.mode}
					indentation={props.indentation}
					highlightStyle={props.highlightStyle}
					internal={props.internal}
					inline={props.inline}
					source={props.source}
					sourceText={props.sourceText}
				/>
			) : null}
			{/* If the bullet point is a graphic */}
			{props.groupIndex === 2 ? (
				<BulletPointGraphic
					text={props.text}
					label={props.label}
					url={props.url}
					icon={props.icon}
					indentation={props.indentation}
					mode={props.mode}
					color={props.color}
					tooltip={props.tooltip}
					highlightStyle={props.highlightStyle}
					internal={props.internal}
					source={props.source}
					sourceText={props.sourceText}
					inline={props.inline}
				/>
			) : null}
			{/* If the bullet point is a resource */}
			{props.groupIndex === 3 ? (
				<BulletPointResource
					id={props.id}
					text={props.text}
					label={props.label}
					url={props.url}
					icon={props.icon}
					created={props.created}
					indentation={props.indentation}
					mode={props.mode}
					contentMode={props.contentMode}
					handleTimestamp={m => props.handleTimestamp(m)}
					color={props.color}
					tooltip={props.tooltip}
					reviewing={props.reviewing}
					highlightStyle={props.highlightStyle}
					internal={props.internal}
					inline={props.inline}
				/>
			) : null}
			{props.mode === 3 && openAnnotation === true && (
				<form
					className="annotation-container"
					onSubmit={e => {
						e.preventDefault()
					}}
				>
					<input
						type="search"
						placeholder="Enter annotation"
						value={annotationInput}
						onChange={e => {
							setAnnotationInput(e.target.value)
						}}
					/>
					<button type="submit" className="btn-accept" onClick={handleOnAccept}>
						Add
					</button>
					<button className="btn-cancel" onClick={handleOnCancel}>
						Cancel
					</button>
				</form>
			)}
		</div>
	) : null
}
export default BulletPoint

BulletPoint.propTypes = {
	id: PropTypes.number,
	text: PropTypes.string,
	label: PropTypes.string,
	url: PropTypes.string,
	icon: PropTypes.string,
	created: PropTypes.string,
	indentation: PropTypes.number,
	mode: PropTypes.number,
	publicMode: PropTypes.number,
	contentMode: PropTypes.number,
	handleTimestamp: PropTypes.func,
	color: PropTypes.string,
	tooltip: PropTypes.string,
	reviewing: PropTypes.bool,
	setCheck: PropTypes.func,
	checked: PropTypes.bool,
	highlightStyle: PropTypes.number,
	internal: PropTypes.number,
	source: PropTypes.number,
	sourceText: PropTypes.string,
	inline: PropTypes.number,
	groupIndex: PropTypes.number
}

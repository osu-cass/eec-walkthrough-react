import React from 'react'
import { BiCommentDots } from 'react-icons/bi'

function CommentIcon({ onAnnotationClicked }) {
	return (
		<span className="comment-icon" onClick={onAnnotationClicked}>
			<BiCommentDots />
		</span>
	)
}

export default CommentIcon

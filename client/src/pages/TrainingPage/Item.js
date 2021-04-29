/* eslint-disable */

import React from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
	margin-bottom: 0.5rem;
`

const Content = styled.div``

const Annotation = styled.div`
	font-size: 0.9rem;
	margin-left: 2rem;
`

function Item({annotation, indentation, contentText, contentUrl, contentLabel, sourceId, inline, iconTypeKeyword, iconTypeName, iconColor, iconGroupIndex, iconType}) {
	return (
		<Container>
			<Content>
			{contentText}
			</Content>
			<Annotation>
				{annotation}
			</Annotation>
		</Container>
	)
}

export default Item

/* eslint-disable */

import React from 'react'
import styled from '@emotion/styled'

const Annotation = styled.div`
	font-size: 0.9rem;
	margin-left: 1.9rem;
`

function Item({
	annotation,
	indentation,
	contentText,
	contentUrl,
	contentLabel,
	sourceId,
	inline,
	iconTypeKeyword,
	iconTypeName,
	iconColor,
	iconGroupIndex,
	iconType
}) {
	const Icon = styled.i`
		margin-right: 0.5rem;
		font-size: ${iconTypeName == 'circle' && '0.75rem'};
		width: 20px;
		&&[title] {
			color: ${iconColor};
		}
	`

	const Container = styled.div`
		margin-bottom: 0.2rem;
		padding-left: ${indentation === 1 && '2rem'};
		padding-left: ${indentation === 2 && '4rem'};
	`
	const Content = styled.p`
		margin: 0;
		display: flex;
		align-items: center;
	`
	return (
		<Container>
			<Content>
				<Icon className={`fas fa-${iconTypeName}`} title={iconTypeKeyword} />
				<span>{contentText}</span>
			</Content>
			<Annotation>{annotation}</Annotation>
		</Container>
	)
}

export default Item

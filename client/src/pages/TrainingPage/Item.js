/* eslint-disable */

import React from 'react'
import styled from '@emotion/styled'
import Sanitized from '../../components/General/Sanitized'
import { ITEM_TYPE, CONTENT_MODE } from '../../utilities/constants'

const Annotation = styled.p`
	margin: 0;
	font-size: 0.9rem;
	font-style: italic;
`

function Item({
	annotation,
	indentation,
	contentText,
	contentUrl,
	contentLabel,
	contentMode,
	sourceId,
	inline,
	iconTypeKeyword,
	iconTypeName,
	iconColor,
	iconGroupIndex,
	orderIndex,
	iconType
}) {
	const Icon = styled.i`
		margin-right: 0.5rem;
		margin-top: 0.25rem;
		font-size: ${iconTypeName == 'circle' && '0.75rem'};
		width: 18px;
		&&[title] {
			color: ${iconColor};
		}
	`

	const Container = styled.div`
		margin-bottom: 0.3rem;
		display: flex;
		align-items: flex-start;

		padding-left: ${indentation === 1 && '2rem'};
		padding-left: ${indentation === 2 && '4rem'};
		/* a:hover {
			filter: brightness(0.8);
		} */
	`
	const ContentContainer = styled.div``

	const Content = styled.p`
		margin: 0;
	`

	const GeneralItem = () => (
		<Container>
			<Icon className={`fas fa-${iconTypeName}`} title={iconTypeKeyword} />
			<ContentContainer>
				<Content>
					<Sanitized html={contentText} inline={!!inline} />
				</Content>
				<Annotation>{annotation}</Annotation>
			</ContentContainer>
		</Container>
	)

	const ResourceItem = () => (
		<Container>
			<Icon className={`fas fa-${iconTypeName}`} title={iconTypeKeyword} />
			<ContentContainer>
				<a
					href={contentUrl}
					className={`font-weight-bold ${
						contentMode === CONTENT_MODE.INTERNAL ||
						contentMode === CONTENT_MODE.INTERNAL_DOWNLOAD
							? 'osu-link'
							: 'text-primary'
					}`}
					target="_blank"
				>
					<p className="font-weight-bold" style={{ margin: 0 }}>
						{contentLabel}
					</p>
				</a>
				<a
					href={contentUrl}
					className={`${
						contentMode === CONTENT_MODE.INTERNAL ||
						contentMode === CONTENT_MODE.INTERNAL_DOWNLOAD
							? 'osu-link'
							: 'text-primary'
					}`}
					target="_blank"
				>
					<small>
						<Sanitized html={contentText} inline={!!inline} />
					</small>
				</a>
				<Annotation>{annotation}</Annotation>
			</ContentContainer>
		</Container>
	)

	const TextItem = () => (
		<Container>
			
			<ContentContainer>
				<Content>
					<Sanitized html={contentText} inline={!!inline} />
				</Content>
				<Annotation>{annotation}</Annotation>
			</ContentContainer>
		</Container>
	)

	return (
		<div>
			{iconGroupIndex === ITEM_TYPE.GENERAL && iconTypeName !== 'font' && (
				<GeneralItem />
			)}
			{iconGroupIndex === ITEM_TYPE.GENERAL && iconTypeName === 'font' && (
				<TextItem />
			)}
			{iconGroupIndex === ITEM_TYPE.RESOURCE && <ResourceItem />}
			{/* {iconGroupIndex === ITEM_TYPE.GRAPHIC && <GraphicItem />} */}
		</div>
	)
}

export default Item

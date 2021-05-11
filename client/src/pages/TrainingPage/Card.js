/* eslint-disable */

import React from 'react'
import styled from '@emotion/styled'
import { Card as CardBS } from 'react-bootstrap'
import Item from './Item'

const ListContainer = styled.ul`
	list-style: none;
`

const Container = styled(CardBS)``
const Body = styled(CardBS.Body)``

const Header = styled(CardBS.Header)`
	background-color: #f7f7f7;
`

function Card({ title, items }) {
	return (
		<Container className="my-2 shadow-sm">
			<Header className="card-header-bar d-flex justify-content-between border-bottom py-2 px-3 border-gray font-weight-bold">
				{title}
			</Header>
			<Body>
				<ListContainer>
					{items.map(item => (
						<li key={item.id}>
							<Item
								annotation={item.annotation}
								contentLabel={item.contentLabel}
								contentUrl={item.contentUrl}
								contentText={item.contentText}
								contentMode={item.contentMode}
								iconTypeName={item.iconTypeName}
								iconTypeKeyword={item.iconTypeKeyword}
								iconColor={item.iconColor}
								iconType={item.iconType}
								iconGroupIndex={item.iconGroupIndex}
								id={item.id}
								indentation={item.indentation}
								inline={item.inline}
							/>
						</li>
					))}
				</ListContainer>
			</Body>
		</Container>
	)
}

export default Card

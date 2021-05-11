/* eslint-disable */

import React from 'react'
import '../ContentPage/Header/Header.css'
import styled from '@emotion/styled'
import Card from './Card'

const Container = styled.div``

const ListContainer = styled.ul`
	list-style: none;
	padding: 0;
`

function Section({ title, cards }) {
	return (
		<Container>
			<div
				className="header-container header-approved my-3 py-3 text-dark-50 rounded shadow-sm border"
				style={{ zIndex: 10 }}
			>
				<h4 className="font-weight-bold col-auto align-self-center">{title}</h4>
			</div>
			<ListContainer>
				{cards.map(card => (
					<li key={card.id}>
						<Card title={card.title} items={card.items} />
					</li>
				))}
			</ListContainer>
		</Container>
	)
}

export default Section

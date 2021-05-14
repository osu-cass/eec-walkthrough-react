/* eslint-disable */
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import { API_URL, MODE, ROLE } from '../../utilities/constants'
import LoadingOverlay from '../../components/General/LoadingOverlay'
import Section from './Section'
import Container from 'react-bootstrap/Container'
import { getProfile } from '../../utilities/cookieAuth'
import { setMode } from '../../utilities/pageMode'

const PageHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
`

const PageTitle = styled.h1``

const EditBtnLink = styled(Link)`
	margin-top: 1rem;
	padding: 0.3rem 2rem;
	color: #333;
`

const PageDescription = styled.div``

const ErrorContainer = styled.div`
	color: red;
`

const Sections = styled.ul`
	list-style-type: none;
	padding-left: 0;
`

function TrainingPage() {
	const { pageId } = useParams()
	const [pageContent, setPageContent] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState('')
	const { role } = getProfile()
	console.log(`role is: ${role}`)
	const fetchData = async () => {
		const response = await (
			await fetch(`${API_URL}/training/${pageId}`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			})
		).json()
		if (response.error) {
			setError(response.error)
		} else {
			setPageContent(response)
		}
		setLoading(false)
	}

	const handleEditBtnClicked = e => {
		e.preventDefault()
	}
	const SOURCE_PAGE_PATH = `/wiki/${pageContent.category}/${pageContent.sourcePageId}`

	useEffect(() => {
		// fetch all content of this training page
		fetchData()
	}, [])

	if (loading) {
		return (
			<Container>
				<LoadingOverlay loading={true} />
			</Container>
		)
	} else if (error) {
		return (
			<Container>
				<ErrorContainer>{error}</ErrorContainer>
			</Container>
		)
	} else {
		return (
			<Container className="container my-5">
				{console.log(pageContent)}
				<PageHeaderContainer>
					<PageTitle>{pageContent.pageTitle}</PageTitle>
					{role === ROLE.ADMIN && (
						<EditBtnLink to={SOURCE_PAGE_PATH} className="btn btn-warning" onClick={
							setMode(MODE.CREATE_TRAINING)
						}>
							Edit
						</EditBtnLink>
					)}
				</PageHeaderContainer>
				<PageDescription>{pageContent.description}</PageDescription>
				<Sections>
					{pageContent.sections.map(section => (
						<li key={section.id}>
							<Section
								id={section.id}
								title={section.title}
								cards={section.cards}
								role={role}
							/>
						</li>
					))}
				</Sections>
			</Container>
		)
	}
}

export default TrainingPage

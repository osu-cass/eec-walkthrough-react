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
	/* justify-content: space-between; */
	align-items: center;
`

const PageTitle = styled.h1`
	flex: 1;
`

const NewBtnLink = styled(Link)`
	padding: 0.3rem 1rem;
`

const DeleteBtn = styled(Link)`
	padding: 0.3rem 1rem;
	margin-left: 0.5rem;
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
	const SOURCE_PAGE_PATH = `/wiki/${pageContent.category}/${pageContent.sourcePageId}`

	const handleEditBtnClicked = e => {
		setMode(MODE.CREATE_TRAINING)
		window.localStorage.setItem('trainingPageId', pageContent.pageId)
	}

	const handleDelete = async e => {
		const response = await fetch(`${API_URL}/training/${pageId}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-Type': 'application/json' }
		}).json()
		alert(response.status)
		console.log(response)

	}

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
						<>
							<NewBtnLink
								to={SOURCE_PAGE_PATH}
								className="btn btn-primary"
								onClick={handleEditBtnClicked}
							>
								New Path
							</NewBtnLink>
							<DeleteBtn
								to={SOURCE_PAGE_PATH}
								className="btn btn-danger"
								onClick={handleDelete}
							>
								Delete
							</DeleteBtn>
						</>
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

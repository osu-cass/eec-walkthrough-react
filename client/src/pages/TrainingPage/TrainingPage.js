/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '../../utilities/constants';
import LoadingOverlay from '../../components/General/LoadingOverlay';
import Section from './Section';
import Container from 'react-bootstrap/Container';

const PageTitle = styled.h1``;

const ErrorContainer = styled.div`
	color: red;
`;

const Sections = styled.ul`
	list-style-type: none;
`;

function TrainingPage() {
	const { pageId } = useParams();
	const [pageContent, setPageContent] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchData = async () => {
		const response = await (
			await fetch(`${API_URL}/training/${pageId}`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			})
		).json();
		if (response.error) {
			setError(response.error);
		} else {
			setPageContent(response);
		}
		setLoading(false);
	};

	useEffect(() => {
		// fetch all content of this training page
		fetchData();
	}, []);

	if (loading) {
		return (
			<Container>
				<LoadingOverlay loading={true} />
			</Container>
		);
	} else if (error) {
		return (
			<Container>
				<ErrorContainer>{error}</ErrorContainer>
			</Container>
		);
	} else {
		return (
			<Container className="container my-5">
				<PageTitle>Training Page: {pageContent.pageTitle}</PageTitle>
				{console.log(pageContent)}
				<Sections>
					{pageContent.sections.map(section => (
						<li key={section.id}>
							<Section
								id={section.id}
								title={section.title}
								cards={section.cards}
							/>
						</li>
					))}
				</Sections>
			</Container>
		);
	}
}

export default TrainingPage;

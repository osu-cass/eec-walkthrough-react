/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '../../utilities/constants';
import LoadingOverlay from '../../components/General/LoadingOverlay';
import Section from './Section'
import Container from "react-bootstrap/Container";


const PageTitle = styled.h1`

`;

const ErrorContainer = styled.div`
	color: red;
`;

function TrainingPage() {
	const { pageId } = useParams();
	const [sectionList, setSectionList] = useState({});
	const [pageInfo, setPageInfo] = useState({});
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
		setLoading(false)
		if (response.error) {
			setError(response.error);
		} else {
			setPageInfo({ pageId: response.pageId, pageTitle: response.pageTitle });
			setSectionList(response.itemList);
		}

		console.log(response);
	};

	useEffect(() => {
		// fetch all content of this training page
		fetchData();
	}, []);

	return (
		<Container className="container my-5">
			{loading ? (
				<LoadingOverlay loading={true}/>
			) : (
				<>
					{error ? (
						<ErrorContainer>{error}</ErrorContainer>
					) : (
						<>
						<PageTitle>Training Page: {pageInfo.pageTitle}</PageTitle>
						<ul>
							{sectionList.map(section => <li key={section.headerId}>
								<Section props={section}/>
							</li>)}

						</ul>
						</>
					)}
				</>
			)}
		</Container>
	);
}

export default TrainingPage;

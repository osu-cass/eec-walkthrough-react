/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { API_URL } from '../../utilities/constants';
import LoadingOverlay from '../../components/General/LoadingOverlay';

const Container = styled.div``;

const ErrorContainer = styled.div`
	color: red;
`;

function TrainingPage() {
	const { pageId } = useParams();
	const [pageContent, setPageContent] = useState({});
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
			setPageInfo({ pageId: response.pageId, pageName: response.pageName });
			setPageContent(response.itemList);
		}

		console.log(response);
	};

	useEffect(() => {
		// fetch all content of this training page
		fetchData();
	}, []);

	return (
		<Container>
			{loading ? (
				<LoadingOverlay loading={true}/>
			) : (
				<>
					{error ? (
						<ErrorContainer>{error}</ErrorContainer>
					) : (
						<>this is training page id {pageId}</>
					)}
				</>
			)}
		</Container>
	);
}

export default TrainingPage;

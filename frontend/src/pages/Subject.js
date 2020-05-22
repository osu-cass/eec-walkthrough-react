import React, { Fragment } from 'react'
import SubjectCard from '../components/SubjectCard'
import SubjectIntro from '../components/SubjectIntro'
import CardContainer from '../components/CardContainer'
import FigureContainer from '../components/FigureContainer'
import FilterBar from '../components/FilterBar'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import Container from 'react-bootstrap/Container'
import '../components/Subject.css'

class Subject extends React.Component {
	state = {
		sidebarOpen: false,
		pageInfo: [],
		subjectInfo: [],
		headers: [],
		cards: []
	}

	async componentDidMount() {
		const response = await this.fetchData(); //Get data about this subject (subject info, categories, figures)
		this.setState({ headers: this.state.pageInfo.headers });
		console.log(this.state.headers);
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.pageId !== prevProps.match.params.pageId) { //Reload state when switching between subjects
			await this.fetchData();
			await this.setState({ headers: this.state.pageInfo.headers });
		}
	}

	async fetchData() {
		this.setState({ cards: [], headers: [] }); //reset state for page load
		fetch(`/pages/${this.props.pageId}`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(subjectInfo => this.setState({ subjectInfo }))
		await fetch(`/pages/${this.props.pageId}/all`)	//give each category a hidden value to handle filter
			.then(res => res.json())
			.then(pageInfo => this.setState({ pageInfo }))
		// fetch(`/figures/${this.props.id}`)	//subject info (summary, name, img, description)
		// 	.then(res => res.json())
		// 	.then(figures => this.setState({ figures }));
		// fetch(`/tidbits/types`)	//subject info (summary, name, img, description)
		// 	.then(res => res.json())
		// 	.then(tidbitTypes => this.setState({ tidbitTypes }))
	}

	handleFilter = (id) => {
		let categories = [...this.state.categories] //Create copy of object, update object, set state with new copy
		var i;
		for (i = 0; i < categories.length; i++) {
			if (categories[i].CategoryID === id) {
				categories[i].hidden = !categories[i].hidden //Update object and change hidden to opposite
			}
		}
		this.setState({ categories: categories })
	}

	render() {
		return this.state.subjectInfo ? ( //Render content when data loaded from backend
			<Container>
				<SubjectCard subjectName={this.state.subjectInfo.name}>
					<FilterBar
						data={this.state.cards}
						handleFilter={this.handleFilter}
					/>
				</SubjectCard>

				<SubjectIntro
					header={this.state.subjectInfo.title}
					description={this.state.subjectInfo.description}
					img={this.state.subjectInfo.imageUrl}
				/>

				{this.state.headers.map((header, i) => {
					return (
						<Fragment>
							<SubjectCard subjectName={header.title} />
							<CardContainer
								id={i}
								cards={this.state.headers[i].cards}
							/>
						</Fragment>
					)
				})}
				<button className='btn btn-primary' onClick={() => console.log(this.state)}>Test</button>
				{/* Figures/Graphs */}
				{/* {this.state.figures.length ?
					<FigureContainer
						id={this.props.id}
						figures={this.state.figures}
					/>
					: ""} */}

				{/* Site Resources */}
				{/* <CardContainer
					id={this.props.id}
					categories={this.state.siteResources}
					hidden={this.state.categories}
				/> */}

				{/* Create Categories */}
				{/* <Modal
					title={"Create New Card"}
					tidbitTypes={this.state.tidbitTypes}
					numCategories={this.state.categories.length}
					numOpportunities={this.state.opportunities.length}
					SubjectID={this.state.subjectInfo[0].SubjectID}
					categoryType={1}
				/> */}

				{/* Opportunities (if exist) */}
				{/* {this.state.opportunities.length ?
					<Fragment>
						<div>
							<SubjectCard subjectName={`${this.state.subjectInfo[0].SubjectName} Opportunities to Consider`} />

							<CardContainer
								id={this.props.id}
								categories={this.state.opportunities}
								hidden={this.state.categories}
							/>
						</div>

						<Modal
							title={"Create New Opportunity Card"}
							tidbitTypes={this.state.tidbitTypes}
							numCategories={this.state.categories.length}
							numOpportunities={this.state.opportunities.length}
							SubjectID={this.state.subjectInfo[0].SubjectID}
							categoryType={2}
						/>
					</Fragment>
					: ""} */}

			</Container>
		) : <Loading />
	}
}

export default Subject

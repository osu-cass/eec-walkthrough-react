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
		icons: [],
		cards: []
	}

	async componentDidMount() {
		const response = await this.fetchData(); //Get data about this subject (subject info, cards, figures)
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.pageId !== prevProps.match.params.pageId) { //Reload state when switching between subjects
			await this.fetchData();
			await this.setState({ headers: this.state.pageInfo.headers });
		}
	}

	async fetchData() {
		let i, j, icons = [];
		this.setState({ cards: [], headers: [], icons: [] }); //reset state for page load
		//Page specific info
		fetch(`/pages/${this.props.pageId}`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(subjectInfo => this.setState({ subjectInfo }))
		//Full page info
		await fetch(`/pages/${this.props.pageId}/all`)
			.then(res => res.json())
			.then(pageInfo => this.setState({ pageInfo }))
		//Headers
		await this.setState({ headers: this.state.pageInfo.headers });
		//Split icons for each header
		for (i = 0; i < this.state.headers.length; i++) {
			icons[i] = this.state.headers[i].icons;
			for (j = 0; j < icons[i].length; j++) {
				icons[i][j].hidden = false;
			}
		}
		await this.setState({ icons: icons })
	}

	handleFilter = (id, idx) => {
		let icons = [...this.state.icons] //Create copy of object, update object, set state with new copy
		var i;
		for (i = 0; i < icons[idx].length; i++) {
			if (icons[idx][i].iconType === id) {
				icons[idx][i].hidden = !icons[idx][i].hidden //Update object and change hidden to opposite
			}
		}
		this.setState({ icons: icons })
	}

	render() {
		return this.state.subjectInfo && this.state.icons.length ? ( //Render content when data loaded from backend
			<Container>
				<SubjectCard subjectName={this.state.subjectInfo.name}>

				</SubjectCard>

				<SubjectIntro
					header={this.state.subjectInfo.title}
					description={this.state.subjectInfo.description}
					img={this.state.subjectInfo.imageUrl}
				/>

				{this.state.headers.map((header, i) => {
					return (
						<Fragment>
							<SubjectCard subjectName={header.title}>
								<FilterBar
									data={this.state.icons[i]}
									headerIndex={i}
									handleFilter={this.handleFilter}
								/>
							</SubjectCard>
							<CardContainer
								id={i}
								cards={this.state.headers[i].cards}
								filter={this.state.icons[i]}
							/>
						</Fragment>
					)
				})}
				<button className='btn btn-primary' onClick={() => console.log(this.state)}>Test</button>

				{/* Create cards */}
				{/* <Modal
					title={"Create New Card"}
					tidbitTypes={this.state.tidbitTypes}
					numcards={this.state.cards.length}
					numOpportunities={this.state.opportunities.length}
					SubjectID={this.state.subjectInfo[0].SubjectID}
					categoryType={1}
				/> */}

			</Container>
		) : <Loading />
	}
}

export default Subject

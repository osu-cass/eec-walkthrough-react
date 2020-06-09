import React, { Fragment } from 'react'
import {getProfile, logout} from '../utilities/cookieAuth';
import SubjectCard from '../components/SubjectCard'
import SubjectIntro from '../components/SubjectIntro'
import CardContainer from '../components/CardContainer'
import FilterBar from '../components/FilterBar'
import Loading from '../components/Loading'
import CreateCard from '../components/CreateCard'
import CreateHeader from '../components/CreateHeader'
import Container from 'react-bootstrap/Container'
import '../components/Subject.css'

class Subject extends React.Component {
	state = {
		sidebarOpen: false,
		pageInfo: [],
		subjectInfo: [],
		headers: [],
		icons: [],
		cards: [],
		iconSet: []
	}

	async componentDidMount() {
		const response = await this.fetchData(); //Get data about this subject (subject info, cards, figures)
		await this.setState({ role: getProfile().role });
		// console.log(this.state.pageInfo)
	}

	async componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.pageId !== prevProps.match.params.pageId) { //Reload state when switching between subjects
			await this.fetchData();
			await this.setState({ headers: this.state.pageInfo.headers });
		}
	}

	async fetchData() {
		let i, j, icons = [];

		//Reset state for page load
		this.setState({ cards: [], headers: [], icons: [], loaded: false });

		//Load all icons
		fetch(`/icons/all`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(iconSet => this.setState({ iconSet: iconSet.icons }))

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
		await this.setState({ loaded: true })
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

	resetFilter(headerIdx) {
		let icons = [...this.state.icons] //Create copy of object, update object, set state with new copy
		var i;
		for (i = 0; i < icons[headerIdx].length; i++) {
			icons[headerIdx][i].hidden = false // Change everything to not hidden
		}
		this.setState({ icons: icons })
		// console.log(icons);
	}

	render() {
		return this.state.loaded ? ( //Render content when data loaded from backend
			<Container>
				<SubjectCard subjectName={this.state.subjectInfo.name} />

				<SubjectIntro
					header={this.state.subjectInfo.title}
					description={this.state.subjectInfo.description}
					img={this.state.subjectInfo.imageUrl}
				/>

				<CreateHeader 
					pageId={parseInt(this.props.pageId)} 
					role={this.state.role} 
					userId={this.state.userId}
					subject={this.state.subjectInfo.name}
					refresh={() => this.fetchData()}
					numHeaders={this.state.pageInfo.headers.length}
				/>

				{this.state.headers.map((header, i) => {
					console.log(header)
					return (
						<Fragment key={i}>
							<SubjectCard subjectName={header.title} sticky>
								<FilterBar
									data={this.state.icons[i]}
									headerIndex={i}
									handleFilter={this.handleFilter}
									resetFilter={(idx) => this.resetFilter(idx)}
								/>
							</SubjectCard>
							<CardContainer
								id={i}
								cards={this.state.headers[i].cards}
								filter={this.state.icons[i]}
								headerId={header.headerId}
								headerName={header.title}
								iconSet={this.state.iconSet}
								refresh={() => this.fetchData()}
							/>
							<CreateCard
								title={`Create ${header.title} Card`}
								icons={this.state.iconSet}
								numCards={this.state.headers[i].cards.length}
								headerId={header.headerId}
								pageType={1}
								refresh={() => this.fetchData()}
							/>
						</Fragment>
					)
				})}

			</Container>
		) : <Loading />
	}
}

export default Subject

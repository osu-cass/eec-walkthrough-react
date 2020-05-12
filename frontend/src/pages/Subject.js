import React, { Fragment } from 'react'
import SubjectCard from '../components/SubjectCard'
import SubjectIntro from '../components/SubjectIntro'
import CardContainer from '../components/CardContainer'
import FigureContainer from '../components/FigureContainer'
import FilterBar from '../components/FilterBar'
import Loading from '../components/Loading'
import Modal from '../components/Modal'
import '../components/Subject.css'

class Subject extends React.Component {
	state = {
		sidebarOpen: false,
		categories: [],
		opportunities: [],
		siteResources: [],
		figures: [],
		subjectInfo: []
	}

	componentDidMount() {
		this.fetchData(); //Get data about this subject (subject info, categories, figures)
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.id != prevProps.match.params.id) { //Reload state when switching between subjects
			this.fetchData();
		}
	}

	fetchData() {
		this.setState({ categories: [], opportunities: [], siteResources: [], figures: [], hasOpportunities: 0 })
		fetch(`/subjects/${this.props.id}`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(subjectInfo => this.setState({ subjectInfo }));
		fetch(`/cards/categories/${this.props.id}`)	//give each category  a hidden value to handle filter
			.then(res => res.json())
			.then(categories => {
				categories.map((category) => {
					category.hidden = false;
					var type = category.CategoryTypeID;
					var merged;
					if (type === 1) {
						merged = this.state.categories.concat(category);
						this.setState({ categories: merged });
					} else if (type === 2) {
						merged = this.state.opportunities.concat(category);
						this.setState({ opportunities: merged });
					} else if (type === 3) {
						merged = this.state.siteResources.concat(category);
						this.setState({ siteResources: merged });
					}
				})
			});
		fetch(`/figures/${this.props.id}`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(figures => this.setState({ figures }));
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
		return this.state.subjectInfo.length ? ( //Render content when data loaded from backend
			<div className="container">
				<SubjectCard subjectName={this.state.subjectInfo[0].SubjectName}>
					<FilterBar
						data={this.state.categories}
						handleFilter={this.handleFilter}
					/>
				</SubjectCard>

				<SubjectIntro
					header={this.state.subjectInfo[0].Summary}
					description={this.state.subjectInfo[0].Description}
					img={this.state.subjectInfo[0].SubjectImage}
				/>

				{/* Basic Categories (pros, cons, etc.) */}
				<CardContainer
					id={this.props.id}
					categories={this.state.categories}
					hidden={this.state.categories}
					refresh={this.refreshCategories}
				/>

				{/* Figures/Graphs */}
				{this.state.figures.length ?
					<FigureContainer
						id={this.props.id}
						figures={this.state.figures}
					/>
					: ""}

				{/* Site Resources */}
				<CardContainer
					id={this.props.id}
					categories={this.state.siteResources}
					hidden={this.state.categories}
				/>

				{/* Create Categories */}
				<Modal
					title={"Create New Card"}
					tidbitTypes={this.props.tidbitTypes}
					numCategories={this.state.categories.length}
					numOpportunities={this.state.opportunities.length}
					SubjectID={this.state.subjectInfo[0].SubjectID}
					categoryType={1}
				/>

				{/* Opportunities (if exist) */}
				{this.state.opportunities.length ?
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
							tidbitTypes={this.props.tidbitTypes}
							numCategories={this.state.categories.length}
							numOpportunities={this.state.opportunities.length}
							SubjectID={this.state.subjectInfo[0].SubjectID}
							categoryType={2}
						/>
					</Fragment>
					: ""}

			</div>
		) : <Loading />
	}
}

export default Subject

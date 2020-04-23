import React, {Fragment} from 'react'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import CardContainer from './CardContainer'
import FilterBar from './FilterBar'
import BulletPoint from './BulletPoint'
import Loading from './Loading'
import Modal from './Modal'
import AddButton from './AddButton'
import Card from './Card'
import './Subject.css'
import { Row, Col, Divider } from 'antd';

class Subject extends React.Component {
	state = {
		sidebarOpen: false,
		categories: [],
		opportunities: [],
		siteResources: [],
		subjectInfo: []
	}

	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.id != prevProps.match.params.id) {
			this.fetchData();
		}
	}

	fetchData() {
        this.setState({ categories: [], opportunities: [], siteResources: [], hasOpportunities: 0 })
		fetch(`/subjects/${this.props.id}`)	//subject info (summary, name, img, description)
			.then(res => res.json())
			.then(subjectInfo => this.setState({ subjectInfo }));
		fetch(`/cards/categories/${this.props.id}`)	//give each category  a hidden value to handle filter
			.then(res => res.json())
			.then(categories => {
				categories.map((category) => {
					let data = {
						CategoryID: category.CategoryID,
						CategoryTypeID: category.CategoryTypeID,
						CategoryName: category.CategoryName,
						Icon: category.TypeName,	//TypeName and TypeID used for Filter Bar
						TypeID: category.TypeID,
						SubjectID: category.SubjectID,
						IndexNum: category.IndexNum,
						hidden: false
					};
                    var type = category.CategoryTypeID;
					if (type === 1) {
					    var merged = this.state.categories.concat(data);
						this.setState({ categories: merged });
					} else if (type === 2) {
						var merged = this.state.opportunities.concat(data);
						this.setState({ opportunities: merged });
                    } else if (type === 3) {
					    var merged = this.state.siteResources.concat(data);
                        console.log(data);
						this.setState({ siteResources: merged });
                    }
				})
			});
	}

	handleFilter = (id) => {
		let categories = [...this.state.categories] //Create copy of object, update object, set state with new copy
		var i
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

				<CardContainer
					id={this.props.id}
					categories={this.state.categories}
					hidden={this.state.categories}
					refresh={this.refreshCategories}
				/>

                <CardContainer
                    id={this.props.id}
                    categories={this.state.siteResources}
                    hidden={this.state.categories}
                />

				<Modal
					title={"Create New Card"}
					tidbitTypes={this.props.tidbitTypes}
					numCategories={this.state.categories.length}
					numOpportunities={this.state.opportunities.length}
					SubjectID={this.state.subjectInfo[0].SubjectID}
					onClick={() => this.setState({refresh: true})}
				/>


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
					onClick={() => this.setState({refresh: true})}
				/>
                    </Fragment>
                : ""}
			</div>
		) : <Loading />
	}
}

export default Subject
{/*<button class='btn btn-primary' onClick={()=>console.log(this.state)}>Click</button>*/ }

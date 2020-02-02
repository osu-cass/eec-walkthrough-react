import React from 'react'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import CardContainer from './CardContainer'
import FilterBar from './FilterBar'
import Loading from './Loading'
import './Subject.css'

class Subject extends React.Component {
  state = {
    sidebarOpen: false,
    tidbitTypes: [],
		subjectInfo: []
  }

  componentDidMount() {
    //For each card, take its category and assign if its hidden or visible
		fetch(`/subjects/${this.props.id}`)
				.then(res => res.json())
				.then(subjectInfo => this.setState({subjectInfo}));
		fetch(`/cards/types/${this.props.id}`)		
				.then(res => res.json())
				.then(tidbitTypes => {
					tidbitTypes.map((tidbit) => {
						let data = {
							TypeID: tidbit.TypeID,
							TypeName: tidbit.TypeName,
							Icon: tidbit.Icon,
							SubjectID: tidbit.SubjectID,
							hidden: false
						};
						var merged = this.state.tidbitTypes.concat(data);
						this.setState({tidbitTypes: merged});
					})
				});
  }

  handleFilter = id => {
    let tidbitTypes = [...this.state.tidbitTypes] //Create copy of object, update object, set state with new copy
    var i
    for (i = 0; i < tidbitTypes.length; i++) {
      if (tidbitTypes[i].TypeID === id) {
        tidbitTypes[i].hidden = !tidbitTypes[i].hidden //Update object and change hidden to opposite
      }
    }
    this.setState({ tidbitTypes: tidbitTypes})
  }

  render() {
    return this.state.subjectInfo.length ? ( //Render content when data loaded from backend
			<div className="container">
				<SubjectCard subjectName={this.state.subjectInfo[0].SubjectName}>
					<FilterBar
						data={this.state.tidbitTypes}
						handleFilter={this.handleFilter}
					/>
				</SubjectCard>

				<SubjectIntro
					header={this.state.subjectInfo[0].Summary}
					description={this.state.subjectInfo[0].Description}
					img={this.state.subjectInfo[0].SubjectImage}
				/>

				<CardContainer id={this.props.id} types={this.state.tidbitTypes} hidden={this.state.tidbitTypes}/>
				<SubjectCard subject="Opportunities to Consider" />
			</div>
		) : <Loading />
	}
}

export default Subject
{/*<button class='btn btn-primary' onClick={()=>console.log(this.state)}>Click</button>*/}

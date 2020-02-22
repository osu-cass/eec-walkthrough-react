import React from 'react'
import SubjectCard from './SubjectCard'
import SubjectIntro from './SubjectIntro'
import CardContainer from './CardContainer'
import FilterBar from './FilterBar'
import Loading from './Loading'
import BulletPoint from './BulletPoint'
import AddButton from './AddButton'
import Card from './Card'
import './Subject.css'
import { useParams } from "react-router-dom";
import { Route, Switch, BrowserRouter } from 'react-router-dom';

class Subject extends React.Component {
  state = {
    sidebarOpen: false,
    categories: [],
		opportunities: [],
		hasOpportunities: 0,
		subjectInfo: []
  }
  
	
	componentDidMount() {
		this.fetchData();
	}

	componentDidUpdate(prevProps, prevState){
		if(this.props.match.params.id != prevProps.match.params.id){
			this.fetchData();
		}
	}
	
	fetchData(){
		this.setState({categories: [], opportunities: [], hasOpportunities: 0}) //clear out info, incase of reload
		fetch(`/subjects/${this.props.id}`)	//subject info (summary, name, img, description)
				.then(res => res.json())
				.then(subjectInfo => this.setState({subjectInfo}));
		fetch(`/cards/categories/${this.props.id}`)	//give each category  a hidden value to handle filter
				.then(res => res.json())
				.then(categories => {
					categories.map((category) => {
						let data = {										
								CategoryID: category.CategoryID,
								CategoryName: category.CategoryName,
								Icon: category.TypeName,
								TypeID: category.TypeID,
								SubjectID: category.SubjectID,
								IndexNum: category.IndexNum,
								hidden: false
						};
						if(!category.IsOpportunity){			//sort between opportunity and regular categories
							var merged = this.state.categories.concat(data);
							this.setState({categories: merged});
						} else{
							var merged = this.state.opportunities.concat(data);
							this.setState({opportunities: merged});
							this.setState({hasOpportunities: 1});
						}
					})
				});		
	}
	
  handleFilter = id => {
    let categories = [...this.state.categories] //Create copy of object, update object, set state with new copy
    var i
    for (i = 0; i < categories.length; i++) {
      if (categories[i].CategoryID === id) {
        categories[i].hidden = !categories[i].hidden //Update object and change hidden to opposite
      }
    }
    this.setState({ categories: categories})
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
				/>
	
				{this.state.hasOpportunities == 1 && 		
				<div>
					<SubjectCard subjectName={`${this.state.subjectInfo[0].SubjectName} Opportunities to Consider`} />	
					
					<CardContainer 
							id={this.props.id} 
							categories={this.state.opportunities} 
							hidden={this.state.categories}
					/>
				</div>

				}
			</div>
		) : <Loading />
	}
}

export default Subject
{/*<button class='btn btn-primary' onClick={()=>console.log(this.state)}>Click</button>*/}

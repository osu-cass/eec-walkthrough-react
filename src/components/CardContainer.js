import React from 'react'
import Card from './Card'
import SubjectCard from './SubjectCard'
import './Subject.css'

class CardContainer extends React.Component {
  state = {
		categories: []
  }

	generateCards(){
		let used = []; //holds ids of all the used tidbits, prevents reprint
		let Cards = this.props.categories.map((category, i) => {				//Loop through Categories
			return(
					<Card 
						category={category.CategoryName}
						checkFilter={this.checkFilter(category.CategoryID)}
						id={this.props.id}
						categoryid={category.CategoryID}
						used={used}
					/>
			);
		})
		return Cards
	}

	checkFilter(id){
		var i;
		for(i = 0; i < this.props.hidden.length; i++){
			if(this.props.hidden[i].CategoryID === id){
				if(this.props.hidden[i].hidden === true){
					return 'hide';
				}
			}
		}
		return 'active';
	}

	render() {
    return this.props.categories.length ? ( //Render content when data loaded from backend
			<div className="tidbitContainer">
				{this.generateCards()}
      </div>
		) : <SubjectCard subjectName='No Data' /> ;	
	}
}

export default CardContainer 

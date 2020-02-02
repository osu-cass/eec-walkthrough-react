import React from 'react'
import Card from './Card'
import BulletPoint from './BulletPoint'
import './Subject.css'

class CardContainer extends React.Component {
  state = {
    tidbits: [],
		tidbitTypes: []
  }

  componentDidMount() {
		fetch(`/cards/types/${this.props.id}`)
				.then(res => res.json())
				.then(tidbitTypes => this.setState({tidbitTypes: tidbitTypes}));
  }

	generateCards = () => {
		let used = []; //holds ids of all the used tidbits, prevents reprint
		let Cards = this.state.tidbitTypes.map((type, i) => {				//Loop through Tidbit Types
			return(
					<Card 
						category={type.TypeName}
						checkFilter={this.checkFilter(type.TypeID)}
						id={this.props.id}
						typeid={type.TypeID}
						icon={type.Icon}
						used={used}
					/>
			);
		})
		return Cards
	}

	checkFilter = (id) => {
		var i;
		for(i = 0; i < this.props.hidden.length; i++){
			if(this.props.hidden[i].TypeID === id){
				if(this.props.hidden[i].hidden === true){
					return 'hide';
				}
			}
		}
		return 'active';
	}

	render() {
    return this.state.tidbitTypes.length ? ( //Render content when data loaded from backend
			<div className="tidbitContainer">
          
				{(this.state.tidbitTypes.length) ? this.generateCards() : ''}

      </div>
		) : <div> No Data for this Subject </div> ;	
	}
}

export default CardContainer 
{/*	<button onClick={()=>(console.log(this.state))}>Test</button> */}

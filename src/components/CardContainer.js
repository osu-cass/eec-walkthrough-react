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
		fetch(`/cards/${this.props.id}`)
				.then(res => res.json())
				.then(tidbits => this.setState({tidbits: tidbits}));
  }

	getChilds = (id) => {
		var results = this.state.tidbits.reduce(function(result, tidbit) { //get tidbits whose parentid matches the parameter
			if(tidbit.ParentID === id){
				result.push(tidbit);
			}
			return result;
		}, []);
		return results.length ? results : false
	}

	recurseTidbits = (tidbit, icon, typeid, used) => {
		let childs = this.getChilds(tidbit.TidbitID); //get all childs of this tidbit
		if(!(used.includes(tidbit.TidbitID))){
			used.push(tidbit.TidbitID)															//push used
			if(childs){																							//if has child, recurse
				return (
					<BulletPoint icon={icon} text={tidbit.Text}>
						{childs.map((child) => (this.recurseTidbits(child, icon, typeid, used)))}
					</BulletPoint>
				)
			}
			else{
				return <BulletPoint icon={icon} text={tidbit.Text} /> //if no childs
			}
		}
	}

	generateCards = () => {
		let used = [];
		let Cards = this.state.tidbitTypes.map((type, i) => {				//Loop through Tidbit Types
			return(
				<div id={type.TypeID} className={this.checkFilter(type.TypeID)}>
					<Card category={type.TypeName}>
						{this.state.tidbits.map((tidbit) => {								//Loop through Tidbits of that Type
							if(tidbit.TypeID === type.TypeID){
								return(this.recurseTidbits(tidbit, type.Icon, type.TypeID, used))
							}})
						}
					</Card>
				</div>
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

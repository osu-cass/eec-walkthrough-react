import React from 'react'
import Edit from './Edit'
import BulletPoint from './BulletPoint'

class Card extends React.Component { 
	state = {
		tidbits: []
	}

	componentDidMount() {
		fetch(`/cards/${this.props.id}`)	//gets all tdibits for this card
				.then(res => res.json())
				.then(tidbits => this.setState({tidbits: tidbits}));
  }
	
	getChilds(id){
		var results = this.state.tidbits.reduce(function(result, tidbit) { //get tidbits whose parentid is in params
			if(tidbit.ParentID === id){
				result.push(tidbit);
			}
			return result;
		}, []);
		return results.length ? results : false
	}

	recurseTidbits(tidbit, icon, categoryid, used, isChild){	//isChild = marks if it has any parent, for coloring
		let childs = this.getChilds(tidbit.TidbitID); //get all childs of this tidbit
		if(!(used.includes(tidbit.TidbitID))){
			used.push(tidbit.TidbitID)															//push used
			if(childs){																							//if has child, recurse
				return (
					<BulletPoint id={tidbit.TidbitID} icon={tidbit.TypeName} text={tidbit.Text} child={isChild}>
						{childs.map((child) => (this.recurseTidbits(child, icon, categoryid, used, true)))}
					</BulletPoint>
				)
			} else
				return <BulletPoint id={tidbit.TidbitID} icon={tidbit.TypeName} text={tidbit.Text} child={isChild}/> //if no childs, base case
		}
	}
	
	generateTidbits() {
		let jsx = []																				//hold tidbits
		this.state.tidbits.map((tidbit) => {								//Loop through Tidbits of Type 
				if(tidbit.CategoryID === this.props.categoryid){
					jsx.push(this.recurseTidbits(tidbit, this.props.icon, this.props.categoryid, this.props.used, false))
				}})
		return jsx
	}

	render(){
		return (
			<div key={this.props.categoryid} className={`my-2 pl-3 pt-2 bg-white card rounded shadow-sm ${this.props.checkFilter}`}>
				<div
					id="header"
					className="d-flex justify-content-between border-bottom border-gray"
				>
					<h5 className='font-weight-bold'>{this.props.category}</h5>
				</div>
				<div className="mt-2">
					{this.generateTidbits()}
				</div>
			</div>
		);
	}
}

export default Card

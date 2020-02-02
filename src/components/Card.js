import React, { useState } from 'react'
import Edit from './Edit'
import BulletPoint from './BulletPoint'

class Card extends React.Component { 
	state = {
		tidbits: []
	}

	componentDidMount() {
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

	render(){
		return (
			<div
				id={this.props.category}
				className={`my-3 p-3 bg-white card rounded shadow-sm ${this.props.checkFilter}`}
			>
				<div
					id="header"
					className="d-flex justify-content-between border-bottom border-gray pb-2"
				>
					<h5>{this.props.category}</h5>
					<Edit />
				</div>
				<div className="mt-2">
					{this.state.tidbits.map((tidbit) => {								//Loop through Tidbits of Type 
							if(tidbit.TypeID === this.props.typeid){
								return(this.recurseTidbits(tidbit, this.props.icon, this.props.typeid, this.props.used))
							}})
						}
				</div>
			</div>
		);
	}
}

export default Card

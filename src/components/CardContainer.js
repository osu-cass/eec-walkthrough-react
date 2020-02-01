import React from 'react'
import Card from './Card'
import BulletPoint from './BulletPoint'
import './Subject.css'
import axios from "axios";

class CardContainer extends React.Component {
  state = {
    tidbits: [],
		tidbitTypes: [],
  }

  componentDidMount() {
		fetch(`/cards/types`)
				.then(res => res.json())
				.then(tidbitTypes => this.setState({tidbitTypes: tidbitTypes}));
	
		fetch(`/cards/${this.props.id}`)
				.then(res => res.json())
				.then(tidbits => this.setState({tidbits: tidbits}));
  }

  handleFilter = id => {
    let tidbitList = [...this.state.tidbits] //Create copy of object, update object, set state with new copy
    var i
    for (i = 0; i < tidbitList.length; i++) {
      if (tidbitList[i].id === id) {
        tidbitList[i].hidden = !tidbitList[i].hidden //Update object and change hidden to opposite
      }
    }
    this.setState({ tidbits: tidbitList })
  }
	
	getChilds = (id) => {
		var results = this.state.tidbits.reduce(function(result, tidbit) {
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
				<div id={type.TypeID} className='hi'>
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

	render() {
    return this.state.tidbits.length ? ( //Render content when data loaded from backend
      <div className="tidbitContainer">
          {/* For each Category */}
          {(this.state.tidbitTypes.length) ? this.generateCards() : ''}

      </div>
		) : <div> No Data for this Subject </div> ;	
	}
}

export default CardContainer 

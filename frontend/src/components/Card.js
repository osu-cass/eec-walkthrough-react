import React from 'react'
import Edit from './Edit'
import BulletPoint from './BulletPoint'

class Card extends React.Component {
	state = {
		items: []
	}

	async componentDidMount() {
		const response = await this.setState({ items: this.props.items });
	}

	getChilds(id) {
		var results = this.state.items.reduce(function (result, item) { //get items whose parentid is in params
			if (item.ParentID === id) {
				result.push(item);
			}
			return result;
		}, []);
		return results.length ? results : false
	}

	recurseItems(item, icon, categoryid, used, isChild) {	//isChild = marks if it has any parent, for coloring
		let childs = this.getChilds(item.itemId); //get all childs of this item
		if (!(used.includes(item.itemId))) {
			used.push(item.itemId)															//push used
			if (childs) {																							//if has child, recurse
				return (
					<BulletPoint
						key={item.itemId}
						id={item.itemId}
						icon={item.typeName}
						text={item.contentLabel}
						child={isChild}
						url={item.contentUrl}
						checkFilter={this.props.checkFilter}
					>
						{childs.map((child) => (this.recurseItems(child, icon, categoryid, used, true)))}
					</BulletPoint>
				)
			} else
				return <BulletPoint
					key={item.itemId}
					url={item.contentUrl}
					id={item.itemId}
					icon={item.typeName}
					text={item.contentLabel}
					child={isChild}
					checkFilter={this.props.checkFilter}
				/> //if no childs, base case
		}
	}

	generateItems() {
		let jsx = []																				//hold items
		this.state.items.map((item) => {								//Loop through items of Type
			if (item.CategoryID === this.props.categoryid) {
				jsx.push(this.recurseItems(item, this.props.icon, this.props.categoryid, this.props.used, false))
			}
		})
		return jsx
	}

	render() {
		return (
			<div className={`my-2 pl-3 pt-2 bg-${this.props.color} card rounded shadow-sm `}>
				<div
					id="header"
					className="d-flex justify-content-between border-bottom border-gray"
				>
					<h5 className='font-weight-bold'>{this.props.card}</h5>
				</div>
				<div className="mt-2">
					{this.generateItems()}
				</div>
			</div>
		);
	}
}

export default Card

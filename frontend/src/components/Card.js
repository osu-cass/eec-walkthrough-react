import React from 'react'
import { Card as CardBS } from 'react-bootstrap'
import BulletPoint from './BulletPoint'
import EditCard from './EditCard'

class Card extends React.Component {
	state = {
		items: []
	}

	async componentDidMount() {
		const response = await this.setState({ items: this.props.items });
	}

	//return childs of id === parentId
	getChilds(id) {
		var results = this.state.items.reduce(function (result, item) { 
			if (item.parentId === id) {
				result.push(item);
			}
			return result;
		}, []);
		console.log(results.length, results)
		return results.length ? results : false
	}

	recurseItems(item, icon, categoryid, used, isChild) {	//isChild = marks if it has any parent, for coloring
		let childs = this.getChilds(item.itemId); //get all childs of this item
		let hide = this.props.checkFilter(item.iconType);
		if (!(used.includes(item.itemId))) {
			used.push(item.itemId)															//push used
			if (childs) {																							//if has child, recurse
				return (
					<BulletPoint
						key={item.itemId}
						id={item.itemId}
						icon={item.typeName}
						text={item.contentText}
						label={item.contentLabel}
						child={isChild}
						url={item.contentUrl}
						checkFilter={this.props.checkFilter}
						hide={hide}
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
					text={item.contentText}
					label={item.contentLabel}
					child={isChild}
					checkFilter={this.props.checkFilter}
					hide={hide}
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
			<CardBS className={`my-2 shadow-sm`}>
				<CardBS.Header as="h5" className="d-flex justify-content-between border-bottom py-2 border-gray font-weight-bold">
					{this.props.card}
					<EditCard
						title={`Edit ${this.props.card} Card`}
						cardName={this.props.card}
						icons={this.props.iconSet}
						items={this.props.items}
						headerId={this.props.headerId}
						cardId={this.props.cardId}
						parentId={this.props.parentId}
						orderIndex={1}
						refresh={() => this.fetchData()}
					/>
				</CardBS.Header>
				<CardBS.Body>
					{this.generateItems()}
				</CardBS.Body>
			</CardBS>
		);
	}
}

export default Card

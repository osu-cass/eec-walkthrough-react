import React, { Fragment } from 'react'
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
	state = {
		selectedID: null,
		selectedIndex: null
	}

	handleClick = (id, idx) => {
		this.setState({ selectedID: id });
		this.setState({ selectedIndex: idx });
	}

	generateList() {
		let jsx = [];
		this.props.list[0].map((elem, idx) => {
			jsx.push(
				<div key={idx} className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => this.handleClick(this.props.list[1][idx][0], idx)}>
					{elem}
				</div>
			);
		});
		return jsx;
	}

	render() {
		return (
			<Fragment key={this.props.index}>
				<button className="btn btn-outline-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					{this.state.selectedIndex === null ? "Icon" : this.props.list[1][this.state.selectedIndex][1]}
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{this.generateList()}
				</div>
			</Fragment>
		)
	}
}

Dropdown.propTypes = {
	list: PropTypes.arrayOf(PropTypes.array)
};

export default Dropdown


//pass in a "list" prop, zero index is jsx elements and first index is corresponding [0]values[1]valueName, if any
//list[0] = JSX Elements inserted into dropdown
//list[1][i] = Array with value of JSX element, and printed name of JSX element, for on click
//list[1][i][0] = Value of JSX element
//list[1][i][1] = Printed name of JSX element

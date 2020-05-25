import React, { Fragment } from "react";
import "./Sidebar.css";
import SidebarCollection from "./SidebarCollection";
import { NavLink } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Sidebar extends React.Component {
	state = {
		pages: [],
	};

	constructor(props) {
		super(props);
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
	}

	componentDidMount() {
		this.fetchData();
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	fetchData() {
		fetch('/pages/all')
			.then(res => res.json())
			.then(res => res.pages)
			.then(pages => this.setState({ pages })) //get all pages
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	/**** Alert if clicked on outside of element **/
	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if (this.props.className === "visible")
				//if sidebar is open, close sidebar
				this.props.handleSidebar();
		}
	}

	render() {
		return this.state.pages ? (
			< div
				className={"wrapper " + this.props.className}
				ref={this.setWrapperRef}
			>
				{/* Wrapper is created to be able to click outside sidebar to close it */}
				<nav id='sidebar'>
					<Card bg="info" as="h2">
						<Card.Header>
							Directory
						</Card.Header>
					</Card>

					<Col className="mt-3">
						<Card bg="dark" border="info" style={{ cursor: "pointer" }}>
							<SidebarCollection
								collectionName="Home"
								collectionLink=""
							/>
							<SidebarCollection
								collectionName="Subjects"
								collectionLink="subjects"
								collection={this.state.pages.subjects}
								refresh={() => this.fetchData()}
							/>
							<SidebarCollection
								collectionName="Industries"
								collectionLink="industries"
								collection={this.state.pages.industries}
								refresh={() => this.fetchData()}
							/>
              <SidebarCollection
								collectionName="Manage Users"
								collectionLink="users"
							/>
						</Card>

						<Card bg="info" border="dark" as="h5" className="mt-3 p-2 back">
							<NavLink to={`/`} onClick={this.props.handleSidebar} className="text-center">
								Back to Page
						</NavLink>
						</Card>
					</Col>
				</nav>

			</div >
		) : <Fragment></Fragment>;
	}
}

export default Sidebar;

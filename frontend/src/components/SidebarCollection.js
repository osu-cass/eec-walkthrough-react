import React, { Fragment } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import "./SidebarCollection.css";

const SidebarCollection = props => {
	return (
		<Accordion>
			<Accordion.Toggle as={Card.Header} id="sidebarCollection" style={{ fontSize: "1.2rem" }} eventKey="0">
				{/* If no collection passed in, make singular link */}
				{props.collection ?
					props.collectionName :
					<NavLink to={`/${props.collectionLink}`}>{props.collectionName}</NavLink>
				}
			</Accordion.Toggle>
			{props.collection ?
				<Accordion.Collapse eventKey="0">
					<Fragment>
						{props.collection.map((item) => {
							return (
								<NavLink to={`/${props.collectionLink}/${item.pageId}`} className="ml-3 nav_link">
									<Card.Body key={item.pageId} style={{ fontSize: "1rem" }} className="nav_link">
										{item.name}
									</Card.Body>

								</NavLink>
							);
						})}
					</Fragment>
				</Accordion.Collapse>
				: ""}
		</Accordion >

	);
}

SidebarCollection.propTypes = {
	collectionName: PropTypes.string,
	collectionLink: PropTypes.string,
	collection: PropTypes.array
};

export default SidebarCollection;

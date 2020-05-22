import React, { Fragment } from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const SidebarCollection = props => {
	return (
		<Accordion>
			<Accordion.Toggle as={Card.Header} style={{ fontSize: "1.2rem" }} eventKey="0">
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
								<Card.Body key={item.pageId} style={{ fontSize: "1rem" }}>
									<NavLink to={`/${props.collectionLink}/${item.pageId}`}>
										{item.name}
									</NavLink>
								</Card.Body>
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

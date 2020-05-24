import React, { Fragment } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Error from './Error';
import './CreateCard.css'
import './Subject.css'

class CreateItem extends React.Component {
	state = {
		show: false,
	}

	componentDidMount() {
		this.setState({ errorMessage: "Error: Fill out empty inputs (title, icons, text)" })
	}

	handleClose = () => this.setState({ show: false });
	handleShow = () => this.setState({ show: true });

	render() {
		return (
			<div className='text-center mt-2 mb-2'>
				<Button variant="outline-info" onClick={this.handleShow}>
					<i
						className='fas fa-plus-circle text-info mr-2'
						style={{ transform: 'scale(1.5)' }}></i>
							Create {this.props.collectionName}
				</Button>
				<Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-width">
					<Modal.Header>
						<h5 className="modal-title font-weight-bold" id="exampleModalLabel">{this.props.title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>

					</Modal.Header>

					<Modal.Body >
						<Row>
							<Col>
								<Form.Group controlId="formName">
									<Form.Label className="font-weight-bold">Page Name</Form.Label>
									<Form.Control type="text" placeholder="Enter name" onChange={(e) => this.setState({ name: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="formSummary">
									<Form.Label className="font-weight-bold">Summary</Form.Label>
									<Form.Control type="text" placeholder="Enter summary" onChange={(e) => this.setState({ summary: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="formDescription">
									<Form.Label className="font-weight-bold">Brief Description</Form.Label>
									<Form.Control type="text" placeholder="Enter description" onChange={(e) => this.setState({ description: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>

						<Row>
							<Col>
								<Form.Group controlId="formURL">
									<Form.Label className="font-weight-bold">Image URL</Form.Label>
									<Form.Control type="text" placeholder="Enter URL" onChange={(e) => this.setState({ url: e.target.value })} />
								</Form.Group>
							</Col>
						</Row>


						<Row>
							<div className='col-3' />
							<div className='col-6'>
								<Error
									empty={this.state.emptyInputs}
									message={this.state.errorMessage}
								/>
							</div>
						</Row>
					</Modal.Body>

					<Modal.Footer className="modal-footer">
						<Button variant="secondary" onClick={this.handleClose}>Close</Button>
						<Button variant="primary" onClick={(e) => this.handleSubmit(e)}>Create Card</Button>
					</Modal.Footer>
				</Modal>
			</div >
		);
	}
}

CreateItem.propTypes = {
	title: PropTypes.string,
	icons: PropTypes.array
};
/*
					title={"Create New Card"}
					icons={this.state.iconSet}
					numcards={this.state.cards.length}
					SubjectID={this.state.pageInfo.pageId}
					categoryType={1}
*/
export default CreateItem;

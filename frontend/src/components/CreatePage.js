import React, { Fragment } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Error from './Error';
import './CreatePage.css'
import './Subject.css'

class CreatePage extends React.Component {
	state = {
		name: "",
		summary: "",
		description: "",
		url: "",
		show: false,
		emptyInputs: false,
		errorMessage: "Error: Fill out empty inputs (title, icons, text)"
	}

	componentDidMount() {
		//Error message will change depending on which input is missing
		this.setState({ errorMessage: "Error: Fill out empty inputs (name, summary, description, image URL)" })
	}

	handleClose = () => this.setState({ show: false });
	handleShow = () => this.setState({ show: true });

	handleSubmit = async () => {
		//Check for empty inputs
		if (this.checkInputs()) {
			return
		}

		//Reset state
		this.setState({ emptyInputs: false });
		this.setState({ name: "" });
		this.setState({ summary: "" });
		this.setState({ description: "" });
		this.setState({ url: "" });

		//Close modal
		this.handleClose();

		//Prepare data
		let data = {
			pageType: 0,
			name: this.state.name,
			title: this.state.summary,
			description: this.state.description,
			imageUrl: this.state.url,
			userId: 1,
			approved: 1
		}

		//Create new page
		await fetch("/pages/", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data)
		}).then(function (res) {
			if (res.status >= 400) {
				throw new Error("Bad response from server");
			}
		}).catch(function (err) {
			console.log(err);
		})

		//Reload sidebar after adding
		this.props.refresh();
	}

	/**
	* Check for empty inputs in state before submission
	* @return {Boolean}   True if empty inputs found, false if all inputs filled
	*/
	checkInputs() {
		let emptyFound = false;
		let errorMessage = this.state.errorMessage;
		let errorCount = 0;
		//Empty name
		if (!this.state.name.length) {
			emptyFound = true;
			errorMessage = "Error: Empty page name";
			errorCount++;
		}
		//Empty summary
		if (!this.state.summary.length) {
			emptyFound = true;
			errorMessage = "Error: Empty page summary";
			errorCount++;
		}
		//Empty description
		if (!this.state.description.length) {
			emptyFound = true;
			errorMessage = "Error: Empty page description";
			errorCount++;
		}
		//Empty url
		if (!this.state.url.length) {
			emptyFound = true;
			errorMessage = "Error: Empty page url";
			errorCount++;
		}
		if (errorCount !== 4)
			this.setState({ errorMessage: errorMessage })
		this.setState({ emptyInputs: emptyFound })
		if (emptyFound)
			return true;
		return false;
	}

	render() {
		return (
			<div className='text-center mt-2 mb-2 createPage'>
				<Button variant="outline-info" className="createPage" onClick={this.handleShow}>
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

CreatePage.propTypes = {
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
export default CreatePage;

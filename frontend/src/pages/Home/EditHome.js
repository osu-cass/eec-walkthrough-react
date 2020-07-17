import React, {useEffect, useState} from "react";
import {Modal, Button, Row, Col, Form} from "react-bootstrap";
import PropTypes from "prop-types";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {getProfile, logout} from "../../utilities/cookieAuth";
import "./EditHome.css";

// Button and modal that allows a user to edit the homepage
function EditHome(props) {

  const [mainHeader, setMainHeader] = useState(props.page.mainHeader);
  const [secondaryHeader, setSecondaryHeader] = useState(props.page.secondaryHeader);
  const [sectionsTitle, setSectionsTitle] = useState(props.page.sectionsTitle);
  const [sectionsFooter, setSectionsFooter] = useState(props.page.sectionsFooter);
  const [tidbitsHeader, setTidbitsHeader] = useState(props.page.tidbitsHeader);
  const [tidbitsTitle, setTidbitsTitle] = useState(props.page.tidbitsTitle);
  const [tidbitsFooter, setTidbitsFooter] = useState(props.page.tidbitsFooter);
  const [linksHeader, setLinksHeader] = useState(props.page.linksHeader);
  const [linksTitlePrefix, setLinksTitlePrefix] = useState(props.page.linksTitlePrefix);
  const [linksTitlePostfixInternal, setLinksTitlePostfixInternal] = useState(props.page.linksTitlePostfixInternal);
  const [linksTitlePostfixDownload, setLinksTitlePostfixDownload] = useState(props.page.linksTitlePostfixDownload);
  const [linksFooter, setLinksFooter] = useState(props.page.linksFooter);
  const [disclaimerHeader, setDisclaimerHeader] = useState(props.page.disclaimerHeader);
  const [disclaimerText, setDisclaimerText] = useState(props.page.disclaimerText);

  const [role, setRole] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setMainHeader(props.page.mainHeader);
    setSecondaryHeader(props.page.secondaryHeader);
    setSectionsTitle(props.page.sectionsTitle);
    setSectionsFooter(props.page.sectionsFooter);
    setTidbitsHeader(props.page.tidbitsHeader);
    setTidbitsTitle(props.page.tidbitsTitle);
    setTidbitsFooter(props.page.tidbitsFooter);
    setLinksHeader(props.page.linksHeader);
    setLinksTitlePrefix(props.page.linksTitlePrefix);
    setLinksTitlePostfixInternal(props.page.linksTitlePostfixInternal);
    setLinksTitlePostfixDownload(props.page.linksTitlePostfixDownload);
    setLinksFooter(props.page.linksFooter);
    setDisclaimerHeader(props.page.disclaimerHeader);
    setDisclaimerText(props.page.disclaimerText);
    setRole(getProfile().role);
  }, [props.loginStatusChange, props.page.mainHeader, props.page.secondaryHeader,
    props.page.sectionsTitle, props.page.sectionsFooter, props.page.tidbitsHeader,
    props.page.tidbitsTitle, props.page.tidbitsFooter, props.page.linksHeader,
    props.page.linksTitlePrefix, props.page.linksTitlePostfixInternal,
    props.page.linksTitlePostfixDownload, props.page.linksFooter,
    props.page.disclaimerHeader, props.page.disclaimerText]);

  function handleCloseModal() {
    setShowModal(false);
    setErrorMessage("");
  }

  function handleShowModal() {
    setShowModal(true);
  }

  async function updatePage() {
    setShowLoad(true);

    const data = {
      mainHeader: mainHeader,
      secondaryHeader: secondaryHeader,
      sectionsTitle: sectionsTitle,
      sectionsFooter: sectionsFooter,
      tidbitsHeader: tidbitsHeader,
      tidbitsTitle: tidbitsTitle,
      tidbitsFooter: tidbitsFooter,
      linksHeader: linksHeader,
      linksTitlePrefix: linksTitlePrefix,
      linksTitlePostfixInternal: linksTitlePostfixInternal,
      linksTitlePostfixDownload: linksTitlePostfixDownload,
      linksFooter: linksFooter,
      disclaimerHeader: disclaimerHeader,
      disclaimerText: disclaimerText
    };

    const results = await fetch(`/api/home`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      props.handlePageEdit();

      // Close modal
      handleCloseModal();

    } else {

      const obj = await results.json();

      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }

    }
    setShowLoad(false);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setErrorMessage("");

    updatePage();
  }

  return role >= 4 ? (
    <div className="text-center mx-2">
      <LoadingOverlay loading={showLoad} />
      <Button variant="info" onClick={() => handleShowModal()}>
        <i
          className="fas fa-edit text-white ml-auto mr-2"
          style={{transform: "scale(1.5)"}}></i>
        <span className="text-white">Edit Homepage</span>
      </Button>
      <Modal show={showModal} onHide={() => handleCloseModal()} dialogClassName="modal-width">
        <Modal.Header>
          <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Edit Homepage</h5>
          <Button variant="none" onClick={() => handleCloseModal()}>
            <span aria-hidden="true">&times;</span>
          </Button>
        </Modal.Header>

        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="form1">
                <Form.Label className="font-weight-bold">Primary Header</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter primary header"
                  defaultValue={mainHeader}
                  onChange={(e) => setMainHeader(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form2">
                <Form.Label className="font-weight-bold">Secondary Header</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter secondary header"
                  defaultValue={secondaryHeader}
                  onChange={(e) => setSecondaryHeader(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form3">
                <Form.Label className="font-weight-bold">Sections Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter sections title"
                  defaultValue={sectionsTitle}
                  onChange={(e) => setSectionsTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form9">
                <Form.Label className="font-weight-bold">Sections Footer</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="5000"
                  placeholder="Enter sections footer"
                  defaultValue={sectionsFooter}
                  onChange={(e) => setSectionsFooter(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="form10">
                <Form.Label className="font-weight-bold">Tidbits Header</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter tidbits header"
                  defaultValue={tidbitsHeader}
                  onChange={(e) => setTidbitsHeader(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form11">
                <Form.Label className="font-weight-bold">Tidbits Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter tidbits title"
                  defaultValue={tidbitsTitle}
                  onChange={(e) => setTidbitsTitle(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form12">
                <Form.Label className="font-weight-bold">Tidbits Footer</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="5000"
                  placeholder="Enter tidbits footer"
                  defaultValue={tidbitsFooter}
                  onChange={(e) => setTidbitsFooter(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="form13">
                <Form.Label className="font-weight-bold">Resources Header</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter resources header"
                  defaultValue={linksHeader}
                  onChange={(e) => setLinksHeader(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form14">
                <Form.Label className="font-weight-bold">Resources Prefix Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter resources prefix title"
                  defaultValue={linksTitlePrefix}
                  onChange={(e) => setLinksTitlePrefix(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form15">
                <Form.Label className="font-weight-bold">Resources Postfix Internal Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter resources postfix internal title"
                  defaultValue={linksTitlePostfixInternal}
                  onChange={(e) => setLinksTitlePostfixInternal(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form16">
                <Form.Label className="font-weight-bold">Resources Postfix Download Title</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter resources postfix download title"
                  defaultValue={linksTitlePostfixDownload}
                  onChange={(e) => setLinksTitlePostfixDownload(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form17">
                <Form.Label className="font-weight-bold">Resources Footer</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="5000"
                  placeholder="Enter resources footer"
                  defaultValue={linksFooter}
                  onChange={(e) => setLinksFooter(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Body>

          <Row>
            <Col>
              <Form.Group controlId="form18">
                <Form.Label className="font-weight-bold">Disclaimer Header</Form.Label>
                <Form.Control
                  type="text"
                  maxLength="1000"
                  placeholder="Enter disclaimer header"
                  defaultValue={disclaimerHeader}
                  onChange={(e) => setDisclaimerHeader(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group controlId="form19">
                <Form.Label className="font-weight-bold">Disclaimer Text</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="4"
                  maxLength="25000"
                  placeholder="Enter disclaimer text"
                  defaultValue={disclaimerText}
                  onChange={(e) => setDisclaimerText(e.target.value)}
                  style={{maxHeight: "500px"}}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <div className='col-3' />
            <div className='col-6 mt-2'>
              <Error
                message={errorMessage}
              />
            </div>
          </Row>
        </Modal.Body>

        <Modal.Footer className="modal-footer">
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>Submit Homepage Edit</Button>
          <Button variant="secondary" onClick={() => handleCloseModal()}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    null
  );

}
export default EditHome;

EditHome.propTypes = {
  page: PropTypes.object,
  handlePageEdit: PropTypes.func,
  loginStatusChange: PropTypes.bool
};

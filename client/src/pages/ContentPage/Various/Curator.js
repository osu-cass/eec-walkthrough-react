import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {API_URL} from "../../../utilities/constants";
import {Modal, Button} from "react-bootstrap";
import "./Curator.css";

function Curator(props) {

  const [show, setShow] = useState(false);
  const [pageCurator, setPageCurator] = useState([]);
  const [contributors, setContributors] = useState([]);

  // Fetch contributor data
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchData() {
      try {

        let obj = [];
        let tempContributors = [];

        // Fetch contributors
        let results = await fetch(`${API_URL}/contributors`, {
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          obj = await results.json();
          setContributors(obj.contributors);
          tempContributors = obj.contributors;
        } else {
          console.error("Error fetching contributors");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        // Fetch page curator
        results = await fetch(`${API_URL}/curators/page/${props.pageId}`, {
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          obj = await results.json();
          const curators = obj.userIds.map((item) =>
            item.userId
          );
          const contributors = tempContributors.filter((contributor) =>
            curators.includes(contributor.contributorId)
          );
          setPageCurator(contributors);
        } else {
          console.error("Error fetching page curator");
        }

      } catch (err) {
        if (err instanceof DOMException) {
          if (process.env.NODE_ENV === "development") {
            console.log("HTTP request aborted");
          }
        } else {
          throw err;
        }
      }
    }

    fetchData();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, [pageCurator]);

  // Update the page curator
  async function updatePage() {
    const curatorSelect = document.getElementById("select-curator");
    const curatorId = parseInt(curatorSelect.options[curatorSelect.selectedIndex].value, 10);

    const data = {
      pageName: props.pageName,
      userId: curatorId,
      active: 1
    };

    const results = await fetch(`${API_URL}/curators/${props.pageId}`, {
      method: "PUT",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {
      const contributor = contributors.filter((contributor) =>
        contributor.contributorId === curatorId
      );
      setPageCurator(contributor);
    } else {
      console.error("An internal server error occurred. Please try again later");
    }

    handleClose();
  }

  function handleClose() {
    setShow(false);
  }

  // Updates the pages with the new changes
  function handleSubmit(e) {
    e.preventDefault();

    updatePage();
  }

  return (
    <div className="curator-container mx-auto">
      <div className="d-block my-2 h-auto">
        <h5>Page Curator(s):
          {pageCurator.length ? (
            pageCurator.map((curator, i, arr) =>
              i === arr.length - 1 ? (
                " " + curator.name
              ) : (
                " " + curator.name + ","
              )
            )
          ) : (
            <span> None</span>
          )}
        </h5>
      </div>

      {props.role >= 3 && props.mode === 1 ? (
        <div className="mb-3">
          <Button size="sm" variant="info" onClick={() => setShow(true)}>
            <i
              className='fas fa-user text-white mr-2'
              style={{transform: "scale(1.5)"}}
            />
            <span className="text-white">Change Curator</span>
          </Button>

          <Modal show={show} onHide={() => handleClose()} dialogClassName="modal-width">
            <Modal.Header>
              <h5 className="modal-title font-weight-bold" id="exampleModalLabel">Change Curator</h5>
              <Button variant="none" onClick={() => handleClose()}>
                <span aria-hidden="true">&times;</span>
              </Button>
            </Modal.Header>

            <Modal.Body>
              <select className="form-control"
                id="select-curator"
              >
                {contributors.map((contributor) =>
                  <option value={contributor.contributorId} key={contributor.contributorId}>
                    {contributor.name}
                  </option>
                )}
              </select>
            </Modal.Body>

            <Modal.Footer className="modal-footer">
              <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
              <Button variant="primary" onClick={(e) => handleSubmit(e)}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        null
      )}
    </div>
  );
}
export default Curator;

Curator.propTypes = {
  pageId: PropTypes.string,
  pageName: PropTypes.string,
  mode: PropTypes.number,
  role: PropTypes.number,
  handlePageEdit: PropTypes.func
};
import React, {useEffect, useState} from "react";
import {Button, Row, FormControl} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {logout} from "../../utilities/cookieAuth";
import {API_URL} from "../../utilities/constants";
import "./ManageHome.css";

// page for managing home page text
function ManageHome() {

  const [leftTitle, setLeftTitle] = useState("");
  const [leftText, setLeftText] = useState("");
  const [leftIcon, setLeftIcon] = useState("");
  const [rightTitle, setRightTitle] = useState("");
  const [rightText, setRightText] = useState("");
  const [rightIcon, setRightIcon] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // when the page first loads, get all default info
  useEffect(() => {
    // abort controller for if this component is cleaned up before
    // the fetch request gets a response
    let ignore = false;
    const controller = new AbortController();

    async function fetchInfo() {
      try {

        setLoading(true);

        const results = await fetch(`${API_URL}/info`, {
          signal: controller.signal,
          method: "GET",
          credentials: "include",
          headers: {"Content-Type": "application/json"}
        });

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        if (results.ok) {
          const obj = await results.json();
          if (obj.info.length >= 2) {
            setLeftTitle(obj.info[0].title);
            setLeftText(obj.info[0].text);
            setLeftIcon(obj.info[0].icon);
            setRightTitle(obj.info[1].title);
            setRightText(obj.info[1].text);
            setRightIcon(obj.info[1].icon);
          }
        } else {
          console.error("Error fetching info");
        }

        setLoading(false);

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

    fetchInfo();

    // clean up function
    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  // Update one of the text fields
  function modifyField(id, field, text) {
    if (id === 1) {
      if (field === 1) {
        setLeftTitle(text);
      } else if (field === 2) {
        setLeftText(text);
      } else if (field === 3) {
        setLeftIcon(text);
      }
    } else {
      if (field === 1) {
        setRightTitle(text);
      } else if (field === 2) {
        setRightText(text);
      } else if (field === 3) {
        setRightIcon(text);
      }
    }
  }

  // Submit info changes
  async function submitChanges() {

    setLoading(true);

    // Create objects with the new info
    const leftObject = {
      title: leftTitle,
      text: leftText,
      icon: leftIcon
    }

    const rightObject = {
      title: rightTitle,
      text: rightText,
      icon: rightIcon
    }

    // Edit left info
    let results = await fetch(`${API_URL}/info/1`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(leftObject)
    });

    if (results.ok) {

      // Reset state
      setErrorMessage("");

    } else {

      // there was an error updating the info
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }
    }

    // Edit right info
    results = await fetch(`${API_URL}/info/2`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(rightObject)
    });

    if (results.ok) {

      // Reset state
      setErrorMessage("");

      // refresh the page
      window.location.reload();

    } else {

      // there was an error updating the info
      const obj = await results.json();

      // if the user is performing an unauthorized action
      // log them out and return them to the homepage
      if (results.status === 401) {
        logout();
        window.location.href = "/";
      } else if (results.status === 500 || typeof obj.error === "undefined") {
        setErrorMessage("An internal server error occurred. Please try again later.");
      } else {
        setErrorMessage(obj.error);
      }
    }

    setLoading(false);
  }

  return (
    <div className="container manage-home-page-container my-5">

      <LoadingOverlay loading={loading} />

      {/* Header bar */}
      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Manage Home
          </h4>
        </div>
      </div>



        <table className="home-table shadow">
          <thead>
            <tr>
              <th>
                Title
              </th>
              <th>
                Text
              </th>
              <th>
                <span className="font-weight-bold">Font Awesome Name&nbsp;&nbsp;</span>
                <a href={"https://www.fontawesome.com/v4.7.0/icons/"}>(All Icon Names)</a>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>

              {/* Left text fields */}
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="150"
                  placeholder="Enter title"
                  defaultValue={leftTitle}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(1, 1, e.target.value)}
                  required
                />
              </td>
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="5000"
                  placeholder="Enter text"
                  defaultValue={leftText}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(1, 2, e.target.value)}
                  required
                />
              </td>
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="100"
                  placeholder="Enter icon"
                  defaultValue={leftIcon}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(1, 3, e.target.value)}
                  required
                />
              </td>

            </tr>
            <tr>

              {/* Right text fields */}
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="150"
                  placeholder="Enter title"
                  defaultValue={rightTitle}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(2, 1, e.target.value)}
                  required
                />
              </td>
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="5000"
                  placeholder="Enter text"
                  defaultValue={rightText}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(2, 2, e.target.value)}
                  required
                />
              </td>
              <td className="home-text-field align-top">
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-2 mr-3"
                  maxLength="100"
                  placeholder="Enter icon"
                  defaultValue={rightIcon}
                  aria-label="Title"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifyField(2, 3, e.target.value)}
                  required
                />
              </td>

            </tr>
          </tbody>
        </table>

      {/* Error messages */}
      <div className="mx-3 my-3">
        <Error
          message={errorMessage}
        />

      {/* Save changes */}
      </div>
        <Row className="mb-2">
          <div className="col">
            <Button variant="primary" className="float-right mr-3" onClick={() => submitChanges()}>
              Save changes
            </Button>
          </div>
        </Row>
      </div>

  );
}
export default ManageHome;

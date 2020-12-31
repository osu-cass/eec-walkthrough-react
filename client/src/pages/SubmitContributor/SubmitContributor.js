import React, {useState, useEffect} from "react";
import {Card} from "react-bootstrap";
import {API_URL, UPLOAD_TERMS} from "../../utilities/constants";
import ImageInput from "../../components/General/ImageInput";
import Agreement from "../../components/General/Agreement";
import {getAgreement} from "../../utilities/agreementMode";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import Error from "../../components/General/Error";
import Success from "../../components/General/Success";
import {logout} from "../../utilities/cookieAuth";
import "./SubmitContributor.css";

// Submit contributor info for the current user
function SubmitContributor() {

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [pendingImage, setPendingImage] = useState(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [showAgreement, setShowAgreement] = useState(false);
  const [imageTerms] = useState(UPLOAD_TERMS);

  // show terms of image submission if they haven't been accepted before
  useEffect(() => {
    if (pendingImage !== null && !getAgreement("image")) {
      setShowAgreement(true);
    } else if (pendingImage !== null && getAgreement("image")) {
      setShowAgreement(false);
      setImageUpload(pendingImage);
    }
  }, [pendingImage]);

  // when the user cancels an image upload agreement
  function cancelAgreement() {
    setShowAgreement(false);
    setImageUpload(null);
    setPendingImage(null);
    const imageInput = document.getElementById("custom-file-upload-0");
    imageInput.value = "";
    const inputEvent = new Event("input", {bubbles: true});
    imageInput.dispatchEvent(inputEvent);
  }

  // when the user accepts an image upload agreement
  function acceptAgreement() {
    setShowAgreement(false);
    setImageUpload(pendingImage);
  }

  // Check for empty inputs in state before submission
  // True if empty inputs found, false if all inputs filled
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    // Empty url
    if (!url.length && imageUpload === null) {
      emptyFound = true;
      newErrorMessage = "Error: Empty image url";
    }
    // Empty description
    if (!description.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty contributor description";
    }
    // Empty summary
    if (!name.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty contributor name";
    }
    // Empty name
    if (!title.length) {
      emptyFound = true;
      newErrorMessage = "Error: Empty contributor title";
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }


  // submit the contributor data
  async function submitContributorInfo() {
    // Check for empty inputs
    if (checkInputs()) {
      return;
    }
    setLoading(true);

    let imageUrl = url;

    // See if we are uploading a new image
    if (imageUpload !== null) {
      const formData = new FormData();
      formData.append("image", imageUpload);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        imageUrl = obj.url;
        setUrl(imageUrl);
        setImageUpload(null);
      } else {
        console.error("Failed to upload image.");
      }
    }

    // see if the url is still valid
    if (!imageUrl.length) {
      setErrorMessage("Error: Empty image url");
      return;
    }

    const data = {
      name: name,
      title: title,
      description: description,
      imageUrl: imageUrl
    };

    const results = await fetch(`${API_URL}/contributors/submission`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      setSuccessMessage("Contributor information submited sucessfully");
      setErrorMessage("");

    } else {

      const obj = await results.json();

      setSuccessMessage("");
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
    <div className="container submit-contributor-container mt-5">

      <Agreement
        agreementTitle={"Image Agreement"}
        agreementName={"image"}
        terms={imageTerms}
        acceptFunction={() => acceptAgreement()}
        show={showAgreement}
        closeModal={() => cancelAgreement()}
      />

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between mt-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <h4 className="flex-grow-1 font-weight-bold">
            Submit Contributor Information
          </h4>
        </div>
      </div>

      <Card className="mb-2 mb-5 mt-3" id="contributor-register-container">
        <div className="p-2 mb-2 text-dark-50 bg-white" >
          <div className="form-group m-3">

            <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Name
            </label>
            <input
              type="name"
              className="form-control mb-4"
              id="submit-name"
              maxLength="100"
              placeholder="Enter name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Title
            </label>
            <input
              type="title"
              className="form-control mb-4"
              id="submit-title"
              maxLength="500"
              placeholder="Enter title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Description
            </label>
            <textarea
              type="description"
              className="form-control mb-4"
              id="submit-description"
              maxLength="5000"
              placeholder="Enter description"
              defaultValue={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label form="formGroup" className="flex-grow-1 font-weight-bold h4">
                  Image (the width and height of the image should be the same value)
            </label>
            <input
              type="text"
              className="form-control mb-4"
              id="submit-image-url"
              maxLength="1000"
              placeholder="Enter URL"
              defaultValue={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <ImageInput id={0} onNewImage={(newImage) => setPendingImage(newImage)} />

            <div className="ml-2 my-3 pl-2">
              <Success
                message={successMessage}
              />
              <Error
                message={errorMessage}
              />
            </div>

            <button
              type="submit"
              id="search-user-button"
              className="btn btn-info my-2 pull-right"
              onClick={() => submitContributorInfo()}
            >
              Submit
            </button>

          </div>
        </div>
      </Card>
    </div>
  );

}
export default SubmitContributor;

import React, {useEffect, useState, Fragment} from "react";
import {Button, Row, FormControl} from "react-bootstrap";
import Error from "../../components/General/Error";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import ImageInput from "../../components/General/ImageInput";
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
  const [banner1, setBanner1] = useState("");
  const [banner2, setBanner2] = useState("");
  const [banner3, setBanner3] = useState("");
  const [banner4, setBanner4] = useState("");
  const [banner5, setBanner5] = useState("");
  const [banner6, setBanner6] = useState("");
  const [upload1, setUpload1] = useState(null);
  const [upload2, setUpload2] = useState(null);
  const [upload3, setUpload3] = useState(null);
  const [upload4, setUpload4] = useState(null);
  const [upload5, setUpload5] = useState(null);
  const [upload6, setUpload6] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const [error3, setError3] = useState("");
  const [error4, setError4] = useState("");
  const [error5, setError5] = useState("");
  const [error6, setError6] = useState("");
  const [sponsors, setSponsors] = useState([]);
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

        let results = await fetch(`${API_URL}/banners`, {
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

          if (obj.banners.length > 0) {
            setBanner1(obj.banners[0].imageUrl);
          }
          if (obj.banners.length > 1) {
            setBanner2(obj.banners[1].imageUrl);
          }
          if (obj.banners.length > 2) {
            setBanner3(obj.banners[2].imageUrl);
          }
          if (obj.banners.length > 3) {
            setBanner4(obj.banners[3].imageUrl);
          }
          if (obj.banners.length > 4) {
            setBanner5(obj.banners[4].imageUrl);
          }
          if (obj.banners.length > 5) {
            setBanner6(obj.banners[5].imageUrl);
          }

        } else {
          console.error("Error fetching info");
        }

        // if this component is cleaned up, stop here
        if (ignore) {
          return;
        }

        results = await fetch(`${API_URL}/info`, {
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

        // Fetch all sponsors
        results = await fetch(`${API_URL}/home/sponsors`, {
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
          setSponsors(obj.sponsors);

        } else {
          console.error("Error fetching sponsors");
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

  // Submit banner changes
  async function submitBanners() {

    let error = false;

    // submit all of the non-empty banner fields
    const banners = [];

    // Check banner 1
    if (upload1 !== null) {
      const formData = new FormData();
      formData.append("image", upload1);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError1("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError1(obj.error);
          error = true;
        }
      }
    } else if (banner1.trim().length) {
      banners.push(banner1.trim());
    }

    // Check banner 2
    if (upload2 !== null) {
      const formData = new FormData();
      formData.append("image", upload2);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError2("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError2(obj.error);
          error = true;
        }
      }
    } else if (banner2.trim().length) {
      banners.push(banner2.trim());
    }

    // Check banner 3
    if (upload3 !== null) {
      const formData = new FormData();
      formData.append("image", upload3);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError3("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError3(obj.error);
          error = true;
        }
      }
    } else if (banner3.trim().length) {
      banners.push(banner3.trim());
    }

    // Check banner 4
    if (upload4 !== null) {
      const formData = new FormData();
      formData.append("image", upload4);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError4("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError4(obj.error);
          error = true;
        }
      }
    } else if (banner4.trim().length) {
      banners.push(banner4.trim());
    }

    // Check banner 5
    if (upload5 !== null) {
      const formData = new FormData();
      formData.append("image", upload5);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError5("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError5(obj.error);
          error = true;
        }
      }
    } else if (banner5.trim().length) {
      banners.push(banner5.trim());
    }

    // Check banner 6
    if (upload6 !== null) {
      const formData = new FormData();
      formData.append("image", upload6);
      const results = await fetch(`${API_URL}/files/single`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        banners.push(obj.url);
      } else {
        const obj = await results.json();
        if (results.status === 500 || typeof obj.error === "undefined") {
          setErrorMessage("Failed to upload image. Please try again later.");
          setError6("Failed to upload image. Please try again later.");
          error = true;
        } else {
          setErrorMessage(obj.error);
          setError6(obj.error);
          error = true;
        }
      }
    } else if (banner6.trim().length) {
      banners.push(banner6.trim());
    }

    const bannersObject = {
      banners: banners
    };

    const results = await fetch(`${API_URL}/banners`, {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(bannersObject)
    });

    if (!results.ok) {
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

    return error;
  }

  // Submit info changes
  async function submitInfo() {
    // Create objects with the new info
    const leftObject = {
      title: leftTitle,
      text: leftText,
      icon: leftIcon
    };

    const rightObject = {
      title: rightTitle,
      text: rightText,
      icon: rightIcon
    };

    // Edit left info
    let results = await fetch(`${API_URL}/info/1`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(leftObject)
    });

    if (!results.ok) {
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

    if (!results.ok) {
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
  }

  // save the changes to the sponsors
  async function submitSponsors() {

    // Check for empty inputs
    if (checkInputs()) {
      return;
    }

    // save the order of the sponsors
    const copy = [...sponsors];
    for (let i = 0; i < copy.length; i++) {
      copy[i].orderIndex = i;
    }

    // Get all of the selected files to upload
    const uploadImages = [];
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].imageToUpload) {
        uploadImages.push(copy[i].imageToUpload);
      }
    }

    // see if we need to upload any images
    if (uploadImages.length) {
      const formData = new FormData();
      for (let i = 0; i < uploadImages.length; i++) {
        formData.append("images", uploadImages[i]);
      }
      const results = await fetch(`${API_URL}/files/bulk`, {
        method: "POST",
        credentials: "include",
        body: formData
      });

      if (results.ok) {
        const obj = await results.json();
        const urls = obj.urls;

        // update the urls for all of the sponsors
        for (let i = 0; i < urls.length; i++) {
          for (let j = 0; j < copy.length; j++) {
            if (copy[j].imageToUpload) {
              copy[j].imageToUpload = null;
              copy[j].imageUrl = urls[i];
              break;
            }
          }
        }
        setSponsors(copy);
      } else {
        console.error("Failed to upload images.");
      }
    }

    // see if all graphics are still valid
    for (let i = 0; i < copy.length; i++) {
      if (!copy[i].imageUrl.length) {
        setErrorMessage("Error: Invalid file to upload on line " + (i + 1));
        return;
      }
    }

    const data = {
      sponsors: copy
    };

    const results = await fetch(`${API_URL}/home/sponsors`, {
      method: "PATCH",
      credentials: "include",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    });

    if (results.ok) {

      // refresh the page
      window.location.reload();

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
  }

  // Submit all changes
  async function submitChanges() {

    setLoading(true);

    const error = await submitBanners();
    if (error === false) {
      submitInfo();
      submitSponsors();
    }

    setLoading(false);
  }

  // Update one of the sponsor fields
  function modifySponsors(text, fieldNumber, sponsorId) {

    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to edit");
      return;
    }

    if (fieldNumber === 1) {
      editedSponsors[arrayIndex].name = text;
      setSponsors(editedSponsors);
    } else if (fieldNumber === 2) {
      editedSponsors[arrayIndex].title = text;
      setSponsors(editedSponsors);
    } else if (fieldNumber === 3) {
      editedSponsors[arrayIndex].websiteUrl = text;
      setSponsors(editedSponsors);
    } else {
      editedSponsors[arrayIndex].imageUrl = text;
      setSponsors(editedSponsors);
    }
  }

  // Delete a sponsor
  function deleteSponsor(sponsorId) {
    if (!window.confirm("Are you sure you want to delete this sponsor?")) {
      return;
    }

    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to delete");
      return;
    }

    editedSponsors.splice(arrayIndex, 1);
    setSponsors(editedSponsors);
  }

  // Change the order that the sponsors are displayed in
  function changeOrder(up, sponsorId) {
    const editedSponsors = [...sponsors];
    let arrayIndex = -1;

    // Find the index of this sponsor
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId === sponsorId) {
        arrayIndex = i;
        break;
      }
    }

    // If we can not find the index, then exit
    if (arrayIndex === -1) {
      console.error("Unable to find the sponsor to reorder");
      return;
    }

    // Check if we are trying to move up or down the card
    if (up) {
      // if this is not the top item on the card, swap it with the item above it
      if (arrayIndex !== 0) {
        [editedSponsors[arrayIndex], editedSponsors[arrayIndex - 1]] = [editedSponsors[arrayIndex - 1], editedSponsors[arrayIndex]];
        setSponsors(editedSponsors);
      }
    } else {
      // if this is not the bottom item on the card, swap it with the item below it
      if (arrayIndex + 1 < editedSponsors.length) {
        [editedSponsors[arrayIndex], editedSponsors[arrayIndex + 1]] = [editedSponsors[arrayIndex + 1], editedSponsors[arrayIndex]];
        setSponsors(editedSponsors);
      }
    }
  }

  // Create a new sponsor
  function createSponsor() {
    const editedSponsors = [...sponsors];

    let newId = 1;

    // find the largest id from sponsors and increase it by 1
    for (let i = 0; i < editedSponsors.length; i++) {
      if (editedSponsors[i].sponsorId >= newId) {
        newId = editedSponsors[i].sponsorId + 1;
      }
    }

    const newSponsor = {
      sponsorId: newId,
      name: "",
      title: "",
      websiteUrl: "",
      imageUrl: ""
    };

    editedSponsors.push(newSponsor);
    setSponsors(editedSponsors);
  }

  // Check for empty inputs (name, description, urls)
  function checkInputs() {
    let emptyFound = false;
    let newErrorMessage = errorMessage;
    let i = 0;

    // Empty sponsor text
    for (i = 0; i < sponsors.length; i++) {
      const sponsor = sponsors[i];

      if (sponsor.name === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a name on line " + (i + 1);
        break;
      } else if (sponsor.title === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a description on line " + (i + 1);
        break;
      } else if (sponsor.websiteUrl === "") {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing a website URL on line " + (i + 1);
        break;
      } else if (sponsor.imageUrl === "" && !sponsor.imageToUpload) {
        emptyFound = true;
        newErrorMessage = "Error: Sponsor is missing an image URL on line " + (i + 1);
        break;
      }
    }
    setErrorMessage(newErrorMessage);
    if (emptyFound) { return true; }
    return false;
  }

  // store image information for the newly uploaded image
  function handleNewImage(newImage, sponsorId) {
    const copy = [...sponsors];

    for (let i = 0; i < copy.length; i++) {
      if (copy[i].sponsorId === sponsorId) {
        copy[i].imageToUpload = newImage;
        break;
      }
    }

    setSponsors(copy);
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

      {/* Card for setting homepage banners */}
      <div className="prompt-container my-3 p-5 bg-white card rounded shadow-sm">
        <span className="h3 mb-2">Banner Images</span>
        <span>
          Select up to six banner images to randomly display when users visit the homepage.
        </span>
        <span className="mb-5">
          Images should be approximately 4500 x 1000 pixels. Images should be no larger than 5MB in size.
        </span>

        <div className="mb-5">
          <img
            className="banner-preview"
            src={banner1}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner1}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner1(e.target.value)}
            required
          />
          <ImageInput id={1} onNewImage={(newImage) => setUpload1(newImage)} />
          <Error message={error1} />
        </div>

        <div className="mb-5">
          <img
            className="banner-preview"
            src={banner2}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner2}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner2(e.target.value)}
            required
          />
          <ImageInput id={2} onNewImage={(newImage) => setUpload2(newImage)} />
          <Error message={error2} />
        </div>

        <div className="mb-5">
          <img
            className="banner-preview"
            src={banner3}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner3}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner3(e.target.value)}
            required
          />
          <ImageInput id={3} onNewImage={(newImage) => setUpload3(newImage)} />
          <Error message={error3} />
        </div>

        <div className="mb-5">
          <img
            className="banner-preview"
            src={banner4}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner4}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner4(e.target.value)}
            required
          />
          <ImageInput id={4} onNewImage={(newImage) => setUpload4(newImage)} />
          <Error message={error4} />
        </div>

        <div className="mb-5">
          <img
            className="banner-preview"
            src={banner5}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner5}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner5(e.target.value)}
            required
          />
          <ImageInput id={5} onNewImage={(newImage) => setUpload5(newImage)} />
          <Error message={error5} />
        </div>

        <div>
          <img
            className="banner-preview"
            src={banner6}
            alt="Banner preview"
            onError={(e) => e.target.src = "/missing.png"}
          />
          <FormControl
            rows="1"
            className="my-3"
            maxLength="1000"
            placeholder="Enter banner image URL"
            defaultValue={banner6}
            aria-label="Banner image"
            aria-describedby="basic-addon1"
            onChange={(e) => setBanner6(e.target.value)}
            required
          />
          <ImageInput id={6} onNewImage={(newImage) => setUpload6(newImage)} />
          <Error message={error6} />
        </div>

      </div>

      {/* Table for setting homepage text */}
      <div className="prompt-container my-3 bg-white card rounded shadow-sm">
        <div className="prompt-container-home p-5 card">
          <span className="h3 mb-2">Text Blurbs</span>
          <span>
            Enter two text blurbs that you would like to display to users who visit the homepage.
          </span>
          <span className="mb-2">
            You may include icons that sit beneath the text blurbs.
          </span>
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
      </div>

      {/* Card for setting sponsors */}
      <div className="prompt-container my-3 bg-white card rounded shadow-sm p-5">
        <div className="prompt-container-home card">
          <span className="h3 mb-2">Sponsors</span>
          <span className="mb-5">
            Enter information about sponsors that you want displayed on the homepage.
          </span>
        </div>

        {sponsors.map((sponsor, i) =>
          <Fragment key={sponsor.sponsorId}>
            <Row className="my-2">
              <div className="input-group">
                <span className="ml-2 mr-3">
                  <button className='btn btn-danger btn-sm ml-2'
                    onClick={() => deleteSponsor(sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-times' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i ? "" : "disabled"}`}
                    onClick={() => changeOrder(true, sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-up' />
                  </button>
                  <button className={`btn btn-success btn-sm ml-2 ${i + 1 < sponsors.length ? "" : "disabled"}`}
                    onClick={() => changeOrder(false, sponsor.sponsorId)}
                    data-index={i}
                  >
                    <i className='fas fa-fw fa-arrow-down' />
                  </button>
                </span>
                <FormControl
                  as="textarea"
                  rows="3"
                  className="ml-3"
                  maxLength="1000"
                  placeholder="Name"
                  defaultValue={sponsor.name}
                  aria-label="Sponsor Name"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 1, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  as="textarea"
                  rows="3"
                  placeholder="Description"
                  maxLength="1000"
                  defaultValue={sponsor.title}
                  aria-label="Description"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 2, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  as="textarea"
                  rows="3"
                  placeholder="Website URL"
                  maxLength="1000"
                  defaultValue={sponsor.websiteUrl}
                  aria-label="Website URL"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 3, sponsor.sponsorId)}
                  required
                />
                <FormControl
                  as="textarea"
                  rows="3"
                  className="mr-3"
                  maxLength="1000"
                  placeholder="Image URL"
                  defaultValue={sponsor.imageUrl}
                  aria-label="Image URL"
                  aria-describedby="basic-addon1"
                  onChange={(e) => modifySponsors(e.target.value, 4, sponsor.sponsorId)}
                  required
                />
              </div>
            </Row>
            <Row className="sponsor-upload mr-1 mb-5">
              <ImageInput id={sponsor.sponsorId} onNewImage={(newImage) => handleNewImage(newImage, sponsor.sponsorId)} />
            </Row>
          </Fragment>
        )}

        <Button className="ml-auto" variant="info" onClick={() => createSponsor()}>
          Add Sponsor
        </Button>
      </div>

      {/* Error messages */}
      <div className="mx-3 my-3">
        <Error
          message={errorMessage}
        />

        {/* Save changes */}
      </div>
      <Row className="mt-5">
        <div className="col">
          <Button variant="primary" className="float-right btn-lg mr-3" onClick={() => submitChanges()}>
            Save changes
          </Button>
        </div>
      </Row>
    </div>

  );
}
export default ManageHome;

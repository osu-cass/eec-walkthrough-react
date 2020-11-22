import React, {useEffect, useState} from "react";
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

    if (results.ok) {

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
  }

  // Submit all changes
  async function submitChanges() {

    setLoading(true);

    const error = await submitBanners();
    if (error === false) {
      submitInfo();
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

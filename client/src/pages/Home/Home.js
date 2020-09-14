import React, {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import EditHome from "./EditHome";
import ManageSponsors from "./ManageSponsors";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import {APIURL} from "../../utilities/constants";
import "./Home.css";

// application homepage
function Home(props) {

  const [generalIcons, setGeneralIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sponsors, setSponsors] = useState([]);
  const [page, setPage] = useState({
    mainHeader: "",
    secondaryHeader: "",
    sectionsTitle: "",
    assessments: "",
    industries: "",
    processes: "",
    productivity: "",
    technologies: "",
    sectionsFooter: "",
    tidbitsHeader: "",
    tidbitsTitle: "",
    tidbitsFooter: "",
    linksHeader: "",
    linksTitlePrefix: "",
    linksTitlePostfixInternal: "",
    linksTitlePostfixDownload: "",
    linksFooter: "",
    disclaimerHeader: "",
    disclaimerText: "",
    categories: []
  });

  useEffect(() => {
    if (typeof props.loginStatusChange === "boolean") {
      fetchHome();
    }
  }, [props.loginStatusChange]);

  function handlePageEdit() {
    fetchHome();
  }

  // fetch homepage data
  async function fetchHome() {
    setLoading(true);

    // Fetch all icons
    let results = await fetch(`${APIURL}/icons/all`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const obj = await results.json();
      const general = [];
      const links = [];

      // Sort the icons by group
      for (let i = 0; i < obj.icons.length; i++) {
        if (obj.icons[i].groupIndex === 1 || obj.icons[i].groupIndex === 2) {
          general.push(obj.icons[i]);
        } else if (obj.icons[i].groupIndex === 3) {
          links.push(obj.icons[i]);
        }
      }

      setGeneralIcons(general);
      setLinkIcons(links);

    } else {
      console.error("Error fetching icon list");
    }

    // Fetch all homepage content
    results = await fetch(`${APIURL}/home`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const obj = await results.json();
      setPage(obj);

    } else {
      console.error("Error fetching homepage content");
    }

    // Fetch all sponsors
    results = await fetch(`${APIURL}/home/sponsors`, {
      method: "GET",
      credentials: "include",
      headers: {"Content-Type": "application/json"}
    });

    if (results.ok) {

      const obj = await results.json();
      setSponsors(obj.sponsors);

    } else {
      console.error("Error fetching sponsors");
    }

    setLoading(false);
  }

  return (
    <div className="container home-page-container">

      <LoadingOverlay loading={loading} />

      <div className="d-flex header-bar justify-content-between my-3 p-3 text-dark-50 rounded shadow-sm border generic-header-bar">
        <div className="row mx-2">
          <div className="col px-0">
            <h2 className="font-weight-bold">{page.mainHeader}</h2>
          </div>
        </div>
        <div className="row">
          <EditHome
            handlePageEdit={() => handlePageEdit()}
            loginStatusChange={props.loginStatusChange}
            page={page}
          />
          <ManageSponsors
            handlePageEdit={() => handlePageEdit()}
            loginStatusChange={props.loginStatusChange}
            sponsors={sponsors}
          />
        </div>
      </div>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h6>{page.secondaryHeader}</h6>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">{page.sectionsTitle}</div>

          {page.categories.map((category) =>
            <div key={category.categoryId}>
              <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
                <li>
                  <NavLink to={`/page-list/${category.categoryId}`}><b>{category.pluralName}: </b></NavLink>
                  <span className="font-weight-normal">{category.description}</span>
                </li>
              </ul>
            </div>
          )}

          <div>
            <span className="font-italic allow-newlines">{page.sectionsFooter}</span>
          </div>
        </div>
      </Card>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>{page.tidbitsHeader}</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">{page.tidbitsTitle}</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              {generalIcons.map((icon) =>
                <li className="my-2" key={icon.iconType}>
                  <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}} />
                  <span className="font-weight-normal">{icon.typeKeyword}</span>
                </li>
              )}
            </ul>
          </div>
          <div>
            <span className="font-italic allow-newlines">{page.tidbitsFooter}</span>
          </div>
        </div>
      </Card>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>{page.linksHeader}</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">{page.linksTitlePrefix}</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              {linkIcons.map((icon) =>
                <li className="my-2" key={icon.iconType}>
                  <i className={`fas fa-fw fa-${icon.typeName} mr-2`} style={{color: icon.color}} />
                  <span className="font-weight-normal">{icon.typeKeyword}</span>
                </li>
              )}
            </ul>
          </div>
          <div className="font-weight-bold mb-3">{page.linksTitlePostfixInternal}</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              <li className="my-2">
                <i className={`fas fa-fw fa-info mr-2`} />
                <span className="font-weight-normal">In Depth OSU EEC Resource</span>
              </li>
              <li className="my-2">
                <i className={`fas fa-fw fa-link mr-2`} />
                <span className="font-weight-normal">Link to external resource</span>
              </li>
            </ul>
          </div>
          <div className="font-weight-bold mb-3">{page.linksTitlePostfixDownload}</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              <li className="my-2">
                <i className={`fas fa-fw fa-download mr-2`} />
                <span className="font-weight-normal">Download of learning resource</span>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-italic allow-newlines">{page.linksFooter}</span>
          </div>
        </div>
      </Card>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>Content Contributors</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="my-2">
            <span>
              This guide includes content developed by past <a href="https://eec.oregonstate.edu/book/our-alumni">OSU EEC Alumni &amp; Faculty</a> that participated the OSU Energy Efficiency Center and Industrial Assessment Center project since its inception in 1986.
              New Content is being added regularly by current <a href="https://eec.oregonstate.edu/our-people">OSU EEC Students &amp; Faculty</a>.
            </span>
          </div>
        </div>
      </Card>

      {sponsors.length ? (
        <Card className="my-2 mb-5">
          <Card.Header>
            <h5>Sponsors</h5>
          </Card.Header>
          <Col className="my-4">
            {sponsors.map((sponsor) =>
              <img
                key={sponsor.name}
                src={sponsor.imageUrl}
                alt={sponsor.name}
                title={sponsor.name}
                className="expandable-image img-fluid img-thumbnail ml-5"
              />
            )}
          </Col>

          <div className="p-4 my-2 text-dark-50 bg-white" >
            <div className="font-weight-bold mb-3">This guide has been developed with support from</div>
            {sponsors.map((sponsor) =>
              <div key={sponsor.name}>
                <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
                  <li>
                    <a href={sponsor.websiteUrl}>{sponsor.title}</a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </Card>
      ) : (
        null
      )}

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>{page.disclaimerHeader}</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="mb-3">
            <small className="allow-newlines">
              {page.disclaimerText}
            </small>
          </div>
        </div>
      </Card>

    </div>
  );
}
export default Home;

Home.propTypes = {
  loginStatusChange: PropTypes.bool
};

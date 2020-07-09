import React, {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import EditHome from "./EditHome";
import PropTypes from "prop-types";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./Home.css";

function Home(props) {

  const [generalIcons, setGeneralIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);
  const [loading, setLoading] = useState(false);
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
    disclaimerText: ""
  });

  useEffect(() => {
    fetchHome();
  }, []);

  function handlePageEdit() {
    fetchHome();
  }

  // fetch homepage data
  async function fetchHome() {
    setLoading(true);

    // Fetch all icons
    let results = await fetch(`/icons/all`);

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
    results = await fetch(`/home`);

    if (results.ok) {

      const obj = await results.json();
      setPage(obj);

    } else {
      console.error("Error fetching homepage content");
    }

    setLoading(false);
  }

  return (
    <div className="container home-page-container">

      <LoadingOverlay loading={loading} />
      <Card className="my-2 mb-5">
        <Card.Header>
          <div className="row">
            <div className="col">
              <h2>{page.mainHeader}</h2>
            </div>
            <div>
              <EditHome
                handlePageEdit={() => handlePageEdit()}
                loginStatusChange={props.loginStatusChange}
                page={page}
              />
            </div>
          </div>
          <span>{page.secondaryHeader}</span>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">{page.sectionsTitle}</div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/assessment"><b>Assessments: </b></NavLink>
                <span className="font-weight-normal">{page.assessments}</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/industry"><b>Industries: </b></NavLink>
                <span className="font-weight-normal">{page.industries}</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/process"><b>Processes: </b></NavLink>
                <span className="font-weight-normal">{page.processes}</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/productivity"><b>Productivity: </b></NavLink>
                <span className="font-weight-normal">{page.productivity}</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/technology"><b>Technologies: </b></NavLink>
                <span className="font-weight-normal">{page.technologies}</span>
              </li>
            </ul>
          </div>
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
                  <i className={`fas fa-fw fa-${icon.typeName} mr-2`} />
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
                    <i className={`fas fa-fw fa-${icon.typeName} mr-2`} />
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

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>Sponsors</h5>
        </Card.Header>
        <Col className="my-4">
          {/*
          <img
            src={"/images/BPA.png"}
            alt={"Industrial Assessment Center"}
            title={"Industrial Assessment Center"}
            className="expandable-image img-fluid img-thumbnail mr-5"
          />
          */}
          <img
            src={"/images/IAC.png"}
            alt={"Industrial Assessment Center"}
            title={"Industrial Assessment Center"}
            className="expandable-image img-fluid img-thumbnail ml-5"
          />
        </Col>

        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">This guide has been developed with support from</div>
          {/*
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <a href="https://www.bpa.gov/pages/home.aspx">The Bonneville Power Administration</a>
              </li>
            </ul>
          </div>
          */}
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <a href="https://www.energy.gov/eere/amo/industrial-assessment-centers-iacs">U.S. Department of Energy, Office of Energy Efficiency &amp; Renewable Energy, Advanced Manufacturing Office, Industrial Assessment Centers</a>
              </li>
            </ul>
          </div>
        </div>
      </Card>

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

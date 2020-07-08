import React, {useEffect, useState} from "react";
import {Card, Col} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LoadingOverlay from "../../components/General/LoadingOverlay";
import "./Home.css";

function Home() {

  const [generalIcons, setGeneralIcons] = useState([]);
  const [linkIcons, setLinkIcons] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIcons();
  }, []);

  // fetch icon data
  async function fetchIcons() {
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

    setLoading(false);
  }

  return (
    <div className="container home-page-container">

      <LoadingOverlay loading={loading} />
      <Card className="my-2 mb-5">
        <Card.Header>
          <h2>Welcome to the Industrial Walkthrough Checklist &amp; Reference!</h2>
          <span>This purpose of this guide is to provide users with an easily accessible reference of common efficiency improvement opportunities to look for in an industrial facility.</span>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">This guide is broken down into sections:</div>
          
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/technology"><b>Technologies</b></NavLink>
                <span className="font-weight-normal">: An introduction to an industrial technology.</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/process"><b>Processes</b></NavLink>
                <span className="font-weight-normal">: An introduction to a process or technique.</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/productivity"><b>Productivity</b></NavLink>
                <span className="font-weight-normal">: An introduction to a specific improvement opportunity to consider.</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/assessment"><b>Assessments</b></NavLink>
                <span className="font-weight-normal">: An introduction to a method for evaluating or estimating.</span>
              </li>
            </ul>
          </div>

          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle"}}>
              <li>
                <NavLink to="/page-list/industry"><b>Industries</b></NavLink>
                <span className="font-weight-normal">: An overview of the industry is followed by a list of common related subjects.</span>
              </li>
            </ul>
          </div>

        </div>
      </Card>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>Each section includes a number of useful pertinent &quot;tidbits&quot; identified by a preceding icon</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">These include</div>
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
            <span className="font-italic">Note: &quot;tidbit&quot; types can be toggled between &quot;hidden&quot; and &quot;unhidden&quot; by clicking the icon in the header bars of each section.</span>
          </div>
        </div>
      </Card>

      <Card className="my-2 mb-5">
        <Card.Header>
          <h5>Each section also references in depth learning resources that offer deeper information about the topic. These are identified by a pair of icons</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="font-weight-bold mb-3">A preceding icon identifies the type of learning resource offered</div>
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
          <div className="font-weight-bold mb-3">A trailing icon identifies the learning resource as internal or external</div>
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
          <div className="font-weight-bold mb-3">A second trailing icon will indicate when the learning resource is a download</div>
          <div>
            <ul className="text-left" style={{display: "inline-block", verticalAlign: "middle", listStyleType: "none"}}>
              <li className="my-2">
                <i className={`fas fa-fw fa-download mr-2`} />
                <span className="font-weight-normal">Download of learning resource</span>
              </li>
            </ul>
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
          <h5>Disclaimer</h5>
        </Card.Header>
        <div className="p-4 my-2 text-dark-50 bg-white" >
          <div className="mb-3">
            <small>
              The primary objective of the OSU EEC is to promote energy efficiency, waste minimization, and productivity in the industrial, commercial, agricultural, and residential sectors. A key strategy has included performance of energy and efficiency site assessments. This work is intended is to provide background and tools that will be helpful in identifying and evaluating potential opportunities.
            </small>
          </div>
          <div className="my-3">
            <small>
              We believe Industrial Walkthrough Checklist &amp; Reference to be a reasonably accurate representation of opportunities to reduce energy use, lower waste generation, and make production practices more efficient. However, the OSU EEC cannot guarantee the accuracy, completeness, or usefulness of the information contained on this website, nor assume any liability for damages resulting from the use of any information, equipment, method or process disclosed on this website.
            </small>
          </div>
          <div className="my-3">
            <small>
              Pollution prevention recommendations are not intended to deal with the issue of compliance with applicable environmental regulations. Questions regarding compliance should be addressed to either a reputable consulting engineering firm experienced with environmental regulations or to the appropriate regulatory agency. Clients are encouraged to develop positive working relationships with regulators so that compliance issues can be addressed and resolved.
            </small>
          </div>
          <div className="my-3">
            <small>
              The assumptions and equations used to arrive at energy, waste, productivity, and cost savings for the opportunities are presented on this website. We believe the assumptions to be conservative. If you would like to revise the assumptions you may follow the calculation methodologies presented using adjusted assumptions to develop your own revised estimates of energy, waste, productivity, and cost savings.
            </small>
          </div>
          <div className="mt-3">
            <small>
              Please feel welcome to contact the OSU EEC if you would like to discuss the content of this website or if you have another question about energy use or pollution prevention.
            </small>
          </div>
        </div>
      </Card>

    </div>
  );
}
export default Home;

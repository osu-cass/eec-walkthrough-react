import React, {Fragment} from "react";
import {getProfile} from "../../utilities/cookieAuth";
import Header from "./Header";
import PageDescription from "./PageDescription";
import CardContainer from "./CardContainer";
import FilterBar from "./FilterBar";
import Loading from "../../components/General/Loading";
import CreateCard from "./CreateCard";
import CreateHeader from "./CreateHeader";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import Error404 from "../404/Error404";
import Error500 from "../500/Error500";
import "./ContentPage.css";

// a page describing an industry or subject
class ContentPage extends React.Component {

  state = {
    errorPage: false,
    sidebarOpen: false,
    pageInfo: [],
    headers: [],
    icons: [],
    cards: [],
    iconSet: []
  }

  async componentDidMount() {
    await this.fetchData(); // Get data about this subject (subject info, cards, figures)
    this.setState({role: getProfile().role});
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.pageId !== prevProps.match.params.pageId) { // Reload state when switching between subjects
      await this.fetchData();
      this.setState({headers: this.state.pageInfo.headers});
    }
  }

  async fetchData() {
    let i = [];
    let j = [];
    const icons = [];

    // Reset state for page load
    this.setState({cards: [], headers: [], icons: [], loaded: false});

    // Fetch all icons
    let results = await fetch(`/icons/all`);

    if (results.ok) {
      const obj = await results.json();
      this.setState({iconSet: obj.icons});
    } else {
      this.setState({errorPage: 500});
      return;
    }

    // Fetch page info
    results = await fetch(`/pages/${this.props.pageId}/all`);

    if (results.ok) {
      const obj = await results.json();
      this.setState({pageInfo: obj});
    } else {
      if (results.status === 404) {
        this.setState({errorPage: 404});
        return;
      } else {
        this.setState({errorPage: 500});
        return;
      }
    }

    // Headers
    this.setState({headers: this.state.pageInfo.headers});

    // Split icons for each header
    for (i = 0; i < this.state.headers.length; i++) {
      icons[i] = this.state.headers[i].icons;
      for (j = 0; j < icons[i].length; j++) {
        icons[i][j].hidden = false;
      }
    }

    this.setState({icons: icons});
    this.setState({loaded: true});
  }

  handleFilter = (id, idx) => {
    const icons = [...this.state.icons]; // Create copy of object, update object, set state with new copy
    let i;
    for (i = 0; i < icons[idx].length; i++) {
      if (icons[idx][i].iconType === id) {
        icons[idx][i].hidden = !icons[idx][i].hidden; // Update object and change hidden to opposite
      }
    }
    this.setState({icons: icons});
  }

  resetFilter(headerIdx) {
    const icons = [...this.state.icons]; // Create copy of object, update object, set state with new copy
    let i;
    for (i = 0; i < icons[headerIdx].length; i++) {
      icons[headerIdx][i].hidden = false; // Change everything to not hidden
    }
    this.setState({icons: icons});
  }

  render() {
    if (!this.state.errorPage) {
      return this.state.loaded ? ( // Render content when data loaded from backend
        <Container>
          <Header subjectName={this.state.pageInfo.name} approved={this.state.pageInfo.approved} mainPageHeader={true}/>

          <PageDescription
            approved={this.state.pageInfo.approved}
            header={this.state.pageInfo.title}
            description={this.state.pageInfo.description}
            img={this.state.pageInfo.imageUrl}
          />

          <CreateHeader
            pageId={parseInt(this.props.pageId)}
            role={this.state.role}
            userId={this.state.userId}
            subject={this.state.pageInfo.name}
            refresh={() => this.fetchData()}
            numHeaders={this.state.pageInfo.headers.length}
          />

          {this.state.headers.map((header, i) => {
            return (
              <Fragment key={i}>
                <Header subjectName={header.title} approved={header.approved} mainPageHeader={false} sticky>
                  <FilterBar
                    data={this.state.icons[i]}
                    headerIndex={i}
                    handleFilter={this.handleFilter}
                    resetFilter={(idx) => this.resetFilter(idx)}
                  />
                </Header>
                <CardContainer
                  id={i}
                  cards={this.state.headers[i].cards}
                  filter={this.state.icons[i]}
                  headerId={header.headerId}
                  headerName={header.title}
                  iconSet={this.state.iconSet}
                  refresh={() => this.fetchData()}
                />
                <CreateCard
                  title={`Create ${header.title} Card`}
                  icons={this.state.iconSet}
                  numCards={this.state.headers[i].cards.length}
                  headerId={header.headerId}
                  pageType={1}
                  refresh={() => this.fetchData()}
                />
              </Fragment>
            );
          })}

        </Container>
      ) : <Loading />;
    } else if (this.state.errorPage === 404) {
      return <Error404 />
    } else {
      return <Error500 />
    }
  }
}
export default ContentPage;

ContentPage.propTypes = {
  match: PropTypes.any,
  pageId: PropTypes.any
};
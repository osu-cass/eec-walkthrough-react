import React, {Fragment} from "react";
import {getProfile} from "../../utilities/cookieAuth";
import PageCard from "./PageCard";
import SubjectIntro from "./SubjectIntro";
import CardContainer from "./CardContainer";
import FilterBar from "./FilterBar";
import Loading from "../../components/General/Loading";
import CreateCard from "./CreateCard";
import CreateHeader from "./CreateHeader";
import Container from "react-bootstrap/Container";
import PropTypes from "prop-types";
import "./ContentPage.css";


class ContentPage extends React.Component {
  state = {
    errorPage: false,
    sidebarOpen: false,
    pageInfo: [],
    subjectInfo: [],
    headers: [],
    icons: [],
    cards: [],
    iconSet: []
  }

  async componentDidMount() {
    await this.fetchData(); // Get data about this subject (subject info, cards, figures)
    await this.setState({role: getProfile().role});
  }

  async componentDidUpdate(prevProps) {
    if (this.props.match.params.pageId !== prevProps.match.params.pageId) { // Reload state when switching between subjects
      await this.fetchData();
      await this.setState({headers: this.state.pageInfo.headers});
    }
  }

  async fetchData() {
    let i = [];
    let j = [];
    const icons = [];

    // Reset state for page load
    this.setState({cards: [], headers: [], icons: [], loaded: false});

    // Fetch all icons
    let results = fetch(`/icons/all`);

    if (results.ok) {
      const obj = await results.json();
      this.setState({iconSet: obj.icons});
    } else {
      this.setState({errorPage: 500});
    }

    // Fetch page info
    results = await fetch(`/pages/${this.props.pageId}/all`);

    if (results.ok) {
      const obj = await results.json();
      this.setState({pageInfo: obj});
      this.setState({subjectInfo: obj});
    } else {
      if (results.status === 404) {
        this.setState({errorPage: 404});
      } else {
        this.setState({errorPage: 500});
      }
    }

    // Headers
    await this.setState({headers: this.state.pageInfo.headers});

    // Split icons for each header
    for (i = 0; i < this.state.headers.length; i++) {
      icons[i] = this.state.headers[i].icons;
      for (j = 0; j < icons[i].length; j++) {
        icons[i][j].hidden = false;
      }
    }

    await this.setState({icons: icons});
    await this.setState({loaded: true});
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
    return this.state.loaded ? ( // Render content when data loaded from backend
      <Container>
        <PageCard subjectName={this.state.subjectInfo.name} />

        <SubjectIntro
          header={this.state.subjectInfo.title}
          description={this.state.subjectInfo.description}
          img={this.state.subjectInfo.imageUrl}
        />

        <CreateHeader
          pageId={parseInt(this.props.pageId)}
          role={this.state.role}
          userId={this.state.userId}
          subject={this.state.subjectInfo.name}
          refresh={() => this.fetchData()}
          numHeaders={this.state.pageInfo.headers.length}
        />

        {this.state.headers.map((header, i) => {
          return (
            <Fragment key={i}>
              <PageCard subjectName={header.title} sticky>
                <FilterBar
                  data={this.state.icons[i]}
                  headerIndex={i}
                  handleFilter={this.handleFilter}
                  resetFilter={(idx) => this.resetFilter(idx)}
                />
              </PageCard>
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
  }
}
export default ContentPage;

ContentPage.propTypes = {
  match: PropTypes.any,
  pageId: PropTypes.any
};
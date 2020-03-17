import React from 'react'
import './Sidebar.css'
import { Route, Switch, NavLink } from 'react-router-dom';
import Subject from './Subject'

class Sidebar extends React.Component {
	state = {
		subjects: []
	}
	
	constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
		fetch('/subjects/all')
			.then(res => res.json())
			.then(subjects => this.setState({subjects}));
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**** Alert if clicked on outside of element **/
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			if(this.props.className === "visible")	//if sidebar is open, close sidebar
	    	this.onDismiss();
		}
  }

  onDismiss = () => {
    this.props.handleSidebar()
  }

  render() {
    return (
      <div className={'wrapper ' + this.props.className} ref={this.setWrapperRef}>
        <nav id="sidebar">
          <div id="dismiss" onClick={this.onDismiss}>
            <i className="fas fa-arrow-left"></i>
          </div>

          <div className="sidebar-header">
            <h3>Directory</h3>
          </div>

          <ul className="list-unstyled components">
            <li>
							<NavLink to={`/`}>
								Home
							</NavLink>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                Subjects
              </a>
              <ul className="collapse list-unstyled" id="pageSubmenu"> 
								{/* For each Subject create a link */}
								{this.state.subjects.map(sub => {
									return (
											this.state.subjects.length > 0 ?
											<li key={sub.SubjectID}>
												<NavLink to={`/subjects/${sub.SubjectID}`}>
													{sub.SubjectName}
												</NavLink>
												{/*<a href={`/subjects/${sub.SubjectID}`}>{sub.SubjectName}</a>*/}
											</li>
											: <li> No Subjects Found </li>
									);
								})}
              </ul>
              <a
                href="#industrySubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                Industries
              </a>
              <ul className="collapse list-unstyled" id="industrySubmenu">
                <li>
                  <a href="/">Electricity</a>
                </li>
                <li>
                  <a href="/">Plywood</a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
							<NavLink to={`/`} className="article" onClick={this.onDismiss}>
								Back to Page
							</NavLink>
            </li>
          </ul>
        </nav>

        <div className="overlay"></div>
      </div>
    )
  }
}

export default Sidebar

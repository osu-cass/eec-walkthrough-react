import React from 'react'
import './Sidebar.css'

class Sidebar extends React.Component {
	state = {
		subjects: []
	}
	componentDidMount(){
			fetch('/subjects')
				.then(res => res.json())
				.then(subjects => this.setState({subjects}));
	}

  onDismiss = () => {
    this.props.handleSidebar()
  }

  render() {
    return (
      <div className={'wrapper ' + this.props.className}>
        <nav id="sidebar">
          <div id="dismiss" onClick={this.onDismiss}>
            <i className="fas fa-arrow-left"></i>
          </div>

          <div className="sidebar-header">
            <h3>Directory</h3>
          </div>

          <ul className="list-unstyled components">
            <li>
              <a href="/">Home</a>
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
											<li>
												<a href={`subjects/${sub.SubjectID}`}>{sub.SubjectName}</a>
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
                  <a href="#">Electricity</a>
                </li>
                <li>
                  <a href="#">Plywood</a>
                </li>
              </ul>
            </li>
          </ul>

          <ul className="list-unstyled CTAs">
            <li>
              <a href="#" className="article" onClick={this.onDismiss}>
                Back to Page
              </a>
            </li>
          </ul>
        </nav>

        <div className="overlay"></div>
      </div>
    )
  }
}

export default Sidebar

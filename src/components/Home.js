import React from 'react'
import './Subject.css'

class Home extends React.Component {
  render() {
    return (
      <div className="container">
				<div className='row'>
					<div className='col-6'>
						<h1>Progress Notes and TODO</h1>
						<ul>
							<li>Multiple icons can be used per category</li>
							<li>Made some styling changes (colors, spacing, etc.)</li>
							<li>TODO:</li>
							<ul>	
								<li>Make "Opportunities to Consider" bar appear before first Opportunity</li>
								<li>Implement BrowserRouter and Links in Sidebar </li>
								<li>Implement autocomplete on Search</li>
								<li>Implement Create/Update on Subjects</li>
							</ul>
						</ul>
					</div>

					<div className='col-6'>
						<h1>Questions</h1>
						<ul>
							<li> What do the icons on the header of the opportunities mean? (ex. Checkboxes, spark, plug) </li>
							<li> In order to do filter, categories would need a corresponding icon or "tidbit type" </li>
						</ul>
					</div>
				</div>
			</div>
    )
  }
}

export default Home 

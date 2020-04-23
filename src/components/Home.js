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
							<li>Basics of Create Categories/Tidbits done</li>
								<li>Need to add subpoints, icons in select dropdown</li>
						</ul>
					</div>

					<div className='col-6'>
						<h1>Questions</h1>
						<ul>
							<li>Add a "Tag" column to icon to describe what it is (ex: plus -> Pro; skull -> Danger)</li>
							<li>Add a "Category Type" column to Categories. Category Types table would contain types of categories
                                like Opportunity, Site Resource, Figure, Basic (pro, cons, etc). Would lessen the amount of redundant tables
                                needed, like having Site Resources (very similar to Categories) </li>
                            <li>Site Resources: Is the Resource Type (document, vendor sites, slideshows, videos) tied to a specific icon? Or is the icon tied to the link </li>
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default Home

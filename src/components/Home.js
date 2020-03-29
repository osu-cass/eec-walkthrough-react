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

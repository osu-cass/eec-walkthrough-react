import React from "react";

class Search extends React.Component {
	state = {
		input: "",
		subjects: [], // all subjects
		reduced: [], // reduced result after every input
	};

	// componentDidMount() {
	// 	fetch('/subjects/all')
	// 		.then(res => res.json())
	// 		.then(subjects => {
	// 			subjects.map((subject) => {
	// 				let sub = {
	// 					id: subject.SubjectID,
	// 					name: subject.SubjectName.toLowerCase()
	// 				}
	// 				let merged = this.state.subjects.concat(sub);
	// 				this.setState({ subjects: merged });
	// 			})
	// 		});
	// }

	// componentDidUpdate(prevProp, prevState) {
	// 	if (prevState.input !== this.state.input) {
	// 		let i;
	// 		let merged = [];
	// 		this.setState({ reduced: [] })
	// 		for (i = 0; i < this.state.subjects.length; i++) {
	// 			let sub = this.state.subjects[i];
	// 			if (sub.name.includes(this.state.input)) {
	// 				merged.push(sub)
	// 				this.setState({ reduced: merged });
	// 			}
	// 		}
	// 	}
	// }

	render() {
		return (
			<div className='login'>
				{/* Login Button */}
				<form className='form-inline'>
					{/*
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						onChange={(e) => this.setState({ input: e.target.value.toLowerCase() })}
						value={this.state.input}
					/>
					*/}
					<a href='#'>
						<i className='fas fa-search text-white'></i>
					</a>
				</form>
			</div>
		);
	}
}

export default Search;

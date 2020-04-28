import React from 'react'
import Card from './Card'
import Image from './Image'

class FigureContainer extends React.Component {
  state = {
		categories: [],
		loaded: false
  }

	generateFigures(){
		let Cards = this.props.figures.map((figure, i) => {				//Loop through Categories
            return(
                <Image
                    URL={figure.FigureImage}
                    caption={figure.FigureCaption}
                />
            );
        })
        console.log(Cards);
		return Cards
	}

	render() {
        return this.props.figures.length ? ( //Render content when data loaded from backend
        <div className={`my-2 pl-3 pt-2 bg-${this.props.color} card rounded shadow-sm ${this.props.checkFilter}`}>
            <div id="header" className="justify-content-between border-bottom border-gray">
                <h5 className='font-weight-bold'>Figures, Charts, and Tables</h5>
            </div>
            {this.generateFigures()}
        </div>
		) : "";
	}
}

export default FigureContainer

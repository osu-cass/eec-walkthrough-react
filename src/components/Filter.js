import React from 'react';
import './Filter.css'

class Filter extends React.Component {
    state = {
        active: false
    }

    handleClick = () => {
        this.setState({active: !this.state.active});
        this.props.handleFilter(this.props.id);
    }

    render(){
        return(
            <i 
                id={this.props.id} 
                className={`fas fa-${this.props.icon} ${this.state.active ? 'fa-disabled' : ''} text-dark mr-3`}
                onClick={this.handleClick}
            ></i>
        );
    }
}

export default Filter;

      
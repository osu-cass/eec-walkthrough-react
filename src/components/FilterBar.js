import React from 'react';
import Filter from './Filter';

class FilterBar extends React.Component {
    render(){
        return (
            <span className='mr-5 mt-1 icons'>
                {
                this.props.data.map((obj, i) => {
                    return(
                        <Filter 
                            id={obj.id} 
                            icon={obj.icon}
                            handleFilter={this.props.handleFilter}
                        />
                    ) 
                })
                }
                <i id='reset' className={`fas fa-undo text-dark mr-3`} value="reset"></i>
            </span>
        );
    }
}

export default FilterBar;

      
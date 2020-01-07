import React from 'react';

const Search = (props) => {
    return (
        <div className='login'>
            {/* Login Button */}
            <form className="form-inline">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <a href="#"><i className="fas fa-search text-white"></i></a>
            </form>
        </div>
    );
}

export default Search;
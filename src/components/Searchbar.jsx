import React from 'react';
import './Searchbar.css'

const Searchbar = ({searchTerm, onSearchChange})=>{
    return (
        <div className='searchbar-container'>
            <input
            type='text'
            className='search-input'
            placeholder='search for a movie...'
            value={searchTerm}
            onChange={(e)=>onSearchChange(e.target.value)}
            />
        </div>
    );
};

export default Searchbar;
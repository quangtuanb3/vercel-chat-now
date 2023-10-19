import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';


const SearchForm = ({ onSearch }) => {

    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSearch(searchQuery);
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <TextField
                id="search-input"
                label="Search chat rooms or users"
                variant="outlined"
                value={searchQuery}
                onChange={handleInputChange}
            />
        </form>
    );
};

export default SearchForm;

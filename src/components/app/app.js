import React, { useState } from 'react';
import SearchBar from '../search-bar/search-bar';
import SortDropdown from '../sort-dropdown/sort-dropdown';
import CardList from '../card-list/card-list';
import { SORT_OPTIONS } from '../../constants/sort-options';
import '../app/app.css';


const App = props => {
    const [term, setTerm] = useState('');
    const [sort, setSort] = useState(SORT_OPTIONS[0]);

    /**
      * Sets the sort criteria for the application.
      *
      * @param {Object} sortValue - SORT_OPTIONS element object.
      */
    const setSortChange = (sortValue) => {
        setSort(sortValue);
    }

    /**
     * Sets the searchTerm (query filter) criteria for the application.
     *
     * @param {String} termValue - String to match against card name.
     */
    const setTermChange = (termValue) => {
        console.log('termValue', termValue)
        setTerm(termValue);
    }

    return (
        <div>
            <div className="ui segment">
                <SearchBar term={term} onTermChange={setTermChange} />
                <SortDropdown sort={sort} onSortChange={setSortChange} />
            </div>
            <CardList term={term} sort={sort} />
        </div>
    );
}

export default App;

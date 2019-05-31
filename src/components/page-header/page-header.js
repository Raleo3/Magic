import React from 'react';
import SearchBar from '../search-bar/search-bar';
import SortDropdown from '../sort-dropdown/sort-dropdown';
import './page-header.css';


class PageHeader extends React.Component {
    render () {
        return (
            <div className="ui segment">
                <SearchBar term={this.props.term} onTermChange={this.props.onTermChange} />
                <SortDropdown sort={this.props.sort} onSortChange={this.props.onSortChange} />
            </div>
        );
    }
}

export default PageHeader;

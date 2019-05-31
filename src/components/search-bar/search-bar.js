import React from 'react';
import './search-bar.css';


class SearchBar extends React.Component {
     onFormSubmit(event) {
         event.preventDefault();
     }

     onFormChange(event) {
         this.props.onTermChange(event.target.value);
     }

    render () {
        return (
            <form onSubmit={e => this.onFormSubmit(e)} className="ui form search">
                <div className="field">
                    <label>Card Search (by name)</label>
                    <input type='text' value={this.props.term} onChange={e => this.onFormChange(e)} />
                </div>
            </form>
        );
    }
}

export default SearchBar;

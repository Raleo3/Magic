import React from 'react';
import PageHeader from '../page-header/page-header';
import CardList from '../card-list/card-list';
import { SORT_OPTIONS } from '../../constants/sort-options';
import '../app/app.css';

class App extends React.Component {
    state = {
        term: '',
        sort: SORT_OPTIONS[0]
     };

     onSortSelection(selection) {
        this.setState({ sort: selection });
     }

    onSearchUpdate (term) {
        this.setState({ term: term });
    }

    render () {
        return (
            <div>
                <PageHeader term={this.state.term} sort={this.state.sort} onSortChange={selection => this.onSortSelection(selection)} onTermChange={term => this.onSearchUpdate(term)}  />
                <CardList term={this.state.term} sort={this.state.sort} />
            </div>
        );
    }
}

export default App;

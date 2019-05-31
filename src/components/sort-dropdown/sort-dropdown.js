import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './sort-dropdown.css';
import { SORT_OPTIONS } from '../../constants/sort-options';

class SortDropdown extends React.Component {

    onSelect(event) {
      this.props.onSortChange(event);
    }

    render () {
        return (
          <form className="ui form sort">
              <div className="field">
                  <label>Card Sort</label>
                  <Dropdown options={SORT_OPTIONS} onChange={e => this.onSelect(e)} value={this.props.sort.label} placeholder="Select an option" />
              </div>
          </form>
        );
    }
}

export default SortDropdown;

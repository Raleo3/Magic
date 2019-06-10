import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './sort-dropdown.css';
import { SORT_OPTIONS } from '../../constants/sort-options';

const SortDropdown = props => {

    /**
     * Executes setSortChange function sent from parent to initiate term value state update
     *
     * @param {event} SORT_OPTIONS object
     */
    const onSelect = (event) => {
      props.onSortChange(event);
    }

    return (
      <form className="ui form sort">
          <div className="field">
              <label>Card Sort</label>
              <Dropdown options={SORT_OPTIONS} onChange={e => onSelect(e)} value={props.sort.label} placeholder="Select an option" />
          </div>
      </form>
    );
}

export default SortDropdown;

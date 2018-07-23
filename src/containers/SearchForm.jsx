import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setPlace, startSearch } from '../actions/';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.history.push(`/?place=${props.place}`);
      props.startSearch();
    }}
  >
    <input
      className="search-form__input"
      size="30"
      type="text"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.setPlace(e.target.value);
      }}
    />
    <input className="search-form__submit" type="submit" value="serach" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  setPlace: PropTypes.func.isRequired,
  startSearch: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

// 上段で定義した関数をもとにstoreとバインドしている
export default connect(
  state => ({
    place: state.place,
  }),
  { setPlace, startSearch },
)(SearchForm);

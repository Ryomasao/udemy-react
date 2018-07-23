import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { geocode } from '../domain/Geocoder';
//import { searchHotelByLocation } from '../domain/HotelRepository';

const SearchForm = props => (
  <form
    className="search-form"
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit(props.place);
    }}
  >
    <input
      className="search-form__input"
      size="30"
      type="text"
      value={props.place}
      onChange={(e) => {
        e.preventDefault();
        props.onPlaceChange(e.target.value);
      }}
    />
    <input className="search-form__submit" type="submit" value="serach" />
  </form>
);

SearchForm.propTypes = {
  place: PropTypes.string.isRequired,
  onPlaceChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

// 状態を持つプロパティの定義
const mapStateToProps = state => ({
  place: state.place,
  geocodeResult: state.geocodeResult,
});

// 状態を更新するアクションの定義
const mapDispatchToProps = dispatch => ({
  onPlaceChange: place => dispatch({ type: 'CHANGE_PLACE', place }),
  onSubmit: (place) => {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            dispatch({ type: 'GEOCODE_FETCHED', address, location });
            // return searchHotelByLocation(location);
            break;
          }
          case 'ZERO_RESULTS': {
            // this.setErrorMessage('結果がみつかりません');
            break;
          }
          default: {
            // this.setErrorMessage('APIのエラー');
            break;
          }
        }
        return [];
      });
      // .then((hotels) => {
      //   this.setState({ hotels: sortedtHotels(hotels, this.state.sortKey) });
      // })
      // .catch((error) => {
      //   console.log(error);
      //   this.setErrorMessage('axiosのエラー');
      // });
  }
});

// 上段で定義した関数をもとにstoreとバインドしている
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

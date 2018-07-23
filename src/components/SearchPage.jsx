import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import queryString from 'query-string';

import SearchForm from '../containers/SearchForm';

import GeocodeResult from './GeocodeResult';
import Map from './Map';
//import HotelsTable from './HotelsTable';


const sortedtHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);


class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortKey: 'price',
    };
  }

  componentDidMount() {
    //const place = this.getPlaceParam();
    //if (place) {
    //  this.startSearch(place);
    //}
  }

  getPlaceParam() {
    const params = queryString.parse(this.props.location.search);
    const { place } = params;
    if (place && place.length > 0) {
      return place;
    }
    return null;
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      location: {
        lat: 0,
        lng: 0,
      },
    });
  }

 // handlePlaceSubmit(place) {
 //   this.props.history.push(`/?place=${this.state.place}`);
 //   this.startSearch();
 // }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedtHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="search-page__title">ほてるたろう</h1>
        <SearchForm />
        <div className="search-page__result-area">
          <Map
            location={this.props.geocodeResult.location}
          />
          <div className="search-page__result-right">
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            {/*
            <HotelsTable
              hotels={this.state.hotels}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
              sortKey={this.state.sortKey}
            />
            */}
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  // history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

export default connect(mapStateToProps)(SearchPage);

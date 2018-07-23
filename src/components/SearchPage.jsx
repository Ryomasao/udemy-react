import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../containers/SearchForm';

import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';
import { startSearch } from '../actions/';

class SearchPage extends Component {
  componentDidMount() {
    this.props.dispatch(startSearch());
  }

  render() {
    return (
      <div className="search-page">
        <h1 className="search-page__title">ほてるたろう</h1>
        <SearchForm history={this.props.history} />
        <div className="search-page__result-area">
          <Map
            location={this.props.geocodeResult.location}
          />
          <div className="search-page__result-right">
            <GeocodeResult
              address={this.props.geocodeResult.address}
              location={this.props.geocodeResult.location}
            />
            <HotelsTable />
          </div>
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  location: PropTypes.shape({ search: PropTypes.string }).isRequired,
  geocodeResult: PropTypes.shape({
    address: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  geocodeResult: state.geocodeResult,
});

export default connect(mapStateToProps)(SearchPage);

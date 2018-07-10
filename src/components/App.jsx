import React, { Component } from 'react';
import _ from 'lodash';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import HotelsTable from './HotelsTable';

import { geocode } from '../domain/Geocoder';
import { searchHotelByLocation } from '../domain/HotelRepository';

const sortedtHotels = (hotels, sortKey) => _.sortBy(hotels, h => h[sortKey]);


class App extends Component {
  constructor(props) {
    super(props);
    // defaultの状態
    this.state = {
      location: {
        lat: 35.66232,
        lng: 139.58506,
      },
      sortKey: 'price',
    };
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

  handlePlaceSubmit(place) {
    geocode(place)
      .then(({ status, address, location }) => {
        switch (status) {
          case 'OK': {
            this.setState({
              address, location,
            });
            return searchHotelByLocation(location);
          }
          case 'ZERO_RESULTS': {
            this.setErrorMessage('結果がみつかりません');
            break;
          }
          default: {
            this.setErrorMessage('APIのエラー');
            break;
          }
        }
        return [];
      })
      .then((hotels) => {
        this.setState({ hotels: sortedtHotels(hotels, this.state.sortKey) });
      })
      .catch((error) => {
        console.log(error);
        this.setErrorMessage('axiosのエラー');
      });
  }

  handleSortKeyChange(sortKey) {
    this.setState({
      sortKey,
      hotels: sortedtHotels(this.state.hotels, sortKey),
    });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__title">ほてるたろう</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <div className="app__result-area">
          <Map
            location={this.state.location}
          />
          <div className="app__result-right">
            <GeocodeResult
              address={this.state.address}
              location={this.state.location}
            />
            <HotelsTable
              hotels={this.state.hotels}
              onSort={sortKey => this.handleSortKeyChange(sortKey)}
              sortKey={this.state.sortKey}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

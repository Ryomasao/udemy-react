import React, { Component } from 'react';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';
import Map from './Map';
import { geocode } from '../domain/Geocoder';

class App extends Component {
  constructor(props) {
    super(props);
    // defaultの状態
    this.state = {
      location: {
        lat: 35.66232,
        lng: 139.58506,
      },
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
            break;
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
      })
      .catch(() => {
        this.setErrorMessage('axiosのエラー');
      });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app__title">いどたろう</h1>
        <SearchForm onSubmit={place => this.handlePlaceSubmit(place)} />
        <GeocodeResult
          address={this.state.address}
          location={this.state.location}
        />
        <Map
          location={this.state.location}
        />
      </div>
    );
  }
}

export default App;

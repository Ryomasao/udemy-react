import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from './SearchForm';
import GeocodeResult from './GeocodeResult';

const API_KEY = '';
const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  setErrorMessage(message) {
    this.setState({
      address: message,
      lat: 0,
      lng: 0,
    });
  }

  handlePlaceSubmit(place) {
    const config = {
      params: {
        address: place,
      },
    };

    if (API_KEY) {
      console.log('yes');
      config.params.key = API_KEY;
    } else {
      console.log('notiing');
    }

    axios
      .get(GEOCODE_ENDPOINT, config)
      .then((res) => {
        console.log(res);
        const { data } = res;
        const result = data.results[0];

        switch (data.status) {
          case 'OK': {
            const { location } = result.geometry;
            this.setState({
              address: result.formatted_address,
              lat: location.lat,
              lng: location.lng,
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
          lat={this.state.lat}
          lng={this.state.lng}
        />
      </div>
    );
  }
}

export default App;

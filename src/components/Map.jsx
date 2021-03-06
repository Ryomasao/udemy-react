import React from 'react';
import PropTypes from 'prop-types';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import env from '../config/env';

const MyMapComponent = withScriptjs(withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={props.location}
      center={props.location}
    >
      {props.isMarkerShown && <Marker position={props.location} />}
    </GoogleMap>
    );
}));

const Map = ({ location }) => {
  const googleMapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='  + env.API_KEY;
  return (
    <MyMapComponent
      isMarkerShown
      googleMapURL={googleMapURL}
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div className="map" />}
      mapElement={<div style={{ height: '100%' }} />}
      location={location}
    />
  );
};

Map.propTypes = {
  location: PropTypes.objectOf(PropTypes.number).isRequired,
};


export default Map;

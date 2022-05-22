import './App.css';
import React, {Component, useState, useEffect} from 'react';
import {Map, GoogleApiWrapper, InfoWindow, Marker} from 'google-maps-react';

// importing the GoogleAPIWrapper, InfoWindow and Marker needed to display the API Key, etc.


const mapStyles = {
  width: '100%',
  height:'100%'
};

const locations =
[
  {
  "lat": 55.9455156,
  "lng": -3.2073469
  },
  {
  "lat": 55.9460788,
  "lng": -3.2156987
  },
  {
  "lat": 55.9493168,
  "lng": -3.1876551
  },
  {
  "lat": 55.9557789,
  "lng": -3.1667325
  },
  {
  "lat": 55.9769662,
  "lng": -3.1750687
  },
  {
  "lat": 55.970939,
  "lng": -3.1797667
  },
  {
  "lat": 55.958018,
  "lng": -3.2056752
  },
  {
  "lat": 55.9589001,
  "lng": -3.212146
  },
  {
  "lat": 55.9515074,
  "lng": -3.2073415
  },
  {
  "lat": 55.9466552,
  "lng": -3.2074222
  }
]

// examples I found and followed created issues, different way than what I am used to

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {},
    pubLocations:[]     
  };

  // instead of useEffect
  componentDidMount() {
    this.getPubs();

    //Adding below as API call is not working
    this.setState({pubLocations:locations});
  };

  // anonymus function to fetch API and render data which did not work with this url, that's why I hard coded the lat and lng above.

  getPubs = () => {
    fetch('https://pubplotter.azurewebsites.net/Pubs/GetPubs')
      .then(res => res)
      .then(result => this.setState({pubLocations:result}))
      .catch(e =>console.log("Error " + e ))
  };

  // onMarkerClick function takes in props, marker and event, sets state
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

    // onClose anonymus function which takes in the setState of the InfoWindow and MArker
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  // renders the returned JSX Element for initial Map with the 
  render(){

    // this.state.pubLocation takes in locations and returns Markers for each pub
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={
          // lat and lng of Edinburgh to center the map
          {
          lat: 	55.953251,
          lng: -3.188267
          }
        }
        >
        
       
        {
          this.state.pubLocations.map((location) => {
            return <Marker position={{ lat: location.lat, lng: location.lng}} />  
          })
        }
       
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
        </Map>
    );
  };
}

// use imported GoogleApiWrapper and export generated API Key
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCPcB11l4R9QdPx6Rv5xoTFRd5oXaL3EH4'
})(MapContainer);

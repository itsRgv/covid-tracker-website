import React from 'react';
import { MapContainer, ScaleControl, TileLayer, ZoomControl } from 'react-leaflet';
import './map.css'
import Circles from './Circles';
import { LatLng } from 'leaflet';


function MapItem({ casesType,countries,  center, zoom}) {
  // console.log(center.lat)
  const position = new LatLng(center.lat , center.lng)
  return (
    <div className='map'>

      {/* console.log(zoom) */}
      <MapContainer className='mapcontainer' center={position} zoom={zoom} style={{ height:'500px', width: '100%' }}>
      <ZoomControl position="topright" />
        <ScaleControl position="bottomright" />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      <Circles countries={countries} casesType={casesType} />

    </MapContainer>
    </div>
  )
}

export default MapItem
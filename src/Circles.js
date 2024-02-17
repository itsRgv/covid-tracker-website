import React, {useEffect} from 'react'
import { Circle, Popup } from "react-leaflet";
import numeral from 'numeral';
import './map.css'
function Circles({ countries, casesType }) {
  const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      half_op: "rgba(204, 16, 52, 0.5)",
      multiplier: 100,
    },
    recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      half_op: "rgba(125, 215, 29, 0.5)",
      multiplier: 120,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      half_op: "rgba(251, 68, 67, 0.5)",
      multiplier: 800,
    },
  };
  if(casesType==='recovered'){
    var colorForCircle = '#7dd71d'
  }
  else {
    var colorForCircle = "#CC1034"
  }
  return (
    <div>
        {countries.map((country, index) => (
         <Circle key={index} 
         center={{lat:country.countryInfo.lat, lng:country.countryInfo.long}}
         fillOpacity={0.4}
         color={casesTypeColors[casesType].hex}
         fillColor={casesTypeColors[casesType].hex}
         radius={Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplier}>
                <Popup>
                    
                    <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
                </Popup>
                    

        </Circle>
        
        ))}
    </div>
  )
}

export default Circles

// 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
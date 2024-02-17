import { Circle, Popup } from "react-leaflet";
import React from "react";

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      rgb: "rgb(204, 16, 52)",
      multiplier: 800,
    },
    Recovered: {
      hex: "#7dd71d",
      rgb: "rgb(125, 215, 29)",
      multiplier: 1200,
    },
    deaths: {
      hex: "#fb4443",
      rgb: "rgb(251, 68, 67)",
      multiplier: 2000,
    },
  };

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => {
        if(a.cases>b.cases){
            return -1;
        }
        else{
            return 1;
        }
    })
    return sortedData;
}
export const showDataOnMap = (data) => {
    
    data.map(country=> {
         <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color="#CC1034"
            fillColor="rgb(204, 16, 52)"
            radius={Math.sqrt(country.cases)*80}
        >
            <Popup>
                popup
            </Popup>

        </Circle>
        
        })
}
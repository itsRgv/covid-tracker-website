import { Card, 
  CardContent, 
  FormControl, 
  MenuItem, 
  Select 
} from '@mui/material';
import './App.css';
import React ,{ useEffect, useState } from 'react';
import InfoBox from './InfoBox';
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';
import MapItem from './MapItem'

import 'leaflet/dist/leaflet.css'

function App() {

  const [countries, setCountries] = useState([])
  const [country,setCountry] =useState('worldwide')
  const [countryInfo, setCountryInfo] = useState('worldwide')
  const [tableData, setTableData] = useState([])
  const [mapCenter,setmapCenter] = useState({ lat:20.5937 , lng: 78.9629 })
  const [mapZoom,setmapZoom] = useState(3)
  const [mapCountries, setmapCountries] = useState([])
  const [casesType, setCasesType]=useState('cases')

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then ((data) => {
        const countries = data.map((country)=>({
          
            name: country.country,
            value: country.countryInfo.iso2
          
        }))
        const sortedData = sortData(data)
        setTableData(sortedData)
        setCountries(countries)
        setmapCountries(data)
      })
    }

      getCountries();
  }, [])

  const oncountrychange = async (event) => {
    const countryCode = event.target.value;
    //  setCountry(countryCode)

     const url = countryCode==='worldwide' ? 
     'https://disease.sh/v3/covid-19/all' :
     `https://disease.sh/v3/covid-19/countries/${countryCode}`

     await fetch(url)
     .then((response)=>response.json())
     .then((data)=>{
        setCountry(countryCode)
        setCountryInfo(data) 
        console.log(data.countryInfo.lat)
        setmapCenter({lat: data.countryInfo.lat ,lng:  data.countryInfo.long})
        setmapZoom(4)
     })
  }
  // console.log(countryInfo)

  return (
    <div className="app">
      <div className="left__side">
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className='app-dropdown' >
          <Select
          variant='outlined'
          value={country}
          onChange={oncountrychange}
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl> 
      </div>
      
      <div className="covid__statistics">
         <InfoBox 
         isRed
         active ={casesType==='cases'}
         onClick={e=>setCasesType('cases')}
         title='Covid-19 Cases' cases={countryInfo.todayCases} total={countryInfo.cases} />
        <InfoBox active ={casesType==='recovered'} onClick={e=>setCasesType('recovered')} title='Recovered' cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
        <InfoBox isRed active ={casesType==='deaths'} onClick={e=>setCasesType('deaths')} title='Deaths' cases = {countryInfo.todayDeaths} total={countryInfo.deaths} />
      </div>
      


      <MapItem  casesType={casesType} countries={mapCountries} center={mapCenter} zoom = {mapZoom} />
      </div>
      <Card className="right__side">
              <CardContent>
                <h3>Live Cases by Country</h3>
                <Table countries={tableData} />
                <h3 className='newCases'>Worldwide new {casesType}</h3>
                <LineGraph casesType={casesType} />
              </CardContent>
      </Card>
    </div>
  );
}

export default App;


// [34.80746, -40.4796]
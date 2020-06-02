import React,{useState,useEffect} from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import { Map, Marker, TileLayer,Popup } from "react-leaflet";
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { DateTime } from "luxon";

const useStyles = makeStyles({
  root: {
    maxWidth: 700,
    maxHeight: "100%",
    marginTop: "10vh"
  },
  title:{
    marginTop: "3vh",
    fontFamily: 'Caveat',
    fontWeight: 800,
  },
  list:{
    maxWidth: 700,
  },
  img: {
    maxWidth:60,
    maxHeight:60
  },
  listitems:{
    maxWidth: 300
  },
  flag:{
    marginLeft: "44vh"
  }
});


const App = () => {

   const [ipData, setipData] = useState(null)
   const [countryData,setCountryData] = useState(null)
   const [geoData,setGeoData] = useState(null)
  
   const classes = useStyles();

  const zoom = 20



 
 
useEffect(() => {
  const fetchData = async  () =>{
    try{
    fetch("https://geo.ipify.org/api/v1?apiKey=at_ZZUZoSsPQmrTyMp6xMFfUsbjq4APM")
    .then(res =>  res.json())
    .then(data =>{console.log(data.location.lat)
      setGeoData({...geoData,
      ip: data.ip,
      position: [data.location.lat, data.location.lng],
      region: data.location.region,
      city: data.location.city,
      country: data.location.country
    })})}
    catch (err) {
      console.error(err.message);
  }
    try{
   await fetch(`https://restcountries.eu/rest/v2/alpha/${geoData.country}`)
    .then(res =>  res.json())
    .then(data => setGeoData({ ...geoData,
      capital: data.capital,
      dialingcode: data.callingCodes,
      flag: data.flag,
      timezone: data.timezones,
      population: data.population,
      countryName: data.name
    }))}
    catch (err) {
      console.error(err.message);
  }

   }
   fetchData()
},[]);

 const data = {...ipData,...countryData}
const date = DateTime.local();
if(geoData){
  console.log(geoData)
    return (

    <div className="App">
      <Typography variant="h1" className={classes.title}>
        Here you are!
      </Typography>
      <Grid container justify="center">
        <Grid item>
      <Card className={classes.root} >
      <CardActionArea>
      <div className="leaflet-container">
      <Map center={data.position} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={data.position} />
          <Popup>You are here</Popup>
        </Map>
        </div>
        </CardActionArea>
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="h2">
            {`Your IP Address is ${data.ip}`}
          </Typography>
          <Typography variant="h5"    component="p">
            {`You are currently located in ${data.city},${data.countryName}`}
          </Typography>
        </CardContent>
      
      <CardContent>
      <Divider />
      <Typography variant="h6">Flag</Typography><br/>
      <Avatar className={classes.flag} alt="flag" src={data.flag} /><br/>
      <Divider />
  <Typography variant="h6">{`${data.countryName}'s Population`}</Typography> <br/>
      <Typography>{data.population}</Typography><br/>
      <Divider /><br/>
      <Typography variant="h6">Local Time</Typography><br/>  
      <Typography>{date.toLocaleString(DateTime.TIME_SIMPLE)}</Typography>
      <Divider /><br/>
      <Typography variant="h6">Capital</Typography><br/>  
      <Typography>{data.capital}</Typography><br/>
      <Divider /><br/>
      <Typography variant="h6">Dialing Code</Typography><br/>  
      <Typography>+{data.dialingcode}</Typography>
      </CardContent>
    </Card>
    </Grid>
      </Grid>
    
    </div>
  )}
else{
  return null;
}
}


export default App;

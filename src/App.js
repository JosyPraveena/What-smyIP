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

   const [geoData,setGeoData] = useState(null)
   const [zoom,setZoom] = useState(15)
  
   const classes = useStyles();




  useEffect(() => {
    let geo = {}
    fetch("https://geo.ipify.org/api/v1?apiKey=at_S1qgxj9EL8RaI0pZ2zgiqYMulFhHK")
    .then(res => res.json())
  .then(data => {
    geo = {...data}
      return fetch(`https://restcountries.eu/rest/v2/alpha/${geo.location.country}`)
  })
  .then(res => res.json(res))
  .then(data => {
    geo = {...geo, ...data}
    setGeoData(geo)
    
  })

  // (async () => {
  //   try {
  //     const ipData = await fetch("https://geo.ipify.org/api/v1?apiKey=at_q0PPYNVebXnhMzJOUModD2NEMlCWC")
  //     const geoSomething = await 
  //     setGeoData({...ipData, ...geoSomething})
  //   } catch (err) {
  //     console.error(err)
  //   }
  // })()


}, [])
const date = DateTime.local();

if(geoData){
 console.log(typeof geoData.location.lat,geoData.location.lng)
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
      {geoData.location.lat && <Map center={[geoData.location.lat,geoData.location.lng]} zoom={zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[geoData.location.lat,geoData.location.lng]} /> */}
          <Popup>You are here</Popup>
        </Map>}
        </div>
        </CardActionArea>
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="h2">
            {`Your IP Address is ${geoData.ip}`}
          </Typography>
          <Typography variant="h5"    component="p">
            {`You are currently located in ${geoData.location.region},${geoData.name}`}
          </Typography>
        </CardContent>
      
      <CardContent>
      <Divider />
      <Typography variant="h6">Flag</Typography><br/>
      <Avatar className={classes.flag} alt="flag" src={geoData.flag} /><br/>
      <Divider />
  <Typography variant="h6">{`${geoData.name}'s Population`}</Typography> <br/>
      <Typography>{geoData.population}</Typography><br/>
      <Divider /><br/>
      <Typography variant="h6">Local Time</Typography><br/>  
      <Typography>{date.toLocaleString(DateTime.TIME_SIMPLE)}</Typography>
      <Divider /><br/>
      <Typography variant="h6">Capital</Typography><br/>  
      <Typography>{geoData.capital}</Typography><br/>
      <Divider /><br/>
      <Typography variant="h6">Dialing Code</Typography><br/>  
      <Typography>+{geoData.callingCodes}</Typography>
      </CardContent>
    </Card>
    </Grid>
      </Grid>
    
    </div>
  )
}
else{
  return null
}

  }

export default App;

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
import Skeleton from '@material-ui/lab/Skeleton';
require("dotenv").config();

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 700,
    maxHeight: "100%",
    marginTop: "10vh",
    [theme.breakpoints.down('md')]:{
      maxWidth:650
    },
    [theme.breakpoints.down('sm')]:{
      maxWidth:550
    },
    [theme.breakpoints.down('xs')]:{
      maxWidth:350
    }
  },
  title:{
    marginTop: "3vh",
    fontFamily: 'Caveat',
    fontSize:"4em",
    fontWeight: 800,
    [theme.breakpoints.down('md')]:{
      fontWeight:500,
      fontSize:"3em"
    },
    [theme.breakpoints.down('sm')]:{
      fontWeight:500,
      fontSize:"2em"
    }
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
   margin: "0 auto",
  //   // [theme.breakpoints.down('957')]:{
  //   //   marginLeft: "40vh"
  //   // },
  //   // [theme.breakpoints.down('960')]:{
  //   //   marginLeft: "38vh"
  //   // },
  //   // [theme.breakpoints.down('sm')]:{
  //   //   marginLeft: "36vh"
  //   // },
  //   // [theme.breakpoints.down('xs')]:{
  //   //   marginLeft: "32vh"
  //   // },
  },
  fields:{
    fontFamily: 'Caveat',
    fontSize: '2rem'
  }
}))


const App = () => {

   const [geoData,setGeoData] = useState(null)
   const [zoom,setZoom] = useState(20)
  
   const classes = useStyles();

  useEffect(() => {
    let geo = {}
    fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_API_KEY}`)
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
}, [])
const date = DateTime.local();

if(geoData){
 const position =[geoData.location.lat, geoData.location.lng]
    return (

    <div className="App">
      <Typography variant="h1" className={classes.title}>
       I found YOU!
      </Typography>
      <Typography variant="h2" className={classes.title}>
            {`Your IP Address is ${geoData.ip}`}
          </Typography>
          <Typography variant="h2" className={classes.title}>
            {`You are currently located in ${geoData.location.region}, ${geoData.name}`}
          </Typography>
      <Grid container justify="center">
        <Grid item>
      <Card className={classes.root} >
      <CardActionArea>
      <div className="leaflet-container">
      <Map center={position} zoom={zoom}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          <Marker position={position}>
          <Popup>You are here</Popup>
          </Marker>
        </Map>
        </div>
        </CardActionArea>
        
      <CardContent>
      <Typography className={classes.fields}variant="h6">ISP</Typography> <br/>
      <Typography variant="h6" color="textSecondary">{geoData.isp}</Typography>
      <Divider />
      <Typography className={classes.fields} variant="h6">Flag</Typography><br/>
      <Avatar className={classes.flag} alt="flag" src={geoData.flag} /><br/>
      <Divider />
        <Typography className={classes.fields}variant="h6">{`${geoData.name}'s Population`}</Typography> <br/>
      <Typography variant="h6" color="textSecondary">{geoData.population}</Typography>
      <Divider />
      <Typography className={classes.fields}variant="h6">Local Time</Typography><br/>  
      <Typography variant="h6" color="textSecondary">{date.toLocaleString(DateTime.TIME_SIMPLE)}</Typography>
      <Divider />
      <Typography className={classes.fields}variant="h6">Capital</Typography><br/>  
      <Typography variant="h6" color="textSecondary">{geoData.capital}</Typography>
      <Divider />
      <Typography className={classes.fields}variant="h6">Dialing Code</Typography><br/>  
      <Typography variant="h6" color="textSecondary">+{geoData.callingCodes}</Typography>
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

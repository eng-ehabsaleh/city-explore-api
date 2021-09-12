const express = require('express') // require the express package
const app = express() // initialize your express app instance
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const axios = require('axios');
// a server endpoint 
const port=process.env.PORT
const weatherData=require("./data/weather.json")
app.get('/', // our endpoint name
 function (req, res) { // callback function of what we should do with our request
  res.send('Hello World--') // our endpoint function response
})
class Forecast{
    constructor(date,discription){
        this.date=date;
        this.discription=discription;
    }
} 
app.get('/weather',(req,res)=>{
    try{
        
    const searchQuery=req.query.city_name;
    // const lat =req.query.lat;
    // const lon=req.query.lon;

       
    const arrOfData=weatherData.find(city=>{
    return (city.city_name.toLowerCase()===searchQuery.toLowerCase())
        });
    console.log(arrOfData.data);
    if(arrOfData.data.length){
        const resArr=arrOfData.data.map(ele=>{
            return (new Forecast(ele.datetime,ele.weather.description))
        })
        res.json(resArr)
     }
    else{
        res.json("no dataaaaa found ")
        }
        
    
    }
    catch(err){
        res.json(err.message)
    }
    
})


app.listen(port) // kick start the express server to work
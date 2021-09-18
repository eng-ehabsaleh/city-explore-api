const express = require("express"); // require the express package
const app = express(); // initialize your express app instance
const cors = require("cors");
const axios = require("axios");
app.use(cors());
require("dotenv").config();
// a server endpoint
const port = process.env.PORT;
const weatherData = require("./data/weather.json");
const { query } = require("express");
app.get(
  "/", // our endpoint name
  function (req, res) {
    // callback function of what we should do with our request
    res.send("Hello World--"); // our endpoint function response
  }
);
class Forecast {
  constructor(date, discription) {
    this.date = date;
    this.discription = discription;
  }
}
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
app.get("/weather", async (req, res) => {
  try {
    const searchQuery = req.query.city_name;
    // const lat =req.query.lat;
    // const lon=req.query.lon;
    //   const arrOfData = weatherData.find((city) => {
    //     console.log("cityname", city.city_name);
    //     console.log("searchquery", searchQuery);
    //     return city.city_name.toLowerCase() === searchQuery.toLowerCase();
    //   });
    //   console.log(arrOfData.data);
    //   if (arrOfData.data.length) {
    //     const resArr = arrOfData.data.map((ele) => {
    //       return new Forecast(ele.datetime, ele.weather.description);
    //     });
    //     res.json(resArr);
    //   } else {
    //     res.json("no dataaaaa found ");
    //   }
    // } catch (err) {
    //   res.json(err.message);
    const lat = req.query.lat;
    const lon = req.query.lon;
    const weatherUrl = "https://api.weatherbit.io/v2.0/forecast/daily";
    const weatherRes = await axios.get(
      `${weatherUrl}?lat=${lat}&lon=${lon}&key=${WEATHER_API_KEY}`
    );
    const weatherArr = weatherRes.data.data.map((ele) => {
      return new Forecast(ele.valid_date, ele.weather.description);
    });
    res.json(weatherArr);
    // console.log(weatherRes.data);
  } catch (err) {
    res.json(err.message);
  }
});
// class Movie {
//   constructor(
//     title,
//     overview,
//     average_votes,
//     total_votes,
//     image_url,
//     popularity,
//     released_on
//   ) {
//     this.title = title;
//     this.overview = overview;
//     this.average_votes = average_votes;
//     this.total_votes = total_votes;
//     this.image_url = image_url;
//     this.popularity = popularity;
//     this.released_on = released_on;
//   }
// }
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
app.get("/movies", async (req, res) => {
  const city = req.query.city;

  const movUrl = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${MOVIE_API_KEY}`;
  console.log(movUrl);
  const movRes = await axios.get(movUrl);
  const moviesData = movRes.data;
  // const movieUrl = `https://api.themoviedb.org/3/movie/top_rated?query=${city}`;
  // const movieRes = await axios.get(`${movieUrl}`);
  if (city !== null) {
    if (moviesData) {
      let dataOfSelectedCity = moviesData.results;
      let DataArr = [];
      class Movie {
        constructor(
          title,
          overview,
          average_votes,
          total_votes,
          image_url,
          popularity,
          released_on
        ) {
          this.title = title;
          this.overview = overview;
          this.average_votes = average_votes;
          this.total_votes = total_votes;
          this.image_url = image_url;
          this.popularity = popularity;
          this.released_on = released_on;
        }
      }
      dataOfSelectedCity.map((ele) => {
        let newObj = new Movie(
          ele.title,
          ele.overview,
          ele.average_votes,
          ele.total_votes,
          ele.backdrop_path,
          ele.popularity,
          ele.released_on
        );
        DataArr.push(newObj);
      });
      res.json(DataArr);
    } else {
      res.send("the city is not defined");
    }
  } else {
    res.send("you did not provide any data");
  }

  // console.log(movRes.data);
  // if (movieArr.length > 1) {
  //   res.json(movieArr);
  // } else {
  // }
});

app.listen(port); // kick start the express server to work

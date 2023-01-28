const express = require("express");
const app = express();
const https = require("https");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    //res.send("Server is up and running");
    res.sendFile(__dirname + "/index.html");
    });

    app.post("/" , function(req,res){
        // console.log(req.body.cityName);
        const query = req.body.cityName;
        const apiKey = "a07563ba75f21c0ee51f4cf81271de52";
        const unit = "metric"
        const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response){
    console.log(response.statusCode);
  
    response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon= weatherData.weather[0].icon;  
        const imageurl ="http://openweathermap.org/img/wn/"+ icon +"@2x.png"
        res.write("<p>The weather Description in Lucknow is: " + weatherDescription + "</p>");
        res.write("<h1>The Temperature in "+query+" is  " + temp + "  degree Celcius</h1>");
        res.write("<img src=" + imageurl +">");
        res.send(); 
    });
});
}); 

app.listen(3000,function () {
    console.log("Server is started on port 3000.");
   });
// Route current
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    let responseCity = await fetch('http://ip-api.com/json'); //I make the query to the api of the location given by the user's ip
    let Json_response_city = await responseCity.json();      //Convert the string that it returns to a JSON object
    let city = Json_response_city.city;                     //I get the current user city
    let localidad = city.replace(/á/g, "a");                //I remove the accents to the a in case it has to be able to use it in the url
    let localidad1 = localidad.replace(/é/g, "e");          //I remove the accents to the e in case it has to be able to use it in the url
    let localidad2 = localidad1.replace(/í/g, "i");         //I remove the accents to the i in case it has to be able to use it in the url
    let localidad3 = localidad2.replace(/ó/g, "o");         //I remove the accents to the o in case it has to be able to use it in the url
    let localidadFinal = localidad3.replace(/ú/g, "u");//I remove the accents to the u in case it has to be able to use it in the url

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localidadFinal}&appid=411fecc78199355b6bb7d640e92d47c7`); // I do the query to the time api
    const Json_response = await response.json(); //Convert the string that it returns to a JSON object
    const jsonFinal = {                         // I create my JSON with the data that interests me
        "name": Json_response.name,  
        "country": Json_response.sys.country,
        "latitude": Json_response.coord.lat,
        "longitude": Json_response.coord.lon,
        "weather": Json_response.weather[0].main,
        "temperature": parseInt((Json_response.main.temp - 273.15).toFixed()) // The api returns the temperature in degrees Kelvin, with this line I convert it to celsius, I take the decimals and I pass it to numerical
    }

    res.send(jsonFinal);                       //I return the JSON per screen

});


module.exports = router;

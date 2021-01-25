// Route forecast
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

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${localidadFinal}&appid=411fecc78199355b6bb7d640e92d47c7`); // I do the query to the time api
    const Json_response = await response.json(); //Convert the string that it returns to a JSON object

    const jsonFinal = {                         // I create my JSON with the data that interests me
        "city": localidadFinal,
        "country": Json_response.city.country,
        "today": Json_response.list[0].weather[0].description,
        "tomorrow": Json_response.list[7].weather[0].description,
        "two": Json_response.list[14].weather[0].description,
        "three": Json_response.list[21].weather[0].description,
        "four": Json_response.list[28].weather[0].description,
        "five": Json_response.list[35].weather[0].description
    }

    res.send(jsonFinal);                     //I return the JSON per screen

});


module.exports = router;
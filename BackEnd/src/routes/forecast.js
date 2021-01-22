// Route forecast
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    let responseCity = await fetch('http://ip-api.com/json');
    let Json_response_city = await responseCity.json();
    let city = Json_response_city.city;
    let localidad = city.replace(/á/g, "a");
    let localidad1 = localidad.replace(/é/g, "e");
    let localidad2 = localidad1.replace(/í/g, "i");
    let localidad3 = localidad2.replace(/ó/g, "o");
    let localidadFinalFiltrada = localidad3.replace(/ú/g, "u");

    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${localidadFinalFiltrada}&appid=411fecc78199355b6bb7d640e92d47c7`);
    const Json_response = await response.json();
    const jsonFinal = {
        "city": Json_response.city.name,
        "country": Json_response.city.country,
        "tomorrow": Json_response.list[7].weather[0].description,
        "two days later": Json_response.list[14].weather[0].description,
        "three days later": Json_response.list[21].weather[0].description,
        "four days later": Json_response.list[28].weather[0].description,
        "five days later": Json_response.list[35].weather[0].description
    }

    res.send(jsonFinal);

});


module.exports = router;
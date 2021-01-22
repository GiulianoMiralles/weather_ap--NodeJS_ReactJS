// Route current
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

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${localidadFinalFiltrada}&appid=411fecc78199355b6bb7d640e92d47c7`);
    const Json_response = await response.json();
    const jsonFinal = {
        "name": Json_response.name,
        "country": Json_response.sys.country,
        "latitude": Json_response.coord.lat,
        "longitude": Json_response.coord.lon,
        "temperature": parseInt((Json_response.main.temp - 273.15).toFixed()) //La api me devuelve la temperatura en grados Kelvin, con esta linea la convierto en celsius, le saco los decimales y la paso a numerica
    }
    res.send(jsonFinal);

});


module.exports = router;

// Route location
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    let responseCity = await fetch('http://ip-api.com/json'); //I make the query to the api of the location given by the user's ip
    let Json_response_city = await responseCity.json();      //Convert the string that it returns to a JSON object
    const Json_city = {                                     // I create my JSON with the data that interests me
        "country": Json_response_city.country,
        "regionName": Json_response_city.regionName,
        "countryCode": Json_response_city.countryCode,
        "lat": Json_response_city.lat,
        "lon": Json_response_city.lon,
        "city": Json_response_city.city
    }
    res.json(Json_city);                                //I return the JSON per screen
});


module.exports = router;
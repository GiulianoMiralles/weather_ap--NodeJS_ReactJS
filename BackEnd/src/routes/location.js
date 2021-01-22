// Route location
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('http://ip-api.com/json');
    const Json_response = await response.json();
    const city = Json_response.city;
    const Json_city = {
        "city": city
    }

    res.json(Json_city);
});


module.exports = router;
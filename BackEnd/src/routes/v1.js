// Route V1
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    let responseCity = await fetch('http://ip-api.com/json'); //I make the query to the api of the location given by the user's ip
    let Json_response = await responseCity.json();           //Convert the string that it returns to a JSON object
    res.json(Json_response);                                //I return the JSON per screen                    
});


module.exports = router;

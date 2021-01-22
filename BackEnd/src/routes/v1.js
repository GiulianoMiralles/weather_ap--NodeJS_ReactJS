// Route V1
const { Router } = require("express");
const router = Router();

const fetch = require('node-fetch');

router.get('/', async (req, res) => {
    const response = await fetch('http://ip-api.com/json/');
    const Json_response = await response.json();
    res.json(Json_response);
});


module.exports = router;

// load libraries
const express = require('express');
const axios = require("axios");

// configure PORT
const PORT = parseInt(process.env.APP_PORT) || 3000;

// create an instance of the application
const app = express();

// middleware
app.use(express.static(__dirname + '/dist'));

// parse application/json and application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// start server, listen to port
app.listen(PORT, () => {
    console.info(`Application started on port ${PORT} at ${new Date()}`);
});

// using function
app.get('/', function(req, res) {
    let result = {'status': 'success', 'message' : 'Hello World'};
    console.info('get Api call ', result);
    res.status(200);
    res.type('application/json');
    res.json(result);
});

// using arrow function
app.get('/:area', (req, res) => {
    console.info('>>> area: ', req.params.area);
    
})

app.post('/', function(req, res) {
    apiCall().then (
        (response) => {
            res.status(200);
            res.type('application/json');
            res.json(response);
        }
    )
});

// sample api call
async function apiCall() {
    let data;   
    let config = {
        method: 'get',
        url: 'https://api.data.gov.sg/v1/environment/2-hour-weather-forecast',
        headers: { 
          'Content-Type': 'application/json'
        }
      };
      
      data = await axios(config)
      .then((response) => {
        return (response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    return data;
}
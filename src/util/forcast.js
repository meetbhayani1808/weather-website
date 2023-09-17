const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=48bf61073b2b0d81a4ff1a0f995a92d7&units=metric`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the internet', undefined);
        } else if (response.body && response.body.cod && response.body.cod !== 200) {
            callback('Unable to find location', undefined);
        } else if (response.body && response.body.weather && response.body.weather.length > 0) {
            callback(undefined, response.body.weather[0].main);
        } else {
            callback('Unexpected response from the weather API', undefined);
        }
    });
};

module.exports = forecast;

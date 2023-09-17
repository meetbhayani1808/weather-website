const request = require("request");

const weather = (address, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=48bf61073b2b0d81a4ff1a0f995a92d7&units=metric`;

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (response.body.cod && response.body.cod !== 200) {
            callback("Unable to find location. Try another search.", undefined);
        } else if (!response.body.coord.lat || !response.body.coord.lon) {
            callback("unble to find lon and lat", undefined)
        }else {
            callback(undefined, {
                location: response.body.name,
                latitude: response.body.coord.lat,
                longitude: response.body.coord.lon
            });
        }
    });
};

module.exports = weather;

// const weather = (address, callback) => {
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${address}&appid=48bf61073b2b0d81a4ff1a0f995a92d7&units=metric`;

//     request({ url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined);
//         } else if (response.body.cod && response.body.cod !== 200) {
//             callback("Unable to find location. Try another search.", undefined);
//         } else if (!response.body.coord || !response.body.coord.lat || !response.body.coord.lon) {
//             callback("Latitude and longitude information not found in the API response.", undefined);
//         } else {
//             callback(undefined, {
//                 location: response.body.name,
//                 latitude: response.body.coord.lat,
//                 longitude: response.body.coord.lon
//             });
//         }
//     });
// };

// module.exports = weather;


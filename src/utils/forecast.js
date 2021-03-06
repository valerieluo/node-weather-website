const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d363494820450ec516ffab3cf1ab2b1f/' + latitude + ',' + longitude + '?units=si'
    
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary 
                + ' It is currently ' + body.currently.temperature + ' degrees out. Feels like ' 
                + body.currently.apparentTemperature + ' degrees with wind speed of '
                + body.currently.windSpeed + ' km/h. There is a ' 
                + body.currently.precipProbability * 100 + '% chance of rain. The high today will be ' 
                + body.daily.data[0].temperatureHigh + ' degrees and the low will be ' 
                + body.daily.data[0].temperatureLow + ' degrees.')
        }
    })
}

module.exports = forecast
const request = require('request')

let geocode = (place, callback) => {
    const url = `http://api.positionstack.com/v1/forward?access_key=6c978c64147dc9f6c2b90c117f647f3c&query=${place}`

    request({url,json: true}, (error, {body}={}) => {
        if (error) {
            callback('unable to connect to location services', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            // let lat = response.body.data[0].latitude
            // let long = response.body.data[0].longitude
            // let label = response.body.data[0].label
            const {latitude,longitude,label} = body.data[0]
            callback(undefined, {latitude, longitude,label}
            )
        }
    })
}

module.exports = geocode
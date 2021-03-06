const request = require('request')
let weather = (lat, long, callback) => {

    request({
        url: `http://api.weatherstack.com/current?access_key=1749e11b14a5908024e91cfb89bf2ba7&query=${lat},%${long}&units=m`,json: true},
         (error, {body}={}) => {
        if (error) {

            let err = 'unable to connect to weather service'
            callback(err,undefined)
        } else if (body.error) {
            // let err = response.body.error
            const {error:err} = body
            callback(err,undefined)
        } else {
            const{weather_descriptions,temperature,precip,feelslike} = body.current
            let data = `The weather is currently ${weather_descriptions}, The temparature is ${temperature} degrees and there is ${precip} chance of raining. And it feelslike ${feelslike}`
            callback(undefined,data)
        }
    })
}


module.exports = weather
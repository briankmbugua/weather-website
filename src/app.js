const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')


const app = express()

const port = process.env.PORT  || 5000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup public directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Brian Kinyanjui'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Brian Kinyanjui'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'help page',
        name: 'Brian Kinyanjui',
        helpText: 'help message'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.search) {
        res.send({
            error: 'you must provide a search term'
        })
    }
        let address = req.query.search
        geocode(address,(error,{latitude,longitude}={})=>{
            if(error) {
                return res.send({error})
            }

            weather(latitude,longitude, (error,data)=>{
                if(error) {
                    return res.send({error})
                }

                res.send({
                    forecast: data,
                    address: req.query.address
                })
            })
        })
})

app.get('/products',(req,res)=>{
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }


    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message: 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404', {
        message: 'page not found'
    })
})

app.listen(port, () => {
    console.log(`server is up on port ${port}`);
})
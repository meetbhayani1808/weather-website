
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// const cors = require('cors')
const weather = require('./util/weather')
const forecast = require('./util/forcast')

const app = express();
// app.use(cors());


const publicDirectoory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templets/views')
const partialpath = path.join(__dirname, '../templets/partials')

app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialpath)


app.use(express.static(publicDirectoory))

app.get('', (req, res) => {
    res.render('index', {
        title:'weather app',
        name:'meet'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About me',
        name: 'Meet Bhayani',
        MObileNO: '8511532749'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        helptext: 'this is meet',
        title: 'Help',
        name: 'Andrew mead'
    })
})
app.get('/weather', (req,res) =>{
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    weather(req.query.address, (error,{latitude, longitude, location}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address  
            })
        })
    })
})

app.get('/product', (req,res) => {
    if(!req.query.search) {
        return res.send ({
            error: 'you must provide search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title:'/404',
        name: 'meet',   
        errorMassge: 'page not found'
    })
})

app.get('*', (req, res) =>[
        res.render('404', {
        title: '404',
        name: 'meet',
        errorMassge: 'page not found'
    })
])


app.listen(3000, () => {
    console.log('server is runnig up on port 3000');
})
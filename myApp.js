require('dotenv').config()
let express = require('express');
const bodyParser = require('body-parser')

let app = express();

app.use(bodyParser.urlencoded({extended: false}))

// Exposing static public folder/files
app.use('/public', express.static(`${__dirname}/public`))

// Middleware to implement a custom logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

// console.log("Hello World")


// app.get('/', (req, res)=>{
//     res.send('Hello Express')
// })

// Sending static HTML files
app.get('/', (req, res)=>{
    res.sendFile(`${__dirname}/views/index.html`)
})

// Working with .env variables
app.get('/json', (req, res)=>{
    if (process.env.MESSAGE_STYLE === 'uppercase'){
        res.json({"message": "HELLO JSON"})
    }
    res.json({"message": "Hello json"})
})

// Middlewares to append curent time on request object
app.get('/now', (req, res, next) => {
    const time = new Date().toString()
    req.time = time
    next()
},(req, res) => {
    res.json({'time': req.time})
})

// Accessing path variables
app.get('/:word/echo', (req, res) => {
    res.json({'echo': req.params.word})
})

// Getting Query Parameter Input from the Client 
// As well as Post Data from request body payload
app.route('/name')
    .get((req, res) => {
        res.json({'name': `${req.query.first} ${req.query.last}`})
    })
    .post((req, res) => {
        res.json({'name': `${req.body.first} ${req.body.last}`})
    })

















 module.exports = app;

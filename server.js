//create new express
let express = require('express')

//knowledge of what's exported from api.js - the two router.get/.post functions and returns
let api_routes = require('./routes/api.js')//js is implied but not incorrect to still add on
let path = require('path')


//create new app
let app = express()

let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

// be able to handle JSON requests, convert data to js
app.use(express.json())

//enable app to be able to respond to requests to the routes
//all requests will be made to path beginning with /api
app.use('/api', api_routes)

//error handling
app.use(function(req, res, next) { //this code will run only if app.use(/api, api_routes) doesn't run
    res.status(404).send('Not found!!!') //respond to anything that's not one of the routes we've configured
})

//for server errors
app.use(function(err, req, res, next){
    console.error(err.stack)
    res.status(500).send('Server error :(')
})

//create server to run app that has confirmation message that server is running
let server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})
let { Sequelize, DataTypes } = require('sequelize')

let env = process.env.NODE_ENV || 'development' 
//environment variable is recognized by entire computer
// if app is running at Heroku, Heroku will have set an environment
// variable called NODE_ENV which will have the value 'production
// so the env variable in this code will be 'production'


// if app is running locally, env will be 'development' and the app
// will use sqlite

let config = require(__dirname + '/../config.json')[env]

let db = {}

let sequelize 

//if this is true, we are using Heroku, 
// so we need to create a new Sequelize object using postgres
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    //running locally, development mode, use SQLite
    sequelize = new Sequelize(config)
}
//calling function from student.js (what we exported from there)
let studentModel = require('./student')(sequelize, DataTypes)

db[studentModel.name] = studentModel //set up db object
//object with property student, the value of that property will be the student model

db.sequelize = sequelize // info on how to connect to the database
db.Sequelize = Sequelize // reference to the sequelize library

//export db
module.exports = db

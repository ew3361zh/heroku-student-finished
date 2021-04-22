let express = require('express')
//if you grab a directory (like /models), it will, by default
//grab the file 'index' and whatever it exports (which here is the api database)
let db = require('../models')
let Student = db.Student //student model

let router = express.Router()

//request to students will cause this functiont to run
router.get('/students', function(req, res, next) {
    Student.findAll( {order: ['present', 'starID']}).then( students => { //then bc it's a promise
        //when the promise resolves it will provide an array of students
        //using order to alphabetize the student list in the app, can be sorted by any characteristics.
        return res.json(students) //must have return when there's a promise
    }).catch( err => next(err)) //if error here, it has to be the server, so we're passing it along
})

router.post('/students', function(req, res, next) {
    Student.create( req.body ).then( (data) => {//contains any json that vue client has sent in the request
        return res.status(201).send('ok - created!') //200 level requests are usually positive/successful
        //201 is for something being created successfully
    }). catch( err => { //catch receives error object from databases
        //handle user errors, e.g. missing starID or name
        if( err instanceof db.Sequelize.ValidationError) {
            //respond with 400 error code means bad request - include error messages
            let messages = err.errors.map ( e=> e.message )
            return res.status(400).json(messages) //json array of sql validation errors
        }else {
        //otherwise something unexpected has gone wrong - likely a server error
        return next(err) //this route's not going to deal with it, control will go back to server.js
        }
    })
})

router.patch('/students/:id', function(req, res, next) {
    // student ID will equal db id for student
    let studentID = req.params.id
    let updatedStudent = req.body
    Student.update( updatedStudent, { where: { id: studentID}})
        .then( (rowsModified) => { //array
            let numberOfRowsModified = rowsModified[0] // number of rows changed

            if (numberOfRowsModified == 1) { //exactly 1 row changed
            return res.send('yessiree updated!') //update row where id = studentID
            }
            else {
             //no rows changed (student not found)
                return res.status(404).json(['Student with that id not found'])
            }
            
        })
        .catch( err => {
            //if validation error, let user know it's a bad request - modifying student to have no name or no starID - user problem
            if (err instanceof db.Sequelize.ValidationError) {
                let messages = err.errors.map( e => e.message)
                return res.status(400).json(messages) //this is a database constraint error
            } else {
                //unexpected error
                return next(err)
            }
        })
    
})

router.delete('/students/:id', function(req, res, next){
    let studentID = req.params.id 
    Student.destroy({ where: {id: studentID} })
    .then( (rowsDeleted) => {
        if (rowsDeleted == 1) {
        return res.send('destroyed and deleted')
        } else {
            return res.status(404).json(['Not found'])
        }
    })
    .catch( err => next(err)) //for unexepcted errors
})

module.exports = router

//don't write code after module.exports line, it will be ignored
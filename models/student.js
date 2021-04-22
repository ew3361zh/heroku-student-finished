// when something else uses this file, m.e is data/function that this file provides
module.exports = (sequelize, DataTypes) => {

    //describes not only how Student object is structured
    //but also how data about student object will be stored in database
    // these will be the column headers and datatypes
    let Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false //won't allow a student's name to be blank
        },

        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //starID must be unique
            validate: {
                is: /^[a-z]{2}\d{4}[a-z]{2}$/
                //regex pattern match to starID pattern "aa1234aa"
            }
        },

        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false //present set to false
        }

    })
    //force specifics whether to drop the table
    // force true means will overwrite previous database info
    // false means keep the table
    Student.sync( {force: false} ).then( () => {
        console.log('Synced student table')
    })

    return Student //Student model
}
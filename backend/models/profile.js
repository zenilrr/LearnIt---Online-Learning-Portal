const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    gender: {
        type: String
    },
    dateOfBirth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    },
    badge:{
        type :String

    },
    CompletedCourse:[{
        type:String
    }],
    EnrolledCourse:[{
        type:String
    }],
    CreatedCourse:[{
        type:String
    }]

});


module.exports = mongoose.model('Profile', profileSchema);
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String
    },
    courseDescription: {
        type: String
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    whatYouWillLearn: {
        type: String
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ''
            //ref will be updated later 
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: ''
            //will be upated later
        }
    ],
    price: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    instructions: {
        type: [String]
    },
    createdAt: {
        type: Date,
    }
    ,
    updatedAt: {
        type: Date,
    }

});

module.exports = mongoose.model('Course', courseSchema);
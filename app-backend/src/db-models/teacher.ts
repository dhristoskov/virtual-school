import * as mongoose from 'mongoose';

import TeacherInterface from '../interfaces/teacher-interface';

const teacherSchema = new mongoose.Schema({
    first_name: { 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 20
    },
    second_name: { 
        type: String, 
        required: false, 
        maxlength: 20
    },
    last_name:{ 
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 20
    },
    family_doctor: {
        type: String, 
        default: 'no data',
        required: false 
    },
    city: { 
        type: String, 
        required: true,
        minlength: 2 
    },
    address: { 
        type: String, 
        required: true,
        minlength: 2 
    },
    phone_number: { 
        type: String, 
        required: true,
    },
    email: {
        type: String,
        unique: true, 
        minlength: 6
    },
    sex: { 
        type: String, 
        required: true 
    },
    ident_number: {
        type: Number,
        required: true 
    },
    data_of_birth: {
        type: Date,
        required: true
    },
    image: { 
        type: String,
        default: 'no image',
        required: false 
    },
    other_activities: [{
        type: String,
        required: true
    }],
    teaching_subjects: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Subject'
    }]
});

export default mongoose.model<TeacherInterface>('Teacher', teacherSchema);
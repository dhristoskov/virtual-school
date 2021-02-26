import * as mongoose from 'mongoose';

import StudentInterface from '../interfaces/student-interface';

const studentSchema = new mongoose.Schema({
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
    parent: {
        type: String, 
        default: 'no data',
        required: false 
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
    number_in_class: {
         type: Number, 
         required: true
    },
    phone_number: { 
        type: String, 
        required: true,
        minlength: 5
    },
    sex: { 
        type: String, 
        required: true 
    },
    study_from: { 
        type: String, 
        default: 'no data',
        required: false 
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
    badges:[{
        type: String,
        required: true
    }],
    other_activities: [{
        type: String,
        required: true
    }],
    notes: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Note'
    }],
    school_class:{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Class'
    },
});

export default mongoose.model<StudentInterface>('Student', studentSchema);
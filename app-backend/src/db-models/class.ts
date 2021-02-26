import * as mongoose from 'mongoose';

import ClassInterface from '../interfaces/class-interface';

const classSchema = new mongoose.Schema({
    class_number: {
        type: Number, 
        required: true,
    },
    class_name: {
        type: String, 
        required: true,
        maxlength: 25
    },
    class_profile: {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 25
    },
    lead_teacher: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Teacher'
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Student'
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Subject'
    }]
});

export default mongoose.model<ClassInterface>('Class', classSchema);
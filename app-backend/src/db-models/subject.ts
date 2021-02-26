import * as mongoose from 'mongoose';

import SubjectInterface from '../interfaces/subject-interface';

const subjectSchema = new mongoose.Schema({
    subject_name: {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 25 
    },
    for_class: {
        type: Number, 
        required: true,
    },
    teachers: [{
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: 'Teacher'
    }]
});

export default mongoose.model<SubjectInterface>('Subject', subjectSchema);
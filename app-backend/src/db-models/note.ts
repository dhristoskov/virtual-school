import * as mongoose from 'mongoose';

import NoteInterface from '../interfaces/note-interface';

const noteSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 70
    },
    content: {
        type: String, 
        required: true,
        minlength: 10
    },
    create_date: {
        type: Date,
        required: true
    },
    student_target: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'Student'
    }
});

export default mongoose.model<NoteInterface>('Note', noteSchema);
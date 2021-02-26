import * as mongoose from 'mongoose';

import StudentInterface from './student-interface';

export default interface NoteInterface extends mongoose.Document {
    title: string;
    content: string;
    create_date: Date;
    student_target: StudentInterface[];
};
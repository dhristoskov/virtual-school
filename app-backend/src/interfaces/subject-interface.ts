import * as mongoose from 'mongoose';

import TeacherInterface from './teacher-interface';

export default interface SubjectInterface extends mongoose.Document {
    subject_name: string;
    for_class: number;
    teachers: TeacherInterface[];
}
import * as mongoose from 'mongoose';

import StudentInterface from './student-interface';
import SubjectInterface from './subject-interface';
import TeacherInterface from './teacher-interface';

export default interface ClassInterface extends mongoose.Document {
    class_number: number;
    class_name: string;
    class_profile: string;
    lead_teacher: TeacherInterface;
    students: StudentInterface[];
    subjects: SubjectInterface[];
};
import * as mongoose from 'mongoose';
import SubjectInterface from './subject-interface';

export default interface TeacherInterface extends mongoose.Document {
    first_name: string;
    second_name?: string;
    last_name: string;
    family_doctor?: string;
    city: string;
    address: string;
    phone_number: string;
    email: string;
    sex: string;
    ident_number: number;
    data_of_birth: Date;
    image?: string;
    other_activities: string[];
    teaching_subjects: SubjectInterface[];
}
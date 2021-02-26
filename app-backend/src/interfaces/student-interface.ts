import * as mongoose from 'mongoose';

import ClassInterface from './class-interface';
import NoteInterface from './note-interface';

export default interface StudentInterface extends mongoose.Document {
    first_name: string;
    second_name?: string;
    last_name: string;
    parent?: string;
    family_doctor?: string;
    city: string;
    address: string;
    number_in_class: number;
    phone_number: string;
    sex: string;
    study_from?: string;
    ident_number: number;
    data_of_birth: Date;
    image?: string;
    other_activities: string[];
    badges: string[];
    notes: NoteInterface[];
    school_class: ClassInterface;
}
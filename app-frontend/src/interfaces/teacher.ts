import Subject from './subject';

export default interface Teacher {
    _id: string;
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
    teaching_subjects: Subject[];
}
import Teacher from './teacher';

export default interface Subject {
    _id: string;
    subject_name: string;
    for_class: number;
    teachers: Teacher[];
}
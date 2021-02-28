import Teacher from './teacher';

export default interface Subject {
    subject_name: string;
    for_class: number;
    teachers: Teacher[];
}
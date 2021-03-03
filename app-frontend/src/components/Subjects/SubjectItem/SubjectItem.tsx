import React from 'react';

import './SubjectItem.scss'

import { 
    IoPersonOutline, 
    IoBookOutline, 
    IoSchoolOutline,  
} from 'react-icons/io5';

import Subject from '../../../interfaces/subject';
import Teacher from '../../../interfaces/teacher';
import { iconSwicher } from './helper';

interface Props {
    subject: Subject;
    buttonOption: string;
    onIdHandler: (id: any) => void;
}

const SubjectItem:React.FC<Props> = ({ subject, buttonOption, onIdHandler }) => {

    return (
        <div className='subjectitem-wrapper'>
            <p className='subjectitem-wrapper-name'><IoBookOutline />
                <span className='subjectitem-wrapper-title'>{subject.subject_name}</span>
            </p>
            <p className='subjectitem-wrapper-class'><IoSchoolOutline />
                <span className='subjectitem-wrapper-title'>{subject.for_class}</span>
            </p>
            <IoPersonOutline  className='subjectitem-wrapper-icon'/>
            <div className='subjectitem-wrapper-teachers'>
                {
                    subject.teachers && subject.teachers.length > 0 ?
                    subject.teachers.map((teacher: Teacher, index: number) => (
                        <p className='subjectitem-wrapper-teachers--item'
                        key={index}>{(teacher.first_name).substring(0, 1)}.<span> {teacher.last_name}</span></p>
                    )) 
                    : <p className='subjectitem-wrapper-teachers--empty'>Empty</p>
                }
            </div>
            <p className='subjectitem-wrapper-options'
             onClick={() => onIdHandler(subject._id)}>{ iconSwicher(buttonOption) }</p>
        </div>
    )
}

export default SubjectItem
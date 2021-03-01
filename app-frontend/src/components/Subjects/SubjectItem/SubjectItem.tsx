import React from 'react';

import './SubjectItem.scss'

import { 
    IoPersonOutline, 
    IoBookOutline, 
    IoSchoolOutline, 
    IoConstructOutline 
} from 'react-icons/io5';

import Subject from '../../../interfaces/subject';
import Teacher from '../../../interfaces/teacher';

interface Props {
    subject: Subject
}

const SubjectItem:React.FC<Props> = ({ subject }) => {

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
                    subject.teachers.length > 0 ?
                    subject.teachers.map((teacher: Teacher, index: number) => (
                        <p className='subjectitem-wrapper-teachers--item'
                        key={index}>{teacher.first_name}<span> {teacher.last_name}</span></p>
                    )) 
                    : <p className='subjectitem-wrapper-teachers--empty'>Empty</p>
                }
            </div>
            <p className='subjectitem-wrapper-edit'><IoConstructOutline /></p>
        </div>
    )
}

export default SubjectItem
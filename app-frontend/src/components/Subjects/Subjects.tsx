import React, { Fragment, useContext } from 'react';

import { DataContext } from '../../context/DataContext';

import './Subjects.scss';

const Subjects = () => {

    const { subjects } = useContext(DataContext);

    return (
        <Fragment>
            {
                subjects ? 
                <div className='subject-wrapper'>
                {
                    subjects.map(subject => {
                        return (
                            <div key={subject._id}>
                                <p>{subject.subject_name}</p>
                                <p>{subject.for_class}</p>
                                <div>
                                    {
                                        subject.teachers.length > 0 &&
                                        subject.teachers.map(teacher => (
                                            <p key={teacher._id}>{teacher.first_name}<span> {teacher.last_name}</span></p>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    })
                } 
                </div>
                : <p>Loading...</p>
            }
        </Fragment>
    )

}

export default Subjects;

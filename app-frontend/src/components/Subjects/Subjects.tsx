import React, { Fragment, useContext } from 'react';

import { DataContext } from '../../context/DataContext';

import Subject from '../../interfaces/subject';
import SubjectItem from './SubjectItem/SubjectItem';
import ItemForm from './ItemFrom/ItemFrom';

import './Subjects.scss';

const Subjects = () => {

    const { subjects } = useContext(DataContext);

    return (
        <Fragment>
            {
                subjects ? 
                <div className='subject-wrapper'>
                {
                    subjects.map((subject: Subject) => {
                        return (
                            <SubjectItem key={subject._id} subject={subject} />
                        )
                    })
                } 
                </div>
                : <p>Loading...</p>
            }
            <ItemForm />
        </Fragment>
    )

}

export default Subjects;

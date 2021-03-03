import React, { Fragment, useContext, useState } from 'react';

import { DataContext } from '../../context/DataContext';

import './Subjects.scss';

import Subject from '../../interfaces/subject';
import SubjectItem from './SubjectItem/SubjectItem';
import SubjectNav from './SubjectNav/SubjectNav';
import ItemForm from './ItemFrom/ItemFrom';

const Subjects = () => {

    const { subjects } = useContext(DataContext);
    const [ openCreate, setOpenCreate ] = useState<boolean>(false);
    const [ buttonOption, setButtonOption ] = useState<string>('');

    const setButtonType = (type: string): void => {
        if(type === 'create') {
            setOpenCreate(true);
        }else {
            setButtonOption(type);
        }
    }

    const onIdHandler = (id: string): void => {
        console.log(id)
    }

    return (
        <Fragment>
            {
                subjects ? 
                <div className='subject-wrapper'>
                <SubjectNav setButtonType={setButtonType}/>
                {
                    subjects.map((subject: Subject) => {
                        return (
                            <SubjectItem key={subject._id} subject={subject} 
                                                 buttonOption={buttonOption}
                                                 onIdHandler={onIdHandler}/>
                        )
                    })
                } 
                </div>
                : <p>Loading...</p>
            }
            {
                openCreate && <ItemForm />
            }
        </Fragment>
    )

}

export default Subjects;

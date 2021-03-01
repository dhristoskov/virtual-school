import React, { useState, ChangeEvent, FormEvent } from 'react';

import Subject from '../../../interfaces/subject';

import './ItemFrom.scss'

const ItemForm = () => {

    const [ subject, setSubject ] = useState<Subject>({
        subject_name: '',
        for_class: '',
        teachers: []
     });

    const { subject_name, for_class } = subject;

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const { name, value } = e.target;
        setSubject({...subject, [name]: value})
    };

    const onHandleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); 
        console.log(subject);
        setSubject({
                subject_name: '',
                for_class: '',
                teachers: []
        });
    };

    return (
        <div className='subject-container'>
            <form className='subject-form' onSubmit={onHandleSubmit}>
                <div className='input-fied'>
                    <input type='text' name='subject_name' placeholder='Subject name'  
                    value={subject_name} onChange={onHandleChange}/>
                </div>
                <div className='input-fied'>
                    <input type="text" name='for_class' placeholder='Class'
                    value={for_class} onChange={onHandleChange}/>        
                </div>
                <div>
                    <input type="submit" value='Create'/>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;
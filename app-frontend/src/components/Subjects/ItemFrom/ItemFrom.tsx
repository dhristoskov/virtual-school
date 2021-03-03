import React, { useState, ChangeEvent, FormEvent } from 'react';

import Subject from '../../../interfaces/subject';

import './ItemFrom.scss'

const ItemForm = () => {

    const [ subject, setSubject ] = useState<Subject>({
        subject_name: '',
        for_class: ''
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
                for_class: ''
        });
    };

    return (
        <div className='subject-container'>
            <form className='subject-container-form' onSubmit={onHandleSubmit}>
                <div className='subject-container-form--fied'>
                    <input type='text' name='subject_name' placeholder='Subject name'  
                    value={subject_name} onChange={onHandleChange}/>
                </div>
                <div className='subject-container-form--fied'>
                    <input type="text" name='for_class' placeholder='Class'
                    value={for_class} onChange={onHandleChange}/>        
                </div>
                <div className='subject-container-form--submit'>
                    <input type="submit" value='Create'/>
                </div>
            </form>
        </div>
    )
}

export default ItemForm;
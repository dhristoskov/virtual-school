import React, { createContext, ReactNode, useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from '../axios';

import Subject from '../interfaces/subject';
import Teacher from '../interfaces/teacher';

type Props = {
    children: ReactNode
}

type DataType = {
    teachers: Teacher[];
    subjects: Subject[];
    loadTeachers: () => void;
    loadSubjects: () => void;
}

export const DataContext = createContext<DataType>({} as DataType);

const DataContextProvider: React.FC<Props> = ({ children }) => {

    const history = useHistory();
    const [ teachers, setTeachers ] = useState<Teacher[]>([] as Teacher[]);
    const [ subjects, setSubjects ] = useState<Subject[]>([] as Subject[]);

    const loadTeachers = (): void => {
        axios.get('/teachers/')
             .then(res => {
                setTeachers(res.data.teachersData);
                console.log(res.data.teachersData);
                history.push('/admin/teachers');
             }).catch(err => {
                 console.log(err)
             })
    }

    const loadSubjects = (): void => {
        axios.get('/subjects/')
             .then(res => {
                setSubjects(res.data.subjectData);
                history.push('/admin/subjects');
             }).catch(err => {
                 console.log(err)
             });
    }

    return (
        <DataContext.Provider 
        value={{ 
            teachers, 
            subjects,
            loadTeachers,
            loadSubjects
        }}>
            { children }
        </DataContext.Provider>
    )
}

export default DataContextProvider;
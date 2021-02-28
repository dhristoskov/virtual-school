import React, { useContext } from 'react'

import Header from '../../components/Header/Header';
import SideMenu from '../../components/SideMenu/SideMenu';
import { DataContext } from '../../context/DataContext';

const Dashboard = () => {

    const { loadTeachers, loadSubjects } = useContext(DataContext)

    return (
        <div>
            <Header />
            <SideMenu loadTeachers={loadTeachers}
                      loadSubjects={loadSubjects}
            />
        </div>
       
    );
}

export default Dashboard
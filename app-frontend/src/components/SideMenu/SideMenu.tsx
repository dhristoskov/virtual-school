import React, { useContext } from 'react';

import AdminPanel from './AdminPanel/AdminPanel';
import Navigation from './Navigation/Navigation';
import { DataContext } from '../../context/DataContext';

import './SideMenu.scss';

const SideMenu= () => {

    const { loadTeachers, loadSubjects } = useContext(DataContext)

    return (
        <div className='side-menu'>
            <Navigation />
            <AdminPanel loadTeachers={loadTeachers}
                        loadSubjects={loadSubjects}/>
        </div>
    )
}

export default SideMenu;
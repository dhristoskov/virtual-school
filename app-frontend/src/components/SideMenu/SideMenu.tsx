import React from 'react';

import AdminPanel from './AdminPanel/AdminPanel';
import Navigation from './Navigation/Navigation';

import './SideMenu.scss';

interface Props {
    loadTeachers: () => void;
    loadSubjects: () => void;
}

const SideMenu:React.FC<Props> = ({ loadTeachers, loadSubjects }) => {

    return (
        <div className='side-menu'>
            <Navigation />
            <AdminPanel loadTeachers={loadTeachers}
                        loadSubjects={loadSubjects}/>
        </div>
    )
}

export default SideMenu;
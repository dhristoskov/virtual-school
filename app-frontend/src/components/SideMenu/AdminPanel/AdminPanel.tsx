import React, { useState } from 'react';
import { 
    IoCogOutline,
    IoPersonOutline,
    IoBookOutline,
    IoFileTrayFullOutline
} from 'react-icons/io5';

import './AdminPanel.scss';

interface Props {
    loadTeachers: () => void;
    loadSubjects: () => void;
}

const AdminPanel: React.FC<Props> = ({ loadTeachers, loadSubjects }) => {

    const [ hidden, setHidden ] = useState(false);

    const submenuHandler = (): void => {
        setHidden(prevState => !prevState)
    }

    return(
        <div className='admin-menu'>
            <p className='admin-menu-item' onClick={submenuHandler}><IoCogOutline />
                <span className='admin-menu-item--title'>Administration</span>
            </p>
            {
                hidden &&
                <div className='admin-menu-submenu'>
                    <p className='admin-menu-submenu--item'><IoFileTrayFullOutline />
                        <span className='admin-menu-submenu--item-title'>Classes</span>
                    </p>
                    <p className='admin-menu-submenu--item' onClick={loadSubjects}><IoBookOutline />
                        <span className='admin-menu-submenu--item-title'>Subjects</span>
                    </p>
                    <p className='admin-menu-submenu--item'><IoPersonOutline />
                        <span className='admin-menu-submenu--item-title'>Students</span>
                    </p>
                    <p className='admin-menu-submenu--item' onClick={loadTeachers}><IoPersonOutline />
                        <span className='admin-menu-submenu--item-title'>Teachers</span>
                    </p>
                </div>
            }
        </div>
    )
}

export default AdminPanel;
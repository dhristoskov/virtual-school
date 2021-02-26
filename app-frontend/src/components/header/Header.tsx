import React from 'react';
import { 
    IoSchoolOutline, 
    IoMailOutline, 
    IoNotificationsOutline, 
    IoPencilOutline,
    IoLogOutOutline
} from 'react-icons/io5';

//IoMailUnreadOutline - incoming message
//IoNotifications - has notification

import './Header.scss';

const Header = () => {
    return (
        <div className='header-main'>
            <p className='header-main-logo'>Virtual School</p>
            <p className='header-main-school'><IoSchoolOutline /><span>Test School Name - Munich</span></p>
            <div className='header-main-menu'>
                <div className='header-main-menu--buttons'>
                    <IoPencilOutline />
                    <IoNotificationsOutline />
                    <IoMailOutline />
                </div>  
                <div className='header-main-menu--teacher'>
                    <p>Teacher's name</p>
                </div>         
                <p className='header-main-menu--logout'><IoLogOutOutline /></p>
            </div>
        </div>
    );
}

export default Header;
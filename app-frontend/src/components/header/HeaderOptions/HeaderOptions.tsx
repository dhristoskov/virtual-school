import React from 'react';
import { 
    IoMailOutline, 
    IoNotificationsOutline, 
    IoPencilOutline,
    IoLogOutOutline
} from 'react-icons/io5';

import './HeaderOptions.scss'


//IoMailUnreadOutline - incoming message
//IoNotifications - has notification

const HeaderOptions = () => {

    return (
        <div className='header-options'>
            <div className='header-options-menu'>
                <IoPencilOutline />
                <IoNotificationsOutline />
                <IoMailOutline />
                <div className='header-options-menu--teacher'>
                    <p>Administrator</p>
                </div>
            </div>  
            <IoLogOutOutline className='header-options-logout'/>
        </div>
    )
}

export default HeaderOptions;
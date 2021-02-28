import React, { useState } from 'react';

import { 
    IoJournalOutline, 
    IoAnalytics, 
    IoCalendarOutline, 
    IoLibraryOutline, 
    IoWalletOutline,
    IoFootballOutline,
    IoDocumentOutline,
    IoMedalOutline,
    IoFileTrayFullOutline,
    IoPeopleOutline
} from 'react-icons/io5';

import './Navigation.scss';

const Navigation = () => {

    const [ hidden, setHidden ] = useState(false);

    const submenuHandler = (): void => {
        setHidden(prevState => !prevState)
    }

    return(
        <div className='navigation-menu'>
            <p className='navigation-menu-item' onClick={submenuHandler}><IoJournalOutline />
                <span className='navigation-menu-item--title'>Journal</span>
            </p>
            {
                hidden &&
                <div className='navigation-menu-submenu'>
                    <p className='navigation-menu-submenu--item'><IoFileTrayFullOutline />
                        <span className='navigation-menu-submenu--item-title'>Classes</span>
                    </p>
                    <p className='navigation-menu-submenu--item'><IoPeopleOutline />
                        <span className='navigation-menu-submenu--item-title'>Students</span>
                    </p>
                </div>
            }
        
            <p className='navigation-menu-item'><IoAnalytics />
                <span className='navigation-menu-item--title'>Statistics</span>
            </p>
            <p className='navigation-menu-item'><IoCalendarOutline />
                <span className='navigation-menu-item--title'>Events</span>
            </p>
            <p className='navigation-menu-item'><IoDocumentOutline />
                <span className='navigation-menu-item--title'>Exams/Tests</span>
            </p>
            <p className='navigation-menu-item'><IoMedalOutline />
                <span className='navigation-menu-item--title'>Competitions</span>
            </p>
            <p className='navigation-menu-item'><IoLibraryOutline />
                <span className='navigation-menu-item--title'>Study Materials</span>
            </p>
            <p className='navigation-menu-item'><IoFootballOutline />
                <span className='navigation-menu-item--title'>Activities</span>
            </p>
            <p className='navigation-menu-item'><IoWalletOutline />
                <span className='navigation-menu-item--title'>Taxes/Tuition</span>
            </p>
        </div>
    )
}

export default Navigation;
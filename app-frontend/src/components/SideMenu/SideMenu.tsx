import React from 'react';
import { 
    IoJournalOutline, 
    IoAnalytics, 
    IoCalendarOutline, 
    IoLibraryOutline, 
    IoCardOutline,
    IoFootballOutline,
    IoBookOutline,
    IoMedalOutline
} from 'react-icons/io5';

import './SideMenu.scss';

const SideMenu = () => {

    return (
        <div className='side-menu'>
            <p className='side-menu-item'><IoJournalOutline />
                <span className='side-menu-item--title'>Journal</span>
            </p>
            <p className='side-menu-item'><IoAnalytics />
                <span className='side-menu-item--title'>Statistics</span>
            </p>
            <p className='side-menu-item'><IoCalendarOutline />
                <span className='side-menu-item--title'>Events</span>
            </p>
            <p className='side-menu-item'><IoBookOutline />
                <span className='side-menu-item--title'>Exams/Tests</span>
            </p>
            <p className='side-menu-item'><IoMedalOutline />
                <span className='side-menu-item--title'>Competitions</span>
            </p>
            <p className='side-menu-item'><IoLibraryOutline />
                <span className='side-menu-item--title'>Study Materials</span>
            </p>
            <p className='side-menu-item'><IoFootballOutline />
                <span className='side-menu-item--title'>Activities</span>
            </p>
            <p className='side-menu-item'><IoCardOutline />
                <span className='side-menu-item--title'>Taxes/Tuition</span>
            </p>
        </div>
    )
}

export default SideMenu;
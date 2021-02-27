import React from 'react';

import { IoSchoolOutline } from 'react-icons/io5';

import './Header.scss';

import HeaderOptions from './HeaderOptions/HeaderOptions';

const Header = () => {
    return (
        <div className='header-main'>
            <p className='header-main-logo'>Virtual School</p>
            <p className='header-main-school'><IoSchoolOutline />
                <span className='header-main-school--title'>Test School Name - Munich</span>
            </p>
            <HeaderOptions />
        </div>
    );
}

export default Header;
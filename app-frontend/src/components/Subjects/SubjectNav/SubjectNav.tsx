import React from 'react';

import './SubjectNav.scss';

import { navItems } from './NavItems';

interface Props {
    setButtonType: (type: string) => void
}

const SubjectNav:React.FC<Props> = ({ setButtonType }) => {
    return (
        <div className='subject-nav'>
            {
                navItems.map(item => {
                    return (
                        <p key={item.id} className='subject-nav-item' onClick={() => setButtonType(item.id)}>{ item.icon }
                            <span className='subject-nav-title'>{ item.label }</span>
                        </p>
                    )
                })
            }
        </div>
    )

}

export default SubjectNav;
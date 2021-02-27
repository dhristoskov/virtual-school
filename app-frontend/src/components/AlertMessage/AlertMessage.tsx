import React, { ReactNode, useState, useEffect, Fragment } from 'react';

import './AlertMessage.scss';

interface Props {
    children: ReactNode
}

const AlertMessage:React.FC<Props> = ({ children }) => {

    const [visibal, setVisibal] = useState(true);
    // const [ isAlert ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisibal(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <Fragment>
            {
            visibal &&  
                <div className='alert-message'>
                    <p className='alert-message-content'>
                        { children }
                    </p>
                </div>
            }
        </Fragment>
       
    )
}

export default AlertMessage;
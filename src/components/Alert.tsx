import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AlertProps{
    children: ReactNode;
    onClose : ()=>void;
}

const Alert = ({children,onClose}:AlertProps) => {
  return (
    <div className='alert alert-primary alert-dismissible fade show' role="alert">{children}
        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={onClose}>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>    
  )
}



export default Alert
import React, { useState } from 'react'
import { Link,Outlet} from 'react-router-dom'
const Navigation = () => {
    const [click,setClick] = useState(true);

    const handleClick = ()=> setClick(!click);
    const closeMobileMenu = () => setClick(false);
  return (
    <>
        <nav className="navbar">
            <div className='navbar-container'>
                <Link to='/detail' className='navbar-logo'>
                    TRVL
                </Link>
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? "fas fa-times":"fa fa-bars"} aria-hidden="true"></i>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <Link to="/" className='nav-links' onClick={closeMobileMenu}>Home</Link>
                    </li>
                </ul>
            </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default Navigation
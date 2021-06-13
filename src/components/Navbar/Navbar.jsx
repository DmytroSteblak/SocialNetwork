import React from "react"
import s from "./Navbar.module.css"
import {NavLink} from "react-router-dom";


const Navbar = () =>{
    return (
        <nav className={s.navbar}>
            <div className={s.items}>
                <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
            </div>
            <div className={s.items}>
                <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
            </div>
            <div className={s.items}>
                <NavLink to="/dialogs" activeClassName={s.activeLink}>Dialogs</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;
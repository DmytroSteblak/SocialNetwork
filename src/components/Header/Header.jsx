import React from "react"
import s from "./Header.module.css"
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/reducers/authReducers";
import {Link} from "react-router-dom";

const Header = () =>{

    const dispatch = useDispatch()
    const {isAuth,login} = useSelector(({auth}) => auth)


    const handleClick = () =>{
        dispatch(logout())
    }

    return <header className={s.header}>
        <h4>
            Header
        </h4>
        {isAuth ? <div>{login} <button onClick={handleClick}>Выйти</button></div>
            :  <Link to={"/login"}>Login</Link> }

    </header>
}

export default Header;
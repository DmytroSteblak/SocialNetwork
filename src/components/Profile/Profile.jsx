import React, {useEffect, useState} from "react"
import s from "./Profile.module.css"
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPost from "./MyPost/MyPost";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, getUserStatus} from "../../redux/reducers/profileReducers";
import {Redirect,useParams} from "react-router-dom";
import Preloader from "../Common/Preloader/Preloader";
import { useHistory } from "react-router-dom";



const Profile = () =>{
    const {profile} = useSelector(({profile}) => profile)
    const history = useHistory()
    const {userId,isAuth} = useSelector(({auth}) => auth)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() =>{
        let userIdd = id;
        if (!userIdd){
            userIdd = userId
            if (!userIdd){
                history.push("/login")
            }
        }
        dispatch(getProfile(userIdd))
        dispatch(getUserStatus(userIdd))

    },[id,userId])


    if (!profile) {
        return <Preloader/>
    }
    return <div className={s.profile}>
        <ProfileInfo profile={profile}/>
        <MyPost  />
    </div>
}


export default Profile;
import React from "react"
import s from "../Profile.module.css"
import userPhoto from "../../../assets/img/user.png"
import ProfileStatus from "./Status/ProfileStatus";



const ProfileInfo = ({profile}) =>{
    return <div className={s.ProfileInfo}>
        <div className={s.content}>
            <div>
                <div className="img">
                    <img src={profile.photos.large !== null ? profile.photos.large : userPhoto} className={s.mainPhoto} alt=""/>

                </div>
                <div className="fullName">
                    {profile.fullName}
                </div>
                <ProfileStatus/>
            </div>

        </div>
    </div>
}


export default ProfileInfo;
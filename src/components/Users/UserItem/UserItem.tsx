import React from "react";
import s from "../Users.module.css"
import userPhoto from "../../../assets/img/user.png"
import {NavLink} from "react-router-dom";
import {ItemsType} from "../../../types/types";

export interface userItemType{
    item: ItemsType,
    follow: (userId: number) => void,
    unFollow: (userId:number) => void
    followingInProgress: Array<number>
}

const UserItem:React.FC<userItemType> = ({item, follow, unFollow, followingInProgress}):JSX.Element => {
    return (
        <div className={s.item}>
            <div className={s.userPhoto}>
                <div>{item.id}</div>
                <NavLink to={`/profile/${item.id}`}>
                    <img src={item.photos.small != null ? item.photos.small : userPhoto} alt=""/>
                </NavLink>
            </div>
            <div className={s.item_name}>{item.name}</div>
            {item.followed
                ? <button
                    disabled={followingInProgress.some(id => id === item.id)}
                    onClick={() => unFollow(item.id)}>
                    Удалить
                </button>
                : <button
                    disabled={followingInProgress.some(id => id === item.id)}
                    onClick={() => follow(item.id)}>
                    Добавить
                </button>}
        </div>
    )
}


export default UserItem;
import React, {useCallback, useEffect} from "react"
import s from "./Users.module.css"
import {useDispatch, useSelector} from "react-redux";
import {follow, unFollow, requestUsers} from "../../redux/reducers/usersReducers";
import UserItem, {userItemType} from "./UserItem/UserItem";
import Paginator from "../Common/Paginator/Paginator";
import Preloader from "../Common/Preloader/Preloader";
import {Redirect} from "react-router-dom";

import {ItemsType} from "../../types/types";
import {useTypeSelector} from "../Common/Hooks/useTypeSelector";



const Users: React.FC = ():JSX.Element => {

    const dispatch = useDispatch()
    const {totalItemsCount, currentPage, items, pageSize, isLoading,followingInProgress} = useTypeSelector(({users}) => users)
    const {isAuth} = useTypeSelector(({auth}) => auth)

    useEffect(() => {
        dispatch(requestUsers(currentPage))
    }, [currentPage,isAuth])

    const onPageChanged = (pageNumber:number) => {
        dispatch(requestUsers(pageNumber))
    }

    const Follow = (userId:number) => {
        dispatch(follow(userId))
    }

    const UnFollow = (userId:number) => {
        dispatch(unFollow(userId))
    }

    if (!isAuth){
        return <Redirect to={"login"} />
    }




    return (
        <>
            {isLoading ? <Preloader/>
                : <>
                    <Paginator totalItemsCount={totalItemsCount}
                               currentPage={currentPage}
                               pageSize={pageSize}
                               onPageChanged={onPageChanged}/>
                    <div className={s.users}>
                        {items.map((item:ItemsType, id:number) => <UserItem key={id}
                                                           follow={Follow}
                                                           unFollow={UnFollow}
                                                           item={item}
                                                           followingInProgress={followingInProgress}
                        />)}
                    </div>
                </>

            }

        </>

    )
}


export default Users;
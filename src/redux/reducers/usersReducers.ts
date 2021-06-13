
import {userApi} from "../../api/api";
import {ItemsType, resultEnum} from "../../types/types";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

const SET_USERS = 'SET_USERS';
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT"
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const IS_LOADING = "IS_LOADING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"



let initialState = {
    items: [] as Array<ItemsType>,
    pageSize: 15,
    totalItemsCount: 0,
    currentPage: 1,
    isLoading: false,
    followingInProgress: [] as Array<number>
}

type initialStateType = typeof initialState

const usersReducers = (state = initialState, action:ActionType):initialStateType =>{
    switch (action.type){
        case SET_USERS:
            return {
                ...state,
                items: action.payload
            }
        case SET_TOTAL_USERS_COUNT:
            return{
                ...state,
                totalItemsCount: action.payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        case FOLLOW:
            return {
                ...state,
                items: state.items.map(u =>{
                    if (u.id === action.payload){
                        return {
                            ...u,
                            followed: true
                        }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                items: state.items.map(u =>{
                    if (u.id === action.payload){
                        return {
                            ...u,
                            followed: false
                        }
                    }
                    return u;
                })
            }
        case IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isLoading
                    ? [...state.followingInProgress, action.id]
                    : state.followingInProgress.filter(id => id !== action.id)
            }
        default:
            return state;
    }
}

export default usersReducers

interface setUsersType{
    type: typeof SET_USERS,
    payload:Array<ItemsType>
}
interface setTotalUsersCountType{
    type: typeof SET_TOTAL_USERS_COUNT,
    payload: number
}
interface setCurrentPageType{
    type: typeof SET_CURRENT_PAGE,
    payload: number
}
interface followType{
    type: typeof FOLLOW,
    payload: number
}
interface unFollowSuccessType{
    type: typeof UNFOLLOW
    payload: number
}
interface isLoadingType {
    type: typeof IS_LOADING,
    payload: boolean
}
interface toggleFollowingProgressType{
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isLoading: boolean,
    id: number
}
export type ActionType = setUsersType | setTotalUsersCountType | setCurrentPageType | followType | unFollowSuccessType | isLoadingType | toggleFollowingProgressType

export const setUsers = (payload:Array<ItemsType>):setUsersType =>({type:SET_USERS,payload})
export const setTotalUsersCount = (payload:number):setTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT,payload })
export const setCurrentPage = (payload:number):setCurrentPageType => ({type: SET_CURRENT_PAGE,payload })
export const followSuccess = (payload:number):followType => ({type: FOLLOW, payload })
export const unFollowSuccess = (payload:number):unFollowSuccessType => ({type: UNFOLLOW, payload })
export const isLoading = (payload: boolean):isLoadingType =>({type: IS_LOADING,payload})
export const toggleFollowingProgress = (isLoading:boolean,id:number):toggleFollowingProgressType =>({type:TOGGLE_IS_FOLLOWING_PROGRESS, isLoading, id})

type ThunkType = ThunkAction<Promise<void>, RootState, any, ActionType>

export const requestUsers  =  (pageNumber:number):ThunkType => async (dispatch) =>{
    dispatch(setCurrentPage(pageNumber))
    dispatch(isLoading(true))
    let data = await userApi.getUsers(pageNumber)
    dispatch(isLoading(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))

}

export const follow = (userId:number):ThunkType => async (dispatch) =>{
    dispatch(toggleFollowingProgress(true,userId))
    let data = await userApi.follow(userId)
    if (data.resultCode === resultEnum.Success){
        dispatch(followSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false,userId))
}

export const unFollow = (userId:number): ThunkType => async (dispatch) =>{
    dispatch(toggleFollowingProgress(true,userId))
    let data = await userApi.unFollow(userId)

    if (data.resultCode === resultEnum.Success){
        dispatch(unFollowSuccess(userId))
    }
    dispatch(toggleFollowingProgress(false,userId))
}




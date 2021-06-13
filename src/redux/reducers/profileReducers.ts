import {profileApi} from "../../api/api";
import {PostType, ProfileType, resultEnum} from "../../types/types";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = "GET_STATUS"




type initialStateType = typeof initialState

let initialState = {
    post:[
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: "",
}

const profileReducers = (state = initialState,action: ActionType):initialStateType =>{
    switch (action.type){
        case ADD_POST:
            const newPost = {
                id: 5,
                message: action.payload,
                likesCount: 14
            }
            return {
                ...state,
                post: [...state.post, newPost],
                newPostText: ""
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case GET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}
export default profileReducers;




interface addPostActionType{
    type: typeof ADD_POST,
    payload:string
}

interface setUserProfileType{
    type: typeof SET_USER_PROFILE,
    payload:ProfileType
}
interface setStatusType{
    type: typeof GET_STATUS,
    payload: string
}
export type ActionType = addPostActionType | setUserProfileType | setStatusType

export const addPostAction = (payload:string):addPostActionType => ({type: ADD_POST,payload})
export const setUserProfile = (payload:ProfileType):setUserProfileType => ({type: SET_USER_PROFILE, payload})
export const setStatus = (payload:string):setStatusType =>({type: GET_STATUS, payload})

type ThunkType = ThunkAction<Promise<void>, RootState, any, ActionType>

export const getProfile = (id:number):ThunkType => async (dispatch) =>{
    let data = await profileApi.getProfile(id)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (id:number):ThunkType => async (dispatch) =>{
    let data = await profileApi.getStatus(id)
    dispatch(setStatus(data))
}


export const updateMyStatus = (status:string):ThunkType => async (dispatch) =>{
    let data = await profileApi.updateStatus(status)
    if (data.resultCode === resultEnum.Success){
        dispatch(setStatus(status))
    }
}
import {ThunkAction} from "redux-thunk";
import {RootState} from "../redux/store";
import {ActionType} from "../redux/reducers/authReducers";

export interface PostType{
    id: number
    message: string,
    likesCount: number,
}
export interface ContactsType{
    github: string,
    vk:string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string,
    youtube: string,
    mainLink: string
}
export interface PhotosType{
    small:string | null,
    large: string | null
}
export interface ProfileType{
    userId: null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string
    fullName:string,
    contacts: ContactsType
    photos: PhotosType
}

export interface ItemsType{
    id: number,
    name: string,
    status: string
    photos: PhotosType,
    followed: boolean
}

export enum resultEnum{
    Success = 0,
    Error = 1,
    Captcha = 10
}

export type MeType = {
    data: { id:number,email:string,login:string },
    resultCode: resultEnum,
    messages: Array<string>
}
export interface LoginType {
    data: { userId: number},
    resultCode: resultEnum,
    messages: Array<string>
}
export interface LogoutType  {
    data: object,
    resultCode: resultEnum,
    messages: Array<string>
}

export interface ItemsType{
    id:number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}
export interface GetUsersType  {
    items: Array<ItemsType>,
    messages: Array<string>,
    totalCount: number
}
export interface FollowType  {
    resultCode: resultEnum,
    messages: Array<string>,
    data: object
}


export interface UpdateStatusType  {
    resultCode: resultEnum,
    messages: Array<string>,
    data: object
}

export type ThunkType = ThunkAction<Promise<void>, RootState, any, ActionType>

export interface LoginFormType {email:string,password: string, rememberMe:boolean,captcha:string}
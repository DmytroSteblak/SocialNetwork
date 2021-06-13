
import {authAPI} from "../../api/api";

import {resultEnum, ThunkType} from "../../types/types";

const SET_USER_DATA = "SET_USER_DATA"
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';



const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
}

export type initialStateTypeAuthType = typeof initialState;

const authReducers = (state = initialState,action: ActionType):initialStateTypeAuthType =>{
    switch (action.type){
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }

}
export default authReducers;

interface payloadType{
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

interface setUserDataType {
    type: typeof SET_USER_DATA,
    payload: payloadType
}

interface CaptchaType {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl: string }
}

export type ActionType = setUserDataType | CaptchaType

export const setUserData = (userId: number | null,email: string | null,login: string | null,isAuth: boolean):ActionType =>({type: SET_USER_DATA,payload: {userId, email, login, isAuth}})

export const getCaptchaUrlSuccess = (captchaUrl:string):ActionType =>({type:GET_CAPTCHA_URL_SUCCESS, payload:{captchaUrl}})


export const authUserData = ():ThunkType => async (dispatch) =>{
    const data = await authAPI.me()
    if (data.resultCode === resultEnum.Success){
        let {id,email,login} = data.data
        dispatch(setUserData(id,email,login,true))
    }
}
export const login = (email:string,password:string,rememberMe:boolean,captcha:string ):ThunkType => async (dispatch) =>{
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === resultEnum.Success){
        dispatch(authUserData())
    }else{
       if (data.resultCode === resultEnum.Captcha) {
           dispatch(getCaptcha())
       }
    }
}

export const getCaptcha = ():ThunkType => async (dispatch) =>{
    const data = await authAPI.getCaptchaUrl()
    console.log(data)
    dispatch(getCaptchaUrlSuccess(data.url))
}



export const logout = ():ThunkType => async (dispatch) =>{
    const data = await authAPI.logout()
    if (data.resultCode === resultEnum.Success){
        dispatch(setUserData(null,null,null,false))
    }
}


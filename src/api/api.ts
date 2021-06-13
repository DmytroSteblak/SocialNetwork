import axios from "axios";
import {
    FollowType,
    GetUsersType,
    LoginType,
    LogoutType,
    MeType,
    ProfileType,
    UpdateStatusType
} from "../types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "14b8fc90-dd2d-44c1-9e35-5793fc50bb78"
    }
});



export const userApi = {
    async getUsers(pageNumber = 1,pageSize = 15){
        let {data} = await instance.get<GetUsersType>("users",{
            params:{
                page: pageNumber,
                count: pageSize
            }
        })
        return data
    },
    async follow(userId:number){
      let {data} = await instance.post<FollowType>(`/follow/${userId}`)
        return data
    },
    async unFollow(userId:number){
        let {data} = await instance.delete<FollowType>(`/follow/${userId}`)
        return data
    }
}



export const profileApi = {
    async getProfile(id:number){
        let {data} = await instance.get<ProfileType>(`/profile/${id}`)
        return data
    },
    async getStatus(id:number){
        let {data} = await instance.get<string>(`/profile/status/${id}`)
        return data
    },
    async updateStatus(status:string){
        let {data} = await instance.put<UpdateStatusType>(`profile/status`,{status})
        return data
    }
}


export const authAPI = {
    async me(){
        let {data} = await instance.get<MeType>("auth/me")
        return data
    },
    async login(email:string, password:string, rememberMe:boolean,captcha: null | string = null){
        let {data} = await instance.post<LoginType>("auth/login",{
            email, password, rememberMe, captcha
        })
        return data
    },
    async logout(){
        let {data} = await instance.delete<LogoutType>("auth/login")
        return data
    },
    async getCaptchaUrl(){
        let {data} = await instance.get("/security/get-captcha-url")
        return data
    }
}
import {ActionType, authUserData} from "./authReducers";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../store";

const SET_INITIALIZED = "SET_INITIALIZED"

interface initializedType{
    initialized: boolean
}

const initialState:initializedType = {
    initialized: false
}

const appReducers = (state = initialState,action: setInitializedActionType):initializedType =>{
    switch (action.type){
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export default appReducers;

interface setInitializedActionType {
    type: typeof SET_INITIALIZED
}

export const setInitialized = ():setInitializedActionType =>({type: SET_INITIALIZED})



export const initializeApp = ():ThunkAction<Promise<void>, RootState, any, setInitializedActionType> => async (dispatch) =>{
    let promise = dispatch(authUserData())
     await promise
    dispatch(setInitialized())



}




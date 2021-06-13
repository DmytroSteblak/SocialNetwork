import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk"
import usersReducers from "./reducers/usersReducers";
import profileReducers from "./reducers/profileReducers";
import authReducers from "./reducers/authReducers";
import appReducers from "./reducers/appReducers";





const reducers = combineReducers({
    users: usersReducers,
    profile: profileReducers,
    auth: authReducers,
    app: appReducers
})

export type RootState = ReturnType<typeof reducers>



// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store
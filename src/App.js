
import './App.css';
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";

import {Route} from "react-router-dom";
import Users from "./components/Users/Users";
import Dialogs from "./components/Dialogs/Dialogs";
import Login from "./components/Login/Login";
import {useEffect} from "react";
import {authUserData} from "./redux/reducers/authReducers";
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "./redux/reducers/appReducers";
import Preloader from "./components/Common/Preloader/Preloader";

function App() {
    const {initialized} = useSelector(({app}) => app)

    const dispatch = useDispatch()

    useEffect(() =>{
        dispatch(initializeApp())
    },[])

    if (!initialized){
        return<Preloader />
    }

  return (
      <div className={"appWrapper"}>
        <Header />
        <Navbar />
        <div className="wrapperContent">
            <Route path="/profile/:id?" component={Profile} />
            <Route path={"/users"} component={Users} />
            <Route path={"/dialogs"} component={Dialogs} />
            <Route path={"/login"} component={Login} />
        </div>
      </div>
  );
}

export default App;

import React from "react";
import s from "./Login.module.css"
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/reducers/authReducers";
import {Redirect} from "react-router-dom"
import {useTypeSelector} from "../Common/Hooks/useTypeSelector";
import { LoginFormType} from "../../types/types";


const Login:React.FC = ():JSX.Element => {
    const dispatch = useDispatch()
    const {isAuth,captchaUrl} = useTypeSelector(({auth}) => auth)
    const {
        register,
        handleSubmit,
        formState: {errors, submitCount},
        watch
    } = useForm<LoginFormType>({mode: 'onChange'})


    const submitHandler = (formData:LoginFormType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }
    watch("email")
    watch("password")

    console.log(errors)


    return (
        <div className={s.login}>
            <div>
                <h1>Авторизация</h1>

                <form className={s.authForm} onSubmit={handleSubmit(submitHandler)}>
                    <input placeholder={"Mail"}
                           type="text"
                           {...register("email", {required: true, maxLength: 25})}
                    />
                    {errors.email && <i>Обовязковое поле не больше 25 символов</i>}
                    <input type="password"
                           placeholder="Password"
                           {...register("password",{required: true, minLength: 10, maxLength: 30 })}
                    />
                    {errors.password && <i>Обовязковое поле, не меньше 10, не больше 30 символов</i>}
                    <div>
                        <input type="checkbox" {...register("rememberMe")}/> Запомнить меня
                        <input type="submit"/>
                    </div>
                    <div>
                        { captchaUrl && <img src={captchaUrl} />}
                        {captchaUrl && <input{...register("captcha")}/>}
                    </div>

                    Сколько раз отправлена: {submitCount}

                </form>
            </div>
        </div>
    )
}


export default Login;
import React from "react"
import s from "../Profile.module.css"
import {useDispatch, useSelector} from "react-redux";
import {addPostAction} from "../../../redux/reducers/profileReducers";
import {useForm} from "react-hook-form";
import img from "../../../assets/img/Chattab.jpg"

const MyPost = () => {

    const dispatch = useDispatch()
    const {post,newPostText} = useSelector(({profile}) => profile)
    const {register,handleSubmit,formState:{errors,submitCount},watch} = useForm({mode: "onSubmit"})

    const submitHandler = (formDara) => {
        dispatch(addPostAction(formDara.newPost))
    }
    watch("newPost")


    return (
        <div className={s.MyPost}>
            <span>Отправлена {submitCount} раз</span>
            <form onSubmit={handleSubmit(submitHandler)}>
                    <textarea placeholder={"Введете текст"}
                              {...register("newPost",{required: true})}
                        defaultValue={newPostText}
                    /> <br/> {errors.newPost && <i>Поле обовязковоє</i>}
                    <br/>
                <input type={"submit"}/>

            </form>


            {post.map((post,id) =>{
                return <div key={id} className={s.itemPost}>
                    <img src={img} alt="" />
                    { post.message }
                    <div>
                        <span>like</span> { post.likesCount }
                    </div>
                </div>
            })}
        </div>
    )
}


export default MyPost;
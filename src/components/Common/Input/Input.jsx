import React, {createRef} from "react";
import s from "./Input.module.css"



export const Input = (props) => {

    return (
        <>
            <Input>
                {props.children}
            </Input>
        </>
    )
}

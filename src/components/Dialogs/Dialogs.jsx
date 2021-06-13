import React, {useEffect, useState} from "react"
import axios from "axios";


const Dialogs = () =>{
    const [data,setData] = useState()
    useEffect(() =>{
        axios.get("")
    })

    // useEffect(() =>{
    //     setInterval(() =>{
    //         setData(new Date())
    //     },1000)
    // },[data])

    return (
        <div>
            {/*Щас {data.toLocaleTimeString()}*/}
        </div>
    )
 }


export default Dialogs;
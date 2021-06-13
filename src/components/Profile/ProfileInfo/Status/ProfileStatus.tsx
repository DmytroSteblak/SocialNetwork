import React, {ChangeEvent, ChangeEventHandler, FC, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateMyStatus} from "../../../../redux/reducers/profileReducers";
import {useTypeSelector} from "../../../Common/Hooks/useTypeSelector";

// interface StatusType{
//     updateMyStatus:(newStatus:string) => void
// }

const ProfileStatus:React.FC = ():JSX.Element => {
    const dispatch = useDispatch()
    const {status} = useTypeSelector(({profile}) => profile)
    const [changedStatus, setChangedStatus] = useState<string>("")
    const [editMode, setEditMode] = useState<boolean>(false)

    const activateEditMode = () =>{
        setEditMode(true)
    }
    const deactivateEditMode = () =>{
        setEditMode(false)
        dispatch(updateMyStatus(changedStatus))
    }
    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setChangedStatus(e.currentTarget.value)
    }

    return <>
        <div>
            {!editMode &&<h3 onDoubleClick={activateEditMode}>{status || "fgfg"}</h3>}
        </div>
        <div>
            {editMode &&<input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} type="text" defaultValue={changedStatus}/>}
        </div>
    </>
}


export default ProfileStatus;
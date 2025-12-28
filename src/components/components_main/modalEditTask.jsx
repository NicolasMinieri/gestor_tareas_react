import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import style from './../../css/home_styles/modal_task_edit.module.css';



export function ModalEditTask({ tituloModal,changueVisibilityModal,idTaskToEdit,nameTaskFieldModal,descriptionTaskFieldModal,dateTaskFieldModal,updateTasks }) {
    
    const [idTaskEdit, setIdTaskEdit] = useState(idTaskToEdit);

    const [nameTaskField, setNameTaskField] = useState(nameTaskFieldModal);

    const [descriptionTaskField, setDescriptionTaskField] = useState(descriptionTaskFieldModal);

    const [dateTaskField, setDateTaskField] = useState(dateTaskFieldModal);

    const dateEditContent = (e) =>{
        setDateTaskField(e.target.value);
    }

    const nameTaskEditContent = (e) =>{
        setNameTaskField(e.target.value);
    }

    const descriptionTaskFieldEditContent = (e) =>{
        setDescriptionTaskField(e.target.value);
    }

    useEffect(()=>{
        console.log(idTaskEdit);
    },[]);

    const cancel = (e) =>{
        e.preventDefault();
        changueVisibilityModal(false);
    }


    const editTask = async(e) =>{
        e.preventDefault();
        const res = await fetch("https://api-gestor-tareas-postgresql.onrender.com/editTaskDates",{
            method:"PUT",
            credentials:"include",
            body: JSON.stringify({
                name_task: nameTaskField,
                description_task: descriptionTaskField,
                date_task: dateTaskField,
                id: idTaskToEdit
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            changueVisibilityModal(false);
            updateTasks();
        }
    }
    
    return(
        <>
            <div className={style.divContainerEditTask}>
                <div className={style.containerDivTask}>
                    <div className={style.editTask}>
                        <h1>{tituloModal}</h1>
                        <input type="text" onChange={nameTaskEditContent} value={nameTaskField} className={style.inputText} />
                        <input type="text" onChange={descriptionTaskFieldEditContent} value={descriptionTaskField} className={style.inputText} />
                        <input type="text" onChange={dateEditContent} value={dateTaskField} className={style.inputText} />
                        <button type="button" onClick={editTask}>Editar</button>
                        <button type="button" onClick={cancel}>Cancelar</button>
                    </div>
                </div>
            </div>
        </>
    )
}
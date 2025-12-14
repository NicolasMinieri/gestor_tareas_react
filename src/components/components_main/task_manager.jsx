import { useState, useEffect } from "react";
import { Task } from "./task";
import { AdminRoutes } from "../AdminRoutes";
import { ModalEditTask } from "./modalEditTask";
import styles from '../../css/home_styles/container_tasks.module.css';


export function Taskmanager() {

    const [taskList, setTaskList] = useState([]);
    const [descriptionTask, setdescriptionTask] = useState("");
    const [nameTask, setNameTask] = useState("");
    const [dateTask, setDateTask] = useState("");
    const [visibleModal, setVisibleModal] = useState(false);
    const [idTaskEditModal, setidTaskEditModal] = useState();

    //valores que van a ir en el modal
    const [nameTaskFieldEditModal, setNameTaskFieldEditModal] = useState("");
    const [descriptionTaskFieldEditModal, setDescriptionTaskFieldEditModal] = useState("");
    const [dateTaskFieldFieldEditModal, setDateTaskFieldFieldEditModal] = useState("");
    

    //tocar el boton y que se agrege una tarea mas, en este caso ese ejemplo
    
    const handlerAddTask = async(e) =>{
        e.preventDefault();
        
        const res = await fetch("http://localhost:3000/addtask",{
            method:"POST",
            credentials:"include",
            body: JSON.stringify({
                nombre_tarea: nameTask,
                descripcion_tarea: descriptionTask,
                fecha_tarea: dateTask
            }),
            headers:{
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            await consultAllTask();
            setDateTask("");
            setNameTask("");
            setdescriptionTask("");
        }

    }

    const setInfoTaskEdit = (e, name, description, date) =>{
        e.preventDefault();
        setNameTaskFieldEditModal(name);
        setDescriptionTaskFieldEditModal(description);
        setDateTaskFieldFieldEditModal(date);
    }

    const switchModal = (id) =>{
        setVisibleModal(!visibleModal);
        setidTaskEditModal(id)
    }

    const deleteTask = async(e, idTaskParam) => {
        e.preventDefault();

        const res = await fetch(`http://localhost:3000/taskDelete/${idTaskParam}`,{
            method: "DELETE",
            credentials: "include",
        });
        
        if (res.ok) {
            await consultAllTask();
        }

    }
    

    const descriptionValue = (e) =>{
        
        setdescriptionTask(e.target.value);
    }

    const nameTaskValue = (e) =>{
        
        setNameTask(e.target.value);
    }

    const dateTaskValue = (e) =>{
        setDateTask(e.target.value);
    }

    const consultAllTask = async() =>{
        const res = await fetch("http://localhost:3000/taskConsultUpdate",{
            method: "GET",
            credentials:"include"
        });

        const data = await res.json();
        setTaskList(data);
    }

    useEffect(() =>{
        const consultAllTask = async() =>{
            const res = await fetch("http://localhost:3000/taskConsultUpdate",{
                method: "GET",
                credentials:"include"
            });

            const data = await res.json();

            console.log(data);
            
            setTaskList(data);
        }

        consultAllTask();

    },[]);


    return (
        //AdminRoutes evalua el contextJwt, ve su variable a ver si es esta
        <>  
            <div className={styles.container_all}>
                <div className={styles.task_manager}>
                    <form action="" className={styles.form}>
                        <input type="text" placeholder="Nombre tarea" value={nameTask} onChange={nameTaskValue} className={styles.task_name_input}/>
                        <input type="date" value={dateTask} placeholder="Fecha" className={styles.task_date_input} onChange={dateTaskValue} />
                        <input type="text" placeholder="Descripcion" value={descriptionTask} onChange={descriptionValue} className={styles.task_description_input}/>
                        <button type="button" className={styles.button_form} onClick={handlerAddTask}>+</button>
                    </form>
                </div>
                <section className={styles.container_tasks}>
                    <ul className={styles.container_task}>
                        {
                            taskList.map((task) =>{
                                return(
                                    <Task nameTask={task.nombre_tarea} descriptionTask={task.descripcion_tarea} dateTask={task.fecha_cumplimiento_tarea} idTaskProp={task.id_tarea} functionDeleteTask={deleteTask} callTaskModal={switchModal} setValuesToTaskEdit={setInfoTaskEdit} />
                                )
                            })
                        }
                    </ul>
                </section>
                
                {
                    visibleModal ? <ModalEditTask tituloModal={"Editar tarea"} changueVisibilityModal={setVisibleModal} idTaskToEdit={idTaskEditModal} nameTaskFieldModal={nameTaskFieldEditModal} descriptionTaskFieldModal={descriptionTaskFieldEditModal} dateTaskFieldModal={dateTaskFieldFieldEditModal} updateTasks={consultAllTask}></ModalEditTask>: <h1></h1>
                }
                
            </div>
        </>
    );
}
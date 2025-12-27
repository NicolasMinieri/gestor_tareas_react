import { useState } from "react";
import { useEffect } from "react";
import styles from "../../css/home_styles/task.module.css";

export function Task({ nameTask,descriptionTask,dateTask,idTaskProp,functionDeleteTask,callTaskModal,setValuesToTaskEdit }) {
  
  const [idTask, setIdTask] = useState(idTaskProp);

  const handler = async(e) => { 
    e.preventDefault();
    setValuesToTaskEdit(e,nameTask, descriptionTask, dateTask);
    callTaskModal(idTask);
  }

  
  
  const messageDeleteTask = (e) =>{
    functionDeleteTask(e, idTask);
  }

  useEffect(() =>{
    if (idTask == null) {
      console.log("id no definido")
    }
  },[]);

  return (
    <>
      <li className={styles.list_task}>
        <div className={styles.list_task_div_container}>
          <h1 className={styles.Title_task_class}>{nameTask}</h1>
          <div className={styles.div_container_description_date_task}>
            <p>{descriptionTask}</p>
            <p>{dateTask}</p>
          </div>
          <div>
            <button onClick={handler}>Editar</button>
            <button onClick={messageDeleteTask}>Borrar</button>
          </div>
        </div>
      </li>
    </>
  );
}
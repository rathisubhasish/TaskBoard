import React, { useState } from 'react';
import "./CardAction.css"
import addTask from '../../apis/addTask';
import { toast } from "react-toastify";


const CardAction = ({ boardId, userId, setShowActionCard, showActionCard, allTasks, setAllTasks }) => {
  const [task, setTask] = useState("");
   const handleTask = async (e) =>{
      e.preventDefault();
      try {
        const res = await addTask({boardId,task, userId});
        if (res.error){
            toast.error(res.error, {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        else {

          setTask("");
          setShowActionCard(!showActionCard);
          setAllTasks([...allTasks,res.data]);
            toast.success(res.message, {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        } catch (err) {
        toast.error("Server error, please try later!", {
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
   }
  return (
    <>
      <div className='opaque-container'>
        <div className='action-card animateit'>
          <div className='action-card-header'>
            Add Task
          </div>
          <div className='action-card-form'>
            <input
              type="text"
              placeholder='task'
              className='action-form-input'
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
            />
            <br />
            <br />
            {
              task.length > 0
                ?
                <>
                  <button
                    className='btn animateit'
                    id="card-action-btn"
                    onClick={handleTask}
                  >
                    Add Task
                  </button>
                </>
                :
                ''
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default CardAction;
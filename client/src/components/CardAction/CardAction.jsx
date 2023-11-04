import React, { useState } from 'react';
import "./CardAction.css"
import addTask from '../../apis/addTask';
import { toast } from "react-toastify";


const CardAction = ({ boardId, userId, setShowActionCard, showActionCard }) => {
  const [task, setTask] = useState("");
   const handleTask = async (e) =>{
      e.preventDefault();
      try {
        const res = await addTask({boardId,task, userId});
        if (res.error){
            toast.error(res.error, {
            autoClose: 4000,
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
            toast.success(res.message, {
            autoClose: 4000,
            hideProgressBar: true,
            closeButton: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        } catch (err) {
        // loadingVisibility(false);
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
        <div className='action-card'>
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
                    className='btn'
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
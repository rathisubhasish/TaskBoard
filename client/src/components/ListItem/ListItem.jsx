import React , {useState,useContext, useEffect} from 'react'
import deleteBoard from '../../apis/deleteBoard';
import { UserContext } from '../../UserContext';
import { toast } from "react-toastify";
import { CardAction } from '../components';
import getTasks from '../../apis/getTasks';
import deleteTask from '../../apis/deleteTask';
import taskBoardUpdate from '../../apis/taskBoardUpdate';

const ListItem = ({ title, boardId }) => {
    const [allTasks, setAllTasks] = useState([]);
    const [showActionCard, setShowActionCard] = useState(false);
    const { userId } = useContext(UserContext);

    useEffect(()=>{
        const updateTasks = getTasks({userId, boardId})
          .then((res) => {
            if (res.error){
              console.error(res.error);
            }
            else{
              setAllTasks(res.data);
            }
          })
          .catch((err) => {
            console.error(err)
            }
          );
        return () => updateTasks;
      },[])
    
    const handleDeleteBoard = async (e) =>{
        e.preventDefault();
        try {
        const res = await deleteBoard({boardId,userId});
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

    const handleCheckedTasks = async (e) =>{
        e.preventDefault();
        const taskId = e.target.parentNode.parentNode.id;
        if(e.target.checked)
        {   
            
            try {
            const res = await deleteTask({boardId, userId,taskId});
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
    }

    const onDragStart = (event) => {
        event.dataTransfer.setData('newTaskId', event.target.id);
        event.dataTransfer.setData('previousBoardId', event.target.parentNode.id);
    };

    const onDragOver = (event) => {
        event.preventDefault();
    };


    const onDrop = async (event) => {
        event.preventDefault();
        const myTaskId = event.dataTransfer.getData('newTaskId');
        const boardId = event.dataTransfer.getData('previousBoardId');
        const newBoardId = event.target.closest('.list-task-review').id;

        try {
            const res = await taskBoardUpdate({userId, boardId, myTaskId, newBoardId});
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
            
    };

    return (
        <>
            <div className='list-item'>
                {
                    showActionCard
                    ?
                    <>
                        <CardAction boardId={boardId} userId={userId} setShowActionCard={setShowActionCard} showActionCard={showActionCard}/>
                    </>
                    :
                    ''
                }
                <div className='list-item-header'>
                    <span>{title}</span>
                </div>
                <div className='list-task-review' onDragOver={onDragOver} onDrop={onDrop} id={boardId}>
                    {
                        allTasks.length > 0
                        ?
                        <>
                            {
                            allTasks.map((todo)=>{
                                
                                return(
                                    <>
                                        <div className='task' draggable="true" onDragStart={(e) => onDragStart(e, todo.task_id)} id={todo.task_id}>
                                            <div className='task-check'>
                                                <input type="checkbox" className='input-checkbox' onClick={handleCheckedTasks}/>
                                            </div>
                                            <div className='task-description'>
                                                {todo.task_id}
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            }
                        </>
                        :
                        'No Tasks Available'
                    }

                    
                </div>
                <hr />
                <div className='list-item-footer'>
                    <div className='list-actions-area'>
                        <div className='list-delete-icon' onClick={handleDeleteBoard}>
                            <i className="fa-solid fa-trash"></i>
                        </div>
                        <div className='task-add-icon' onClick={()=>setShowActionCard(!showActionCard)}>
                            {
                                showActionCard
                                ?
                                <>
                                    <i class="fa-solid fa-xmark"></i>
                                </>
                                :
                                <>
                                
                                <i className="fa-solid fa-plus"></i>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListItem;
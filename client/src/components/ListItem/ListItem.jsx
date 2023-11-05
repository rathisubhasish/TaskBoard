import React, { useState, useContext, useEffect } from 'react'
import deleteBoard from '../../apis/deleteBoard';
import { UserContext } from '../../UserContext';
import { toast } from "react-toastify";
import { CardAction } from '../components';

import { getTasks, deleteTask, taskBoardUpdate } from '../../apis/apis';

const ListItem = ({ title, boardId, boards, setBoards, dragNdrop }) => {
    const [allTasks, setAllTasks] = useState([]);
    const [showActionCard, setShowActionCard] = useState(false);
    const { userId } = useContext(UserContext);

    useEffect(() => {
        const updateTasks = getTasks({ userId, boardId })
            .then((res) => {
                if (res.error) {
                    console.error(res.error);
                }
                else {
                    setAllTasks(res.data);
                }
            })
            .catch((err) => {
                console.error(err)
            }
            );
        return () => updateTasks;

    }, [dragNdrop.dropBoardId])

    const handleDeleteBoard = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteBoard({ boardId, userId });
            if (res.error) {
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
                setBoards(boards.filter((e) => e.board_id !== boardId));
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

    const handleCheckedTasks = async (e) => {
        e.preventDefault();
        const taskId = e.target.parentNode.parentNode.id;
        if (e.target.checked) {

            try {
                const res = await deleteTask({ boardId, userId, taskId });
                if (res.error) {
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
                    setAllTasks(allTasks.filter((task) => task.task_id !== taskId));
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
        const dragTask = allTasks.filter((task) => task.task_id == event.target.id)[0]
        event.dataTransfer.setData('dragTask', JSON.stringify(dragTask));
        dragNdrop.setDragTask(dragTask)
        event.dataTransfer.setData('dragBoardId', boardId);
        event.target.style.backgroundColor = "#d6f5f5";
    };

    const onDragEnd = (event) => {
        event.target.style.backgroundColor = "white";
    }


    const onDragOver = (event) => {
        event.preventDefault();
    };

    const onDrop = async (event) => {

        event.target.style.backgroundColor = "white";
        event.preventDefault();
        const task = JSON.parse(event.dataTransfer.getData('dragTask')); //picked taskId
        const previousBoardId = event.dataTransfer.getData('dragBoardId'); // previous board id from where task is picked
        const newBoardId = event.target.closest('.list-task-review').id; // new board id where task need to drop

        dragNdrop.setDropBoardId(newBoardId)
        try {
            const res = await taskBoardUpdate({ userId, boardId: previousBoardId, myTaskId: task.task_id, newBoardId, taskName: task.task });
            if (res.error) {
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
                dragNdrop.setDropBoardId(null)
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

    };

    return (
        <>
            <div className='list-item animateit'>
                {
                    showActionCard
                        ?
                        <>
                            <CardAction boardId={boardId} userId={userId} setShowActionCard={setShowActionCard} showActionCard={showActionCard} allTasks={allTasks} setAllTasks={setAllTasks} />
                        </>
                        :
                        ''
                }
                <div className='list-item-header'>
                    <span>{title}</span>
                </div>
                <div className='list-task-review ' onDragOver={onDragOver} onDrop={onDrop} id={boardId} onDragEnd={onDragEnd}>
                    {
                        allTasks.length > 0
                            ?
                            <>
                                {
                                    allTasks.map((todo) => {
                                        return (
                                            <div className='task animateit' draggable="true" onDragStart={(e) => onDragStart(e, todo.task_id)} id={todo.task_id} key={todo.task_id} value={JSON.stringify(todo)}>
                                                <div className='task-check'>
                                                    <input type="checkbox" className='input-checkbox' onClick={handleCheckedTasks} />
                                                </div>
                                                <div className='task-description'>
                                                    {todo.task}
                                                </div>
                                            </div>
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
                        <div className='task-add-icon' onClick={() => setShowActionCard(!showActionCard)}>
                            {
                                showActionCard
                                    ?
                                    <>
                                        <i className="fa-solid fa-xmark"></i>
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
import React, { useState, useEffect, useContext } from 'react';
import "./Board.css";
import { toast } from "react-toastify";
import { ListItem } from '../../components/components';
import { UserContext } from '../../UserContext';
import { addBoard, getBoards } from '../../apis/apis';

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const [dragTask, setDragTask] = useState(null)
  const [dropBoardId, setDropBoardId] = useState(null)
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const updateBoards = getBoards({ userId })
      .then((res) => {
        if (res.error) {
          console.error(res.error);
        }
        else {
          setBoards(res.data);
        }
      })
      .catch((err) => {
        console.error(err)
      }
      );
    return () => updateBoards;
  }, [])

  const addColumns = async (e) => {
    e.preventDefault();
    try {
      const res = await addBoard({ boardTitle, userId });
      if (res.error) {
        setBoardTitle("");
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
        setBoardTitle("");
        toast.success(res.message, {
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setBoards([...boards, res.data]);
      }
    } catch (err) {
      // loadingVisibility(false);
      setBoardTitle("");
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
      <div className='board-container'>
        <div className='board-layout'>
          <div className='board-area'>
            <div className='list-area'>
              {
                !boards.length > 0
                  ?
                  'No Item, Please create new List'
                  :
                  boards.map((data) => {
                    return (
                      <ListItem title={data.board_title} boardId={data.board_id} key={data.board_id} boards={boards} setBoards={setBoards} dragNdrop={{ dragTask, setDragTask, dropBoardId, setDropBoardId }} />
                    )
                  })
              }

            </div>
            <div className='list-control'>
              <div className='list-control-content'>
                <div className='list-control-header'>
                  <h3>Create New List</h3>
                </div>
                <div className='list-add-control'>
                  <input
                    type="text" className='list-add-field'
                    placeholder='add board name'
                    value={boardTitle}
                    onChange={(e) => setBoardTitle(e.target.value)}
                    required
                  />

                  {
                    boardTitle.length > 0
                      ?
                      <>
                        <button className='addbtn btn animateit' onClick={addColumns}>+ Add</button>
                      </>
                      :
                      ''
                  }
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Board;
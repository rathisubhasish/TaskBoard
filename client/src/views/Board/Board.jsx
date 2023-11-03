import React, { useState } from 'react';
import "./Board.css";
import "./HandleBoard";

import { ListItem } from '../../components/components';


const Board = () => {
  const [columns, setColumns] = useState([]);
  let colAdded = [];

  const addColumns = () =>{
    const colToAdd = {
      id: `listid${columns.length+1}`,
      title: `LIST ${columns.length + 1}`,
      tasks: []
    }
    setColumns([...columns, colToAdd]);
  }

  return (
    <>
      <div className='board-container'>
        <div className='board-layout'>
          <div className='board-area'>

            <ul className='list-area'>
              {
                columns.length > 0 
                ? 
                columns.map((data, index)=>{
                  return(<>
                  <li className='list-item' key={index}>
                    sdf
                  {/* <ListItem cols={item} idx={idx}/> */}
                  </li>
                  </>)
                })
                :
                <h3>No Item, Please create new list</h3>
              }
            </ul>
            <div className='list-control'>
              <div className='list-control-content'>
                <div className='list-control-header'>
                  <h3>Create New List</h3>
                </div>
                <div className='list-add-control'>
                  <button className='addbtn btn' onClick={addColumns}>+ Add</button>
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
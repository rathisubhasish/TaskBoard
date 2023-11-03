import React from 'react'

const ListItem = ({cols}) => {
    return (
        <>
            
            <div className='list-item-header'>
                <span>List {cols.id}</span>
            </div>
            <ul className='list-task-review'>
                <li className='task'>
                    <div className='task-check'>
                        <input type="checkbox" className='input-checkbox' />
                    </div>
                    <div className='task-description'>
                        <h4>Eatddfdfffdddddddddddddddddddddddddddddddddddddddddddddddf</h4>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ListItem
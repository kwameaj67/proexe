import React from 'react'

const TableRow = ({ id, name, username, email, city, onClickEditButton, onClickDeleteButton }) => {
    return (
        <tr className="text" key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{username}</td>
            <td>{email}</td>
            <td>{city}</td>
            <td><button onClick={onClickEditButton} className="edit_button">Edit</button></td>
            <td><button onClick={onClickDeleteButton} className="delete_button">Delete</button></td>
        </tr>
    )
}

export default TableRow

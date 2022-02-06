import React from 'react'
import './modal.css'
import { MdClose } from 'react-icons/md'

const Modal = ({ handleShow, handleClose, deleteUser, cancelUser, name, email }) => {
    return (
        <div className={handleShow === true ? 'modal display_block ' : 'modal display_none'}>
            <section className="modal_content">
                <div className="modal_header">
                    <button className="close_button" onClick={handleClose}>
                        <MdClose size={20} />
                    </button>
                    <p>Are you sure you want to really delete user?</p>
                </div>
                <div className="modal_text">
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
                </div>
                <div className="modal_buttons">
                    <button className="cancel" onClick={cancelUser}>Cancel</button>
                    <button  className="save"  onClick={deleteUser}>Delete user</button>
                </div>
            </section>
        </div>
    )
}

export default Modal
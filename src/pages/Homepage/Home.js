import React, { useEffect, useState } from 'react'
import './home.css'
import { Link, useNavigate } from 'react-router-dom'
import { Header, TableRow, Modal } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersAsync, deleteUserAction, } from '../../redux/slices/userSlice'

const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showModal, setShowModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedUser, setSelectedUser] = useState({ id: '', name: '', email: '' })
    const users = useSelector(state => state.users);
    const navigateToEditPage = (item) => {
        navigate(`/edit/${item.id}`, {
            state: {
                id: item.id,
                name: item.name,
                email: item.email
            }
        })
    }
    const navigateToDeleteModal = (item) => {
        setShowModal(true)

        setSelectedUser(selectedUser => ({
            ...selectedUser,
            ...{
                id: item.id,
                name: item.name,
                email: item.email
            }
        }))
        console.log(selectedUser)

    }
    const deleteUserFromStorage = () => {
        dispatch(deleteUserAction({
            id: selectedUser.id
        }))
        setShowModal(false)
    }
    useEffect(() => {
        setLoading(true)
        dispatch(fetchUsersAsync())
        setLoading(false)
        // console.log(users)
    }, [dispatch])
    return (
        <div className="home_container">
            <Header />
            <Modal
                handleShow={showModal}
                handleClose={() => { setShowModal(false) }}
                name={selectedUser.name}
                email={selectedUser.email}
                cancelUser={() => { setShowModal(false) }}
                deleteUser={deleteUserFromStorage}
            />
            <div className="table_container">
                <div className="table_header">
                    <p>User list</p>
                    <Link to='/create-user' style={{ "textDecoration": 'none' }}>
                        <button>Add New User</button>
                    </Link>
                </div>
                <div className="table_content">
                    {users.length === 0 && <p className="user_state">There are no users</p>}
                    {loading === true && <p>Loading users...</p>}
                    <table>
                        <thead>
                            <tr className="titles">
                                <th>Id</th>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>City</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 &&
                                users.map((item) => {
                                    return (
                                        <>
                                            <TableRow
                                                id={item.id}
                                                name={item.name}
                                                username={item.username === "" ? "N/A" : item.username}
                                                email={item.email}
                                                city={item.address.city === "" ? "N/A" : item.address.city}
                                                onClickEditButton={() => { navigateToEditPage(item) }}
                                                onClickDeleteButton={() => { navigateToDeleteModal(item) }}
                                            />

                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HomePage

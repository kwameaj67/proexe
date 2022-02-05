import React,{useEffect} from 'react'
import './home.css'
import { Header, } from '../../components/index'
import { responseData } from '../../utils/data'
import {  useDispatch,useSelector } from 'react-redux'
import { fetchUsersAsync } from '../../redux/slices/userSlice'

const HomePage = () => {
    const dispatch = useDispatch()
    const users = useSelector( state => state.users);
   
    useEffect(()=>{
        dispatch(fetchUsersAsync())
    },[dispatch])
    return (
        <div className="home_container">
            <Header />
            <div className="table_container">
                <div className="table_header">
                    <p>User list</p>
                    <button>Add New User</button>
                </div>
                <div className="table_content">
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
                            {
                                users.map((item) => {
                                    return (
                                        <tr className="text" key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.username}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address.city}</td>
                                            <td><button className="edit_button">Edit</button></td>
                                            <td><button className="delete_button">Delete</button></td>
                                        </tr>
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

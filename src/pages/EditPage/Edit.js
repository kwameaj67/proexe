import React, { useState, useEffect } from 'react'
import './edit.css'
import { Header, } from '../../components/index'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { editUserAction } from '../../redux/slices/userSlice'

const EditPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    // console.log(id);
    const { state } = useLocation();
    const [name, setName] = useState(`${state.name}`)
    const [email, setEmail] = useState(`${state.email}`)
    const [formErrors, setFormErrors] = useState({ name: '', email: '' })

    const editUser = () => {
        // write dispatch action here
        dispatch(editUserAction({
            id: parseInt(id),
            name: name,
            email: email,
        }))
        setName("")
        setEmail("")
        navigate('/')  // redirect to home page

    }
    const validateForm = () => {
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (name === "") {
            setFormErrors(formErrors => ({ ...formErrors, ...{ name: "Name is required" } }))
        } else if (email === "") {
            setFormErrors(formErrors => ({ ...formErrors, ...{ email: "Email address is required" } }))
        } else if (!email_regex.test(email)) {
            setFormErrors(formErrors => ({ ...formErrors, ...{ email: "Please enter a valid Email address" } }))
        } else {
            editUser()
        }
    }
    const submitForm = (e) => {
        e.preventDefault()
        validateForm()
       

    }

    const onClickCancelButton = () => {
        navigate('/')
    }
    useEffect(() => {
    }, [formErrors])
    return (
        <div className="user_container">
            <Header />
            <div className="user_content">
                {/* <pre>{JSON.stringify(formErrors, undefined, 2)}</pre> */}
                <div className="form_area">
                    <p>Edit user</p>
                    <form onSubmit={submitForm} autoComplete='off'>
                        <div className="input_area">
                            <label>Name of user</label>
                            <input autoComplete="off" type="text" placeholder="e.g Joe" value={name} name="name" onChange={(e) =>{    
                                setName(e.target.value)
                            }
                                } />
                            <p className="error_text">{formErrors.name}</p>
                        </div>
                        <div className="input_area">
                            <label>Email Address</label>
                            <input autoComplete="off" type="email" placeholder="Enter Email address" value={email} name="email" onChange={(e) => {
                                setEmail(e.target.value)
                                }} />
                            <p className="error_text">{formErrors.email}</p>
                        </div>
                        <div className="buttons">
                            <button onClick={onClickCancelButton} className="cancel">Cancel </button>
                            <button className="save" >Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditPage

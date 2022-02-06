import React, { useState, useEffect } from 'react'
import './edit.css'
import { Header, } from '../../components/index'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { editUserAction } from '../../redux/slices/userSlice'

const HomePage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { state } = useLocation();
    const [formData, setFormData] = useState({
        name: state.name,
        email: state.email
    })
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const handleInput = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        setFormErrors(validateForm(formData))
    }
    const editUser = () => {
        // write dispatch action here
        dispatch(editUserAction({
            id:state.id,
            name:formData.name,
            email:formData.email,
        }))
    }
    const submitForm = (e) => {
        e.preventDefault()
        setFormErrors(validateForm(formData))
        editUser()
        setFormData({ name: '', email: '' })
        setIsSubmit(false)
        setFormErrors({})
        navigate('/')  // redirect to home page
    }
    const validateForm = (values) => {
        const errors = {}
        const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (values.name === "") {
            errors.name = "Name is required"
        } else if (values.email === "") {
            errors.email = "Email address is required"
        } else if (!email_regex.test(values.email)) {
            errors.email = "Please enter a valid Email address"
        } else {
            setIsSubmit(true)
        }
        return errors;
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
                            <input autoComplete="off" type="text" placeholder="e.g Joe" value={formData.name} name="name" onChange={handleInput} />
                            <p className="error_text">{formErrors.name}</p>
                        </div>
                        <div className="input_area">
                            <label>Email Address</label>
                            <input autoComplete="off" type="email" placeholder="Enter Email address" value={formData.email} name="email" onChange={handleInput} />
                            <p className="error_text">{formErrors.email}</p>
                        </div>
                        <div className="buttons">
                            <button onClick={onClickCancelButton} className="cancel">Cancel </button>
                            <button className="save" disabled={isSubmit === false ? true : false}>Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HomePage

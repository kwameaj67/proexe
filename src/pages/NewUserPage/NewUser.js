import React, { useState, useEffect } from 'react'
import './user.css'
import { Header, BackButton } from '../../components/index'
import { useDispatch } from 'react-redux'
import { addUserAction } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'

const NewUserPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: ''
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
    const addUser = () => {
        dispatch(addUserAction({
            name: formData.name,
            email: formData.email
        }))
    }
    const submitForm = (e) => {
        e.preventDefault()
        setFormErrors(validateForm(formData))
        addUser()
        setFormData({ name: '', email: '' })
        setIsSubmit(false)
        setFormErrors({})
        navigate("/")
        // toaster.success('A new user has been created successfully!')
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
    useEffect(() => {

    }, [formErrors])
    return (
        <div className="user_container">
            <BackButton goBackAction={() => { navigate('/') }} />
            <Header />
            <div className="user_content">
                {/* <pre>{JSON.stringify(formErrors, undefined, 2)}</pre> */}
                <div className="form_area">
                    <p>Create a user</p>
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
                        <button disabled={isSubmit === false ? true : false}>Save user</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default NewUserPage
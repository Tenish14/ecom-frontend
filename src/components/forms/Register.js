import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { useHistory } from "react-router-dom"


const Register = () => {
    const history = useHistory()
    toast.configure()
    const [user, setUser] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    const onSubmitHandler = (e) => {
       e.preventDefault()

       if(user.fullname === "") return toast.error('Fullname box should not be empty' , {autoClose:3000})
       if(user.email === "") return toast.error('Email box should not be empty' , {autoClose:3000})
       if(user.password === "") return toast.error('Password box should not be empty' , {autoClose:3000})
       if(user.password.length < 8) return toast.error('Password should be more than 8 character' , {autoClose:3000})

        fetch(`${SERVER_URL}users/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            toast(data.message)
            setUser({
                fullname: "",
                email: "",
                password: ""
            })
        })
        .catch(e => {
            toast.warning(e.message)
        })
    }

    if(localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('userData')) {
		history.push("/")
	}

    return (
        <div className="col-md-5 mx-auto pt-5">
            <h3 className="text-center">Become Dunker New Member!</h3>
            <Form onSubmit={onSubmitHandler} method="POST">
                <Form.Group>
                    <Form.Label>Fullname</Form.Label>
                    <Form.Control 
                        type="text"
                        name="fullname"
                        value={user.fullname}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Button type="submit" className="btn-block" variant="outline-secondary">Hello, there!</Button>
            </Form>
        </div>
    )
}

export default Register
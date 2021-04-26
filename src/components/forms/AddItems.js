import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import axios from "axios"
import { useHistory } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'


const AddPost = ({getItems}) => {
    const history = useHistory()
    const token = localStorage.getItem('token')
    const [item, setItems] = useState({
        name: "",
        description: "",
        category: "",
        price: "",
        image: ''
    })
    console.log(item.image)

    const onChangeHandler = (e) => {
        setItems({
            ...item,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e) => {
        setItems({
            ...item,
            image: e.target.files[0]
        })
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
       
        if(item.name === "") return toast.error('Product name box should not be empty' , {autoClose:3000})
       	if(item.description === "") return toast.error('Product description box should not be empty' , {autoClose:3000})
       	if(item.category === "") return toast.error('Product category box should not be empty' , {autoClose:3000})
       	if(item.price === "") return toast.error('Product price box should not be empty' , {autoClose:3000})
       	if(item.image === "") return toast.error('Product image box should not be empty' , {autoClose:3000})

        const formData = new FormData ()
        formData.append('image', item.image)
        formData.append('name', item.name)
        formData.append('description', item.description)
        formData.append('category', item.category)
        formData.append('price', item.price)
        
        axios({
            method: "POST",
            url: `${SERVER_URL}items`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
        })
        .then(res => console.log(res))
        .then(data => {
            history.push("/")
            toast.success("Item added successfully")
            getItems()
        })
        
    }

    return (
        <div className="col-md-5 mx-auto">
            <h2 className="text-center">Add New Items</h2>
            <Form onSubmit={onSubmitHandler} method="POST" encType='multipart/form-data'>
                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={item.category}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Image</Form.Label>
                    <Form.File
                        type="file"
                        name="image"
                        accept=".png, .jpg, .jpeg"
                        onChange={handleImage}
                    />
                </Form.Group>
                <Button variant="outline-success" type="submit" className="btn-block">Add Post</Button>
            </Form>
        </div>
    )
}

export default AddPost
import React, { useState } from 'react'
import {Form, Button} from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import axios from "axios"

const EditItem = ({data, setEditing, getItems}) => {
    const [updatedItem, setUpdatedItem] = useState({
		name: data.name,
		description: data.description,
		category: data.category,
		price: data.price,
		image: data.image,
	})

	const onChangeHandler = (e) => {
		setUpdatedItem({
			...updatedItem,
			[e.target.name]: e.target.value
		})
	}

    const handleImage = (e) => {
        setUpdatedItem({
            ...updatedItem,
            image: e.target.files[0]
        })
    }

    const token = localStorage.getItem('token')

	const onSubmitHandler = (e) => {
		e.preventDefault()
		const formData = new FormData ()
        formData.append('image', updatedItem.image)
        formData.append('name', updatedItem.name)
        formData.append('description', updatedItem.description)
        formData.append('category', updatedItem.category)
        formData.append('price', updatedItem.price)
        
        axios({
            method: "PUT",
            url: `${SERVER_URL}items/${data._id}`,
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data",
                "x-auth-token": token
            }
        })
		.then(res => {
            console.log(res.data.msg)
            setEditing(false)
            getItems()
        })
        
        .catch((e) => console.error(e))
	}

    return(
        <Form onSubmit={onSubmitHandler} method="POST" encType='multipart/form-data'>
                <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={updatedItem.name}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Description</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        value={updatedItem.description}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={updatedItem.category}
                        onChange={onChangeHandler}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Product Price</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={updatedItem.price}
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
                <Button variant="outline-success" type="submit" className="btn-block">Edit Post</Button>
            </Form>
    )
}

export default EditItem
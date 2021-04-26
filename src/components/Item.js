import React, { useState } from "react"
import { Card, Button, InputGroup, Form, Modal } from "react-bootstrap"
import { SERVER_URL } from "../config.json"
import Swal from "sweetalert2"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import EditItem from "./forms/EditItems"

const Item = ({ data, getItems, getMyCarts }) => {
    const userData = JSON.parse(localStorage.getItem('userData'))
    const [editing, setEditing] = useState(false)
    const token = localStorage.getItem("token")
    const [cart, setCarts] = useState({
        itemId: data._id,
        quantity: ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onChangeHandler = (e) => {
        setCarts({
            ...cart,
            [e.target.name]: e.target.value
        })
    }

    const addToCartHandler = (id) => {
        fetch(`${SERVER_URL}carts/` + id, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "x-auth-token": token
            },
            body: JSON.stringify(cart)
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.msg)
                console.log(data.msg)
                getMyCarts()
            })
    }

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete this?",
            text: "You won't be able to revert it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Bro, delete this post!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`${SERVER_URL}items/` + id, {
                        method: 'DELETE',
                        headers: {
                            "x-auth-token": token
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast(data.msg)
                            getItems()
                        })
                }
            })
    }

    return (
        <React.Fragment>
            <div className=" mx-auto  my-5  p-0 ">
                <Card style={{ "width": "20rem" }}>
                    {
                        editing ? <EditItem data={data} setEditing={setEditing} getItems={getItems} /> :
                            <div>
                                <Card.Img variant="top" src={`${SERVER_URL}${data.image}`} />
                                <Card.Body >
                                    <Card.Title>{data.name}</Card.Title>
                                    <Card.Text>{data.description}</Card.Text>
                                    <Card.Text>RM{data.price}</Card.Text>
                                    <Button variant="outline-primary" onClick={handleShow} className="mb-1">View Item</Button>
                                    {
                                        userData !== null && userData.user.isAdmin === false ?
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    placeholder="Quantity"
                                                    type="number"
                                                    name="quantity"
                                                    value={cart.quantity}
                                                    onChange={onChangeHandler}
                                                    required
                                                />
                                                <Button variant="outline-secondary" onClick={() => addToCartHandler(data._id)}>Add to Cart</Button>
                                            </InputGroup> : null
                                    }
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Category: {data.category}</small>
                                    {
                                        userData !== null && userData.user.isAdmin === true ?
                                            <React.Fragment>
                                                <div className="ml-auto py-2 ">
                                                    <Button variant="outline-warning" className="mx-2" onClick={() => setEditing(!editing)}>
                                                        {editing ? "Cancel" : "Edit Item"}
                                                    </Button>
                                                    <Button variant="outline-danger" className="mx-2" onClick={() => deleteHandler(data._id)}>Delete Item</Button>
                                                </div>
                                            </React.Fragment> : null
                                    }
                                </Card.Footer>
                            </div>
                    }
                </Card>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Card.Img variant="top" src={`${SERVER_URL}${data.image}`} />
                    </Modal.Header>
                    <Modal.Body>{data.name}</Modal.Body>
                    <Modal.Body>{data.description}</Modal.Body>
                    <Modal.Body>{data.price}</Modal.Body>
                    <Modal.Body>{data.category}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </React.Fragment>
    )
}

export default Item
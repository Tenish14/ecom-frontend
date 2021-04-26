import React from "react"
import { Card, Button } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"
import Swal from "sweetalert2"
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'


const Cart = ({data, getMyCarts}) => {

    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure you want to delete item from cart?",
            text: "You won't be able to revert it!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085D6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`${SERVER_URL}carts/`+id, {
                        method: 'DELETE',
                        headers: {
                            "x-auth-token": localStorage.getItem("token")
                        }
                    })
                        .then(res => res.json())
                        .then(data => {toast(data.msg)})
                        getMyCarts()
                }
            })
    }
    return (
        <div>
            <div className="container-fluid col-md-6">
                <Card className="my-3 ">
                    <div className="d-flex ">
                        <Card.Img variant="top" src={`${SERVER_URL}${data.image}`} style={{ "width": "10rem" }} />
                        <Card.Body className="text-center my-auto">
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>Price: RM{data.price}</Card.Text>
                            <Card.Text>Product Quantity: {data.quantity}</Card.Text>
                            <Card.Text>Subtotal: RM{data.subtotal}</Card.Text>
                            <Button variant="outline-danger" onClick={() => deleteHandler(data.itemId)}>Delete this Product</Button>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Cart
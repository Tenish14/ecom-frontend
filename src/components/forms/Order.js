import React from "react"
import {Card } from "react-bootstrap"
import { SERVER_URL } from "../../config.json"

const Order = ({data}) => {
    console.log(data)
    return(
        <div>
            <div className="container-fluid col-md-6">
                <Card className="my-3 ">
                    <div className="d-flex ">
                        <Card.Img variant="top" src={`${SERVER_URL}${data.image}`} style={{ "width": "10rem" }} />
                        <Card.Body className="text-center my-auto">
                            <Card.Title>Name: {data.name}</Card.Title>
                            <Card.Text>Price: {data.price}</Card.Text>
                            <Card.Text>Product Quantity: {data.quantity}</Card.Text>
                        </Card.Body>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Order
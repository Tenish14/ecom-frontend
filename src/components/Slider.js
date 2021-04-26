import React from "react"
import image1 from "../images/img1.jpg"
import image2 from "../images/img2.jpg"
import image3 from "../images/img3.jpg"
import image4 from "../images/img4.jpg"
import image5 from "../images/img5.jpg"
import { Carousel } from "react-bootstrap"

const Slider = () => {
    return (
        <React.Fragment>
            <Carousel fade >
	            <Carousel.Item interval={2000}>
                    <img
                    className="d-block w-100"
                    src={image1}
                    alt="First slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                    <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                    />
                    </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                        />
                  </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={image4}
                        alt="Third slide"
                        />
                  </Carousel.Item>
                    <Carousel.Item interval={2000}>
                        <img
                        className="d-block w-100"
                        src={image5}
                        alt="Third slide"
                        />
                  </Carousel.Item>
                </Carousel>
        </React.Fragment>
    )
}

export default Slider
import React from 'react';
import { Carousel } from 'react-bootstrap';

const HomeCorousel = () => {
    return (
        <div>
            <Carousel className='cor-top'>
                <Carousel.Item>
                    <img
                        className="d-block w-100 cor-height"
                        src="/images/cor1.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption className='cor-caption'>
                        <div className='cor-title'>First slide label</div>
                        <div className='cor-subtitle'>Nulla vitae elit libero, a pharetra augue mollis interdum.</div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 cor-height"
                        src="/images/cor2.jpg"
                        alt="Second slide"
                    />

                    <Carousel.Caption className='cor-caption'>
                        <div className='cor-title'>Second slide label</div>
                        <div className='cor-subtitle'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 cor-height"
                        src="/images/cor3.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption className='cor-caption'>
                        <div className='cor-title'>Third slide label</div>
                        <div className='cor-subtitle'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</div>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 cor-height"
                        src="/images/cor4.jpg"
                        alt="Third slide"
                    />

                    <Carousel.Caption className='cor-caption'>
                        <div className='cor-title'>Fourth slide label</div>
                        <div className='cor-subtitle'>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</div>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default HomeCorousel;
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, createContext, Children } from 'react';
import { setCountProduct } from '../../action/action'
import Swal from 'sweetalert2'

import React from 'react';


import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import IMG1 from '../../Image/IphoneUI2.jpg'
import Macbook from '../../Image/Macbook2.jpg'
import IPTitan from '../../Image/IPTitan.jpg'
import SPNB_Airpods from '../../Image/SPNB_airpods.jpg'
import SPNB_Macbook from '../../Image/SPNB_macbook.jpg'
import SPNB_Iphone from '../../Image/SPNB_Iphone.jpg'
import {
    Button, Typography, Container,
} from '@mui/material';
import { Link } from 'react-router-dom'
import '../../../src/Home.css'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
const CardProduct = () => {
    const dispatch = useDispatch()
    // New UI
    const pages = ['Trang Chủ', 'Sản Phẩm', 'Thông Tin']
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout']
    const [activeIndex, setActiveIndex] = useState(0)
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [product, setProduct] = useState([])
    const handleSelect = (selectedIndex, event) => {
        setActiveIndex(selectedIndex);
    }

    useEffect(() => {
        fetchGetAll()
    }, [])
    console.log(product);
    const fetchGetAll = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product`)
            const data = await response.json()
            setProduct(data.data.slice(0, 6))
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleProduct = () => {
        console.log('Product')
    }

    return (

        <Container className='container' style={{ maxWidth: '2900px' }}>

            <Container style={{ display: 'flex', backgroundColor: '#FAEBD7', maxWidth: '2900px' }}>
                <Row style={{ width: '100%', color: '#00FFFF' }}>
                    <Col>
                        <Typography variant='h2'>Shop24h</Typography>
                    </Col>

                    <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                        <Typography variant='h5' style={{ fontWeight: 550 }}>Trang Chủ</Typography>

                        <Link to='/Product' style={{ textDecoration: 'none', color: '#00FFFF' }}>
                            <Typography variant='h5' className='product-home' style={{ fontWeight: 550 }}>Sản Phẩm</Typography>
                        </Link>
                        <Typography variant='h5' style={{ fontWeight: 550 }}>Thông Tin</Typography>
                    </Col>

                    <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                        <AccountCircleIcon sx={{ fontSize: 40 }} />
                        <LocalGroceryStoreIcon sx={{ fontSize: 40 }} />
                    </Col>
                </Row>
            </Container>

            <Container sx={{ mt: 3 }} >
                <Carousel>
                    <Carousel.Item>
                        <img
                            className='d-block w-100'
                            src={IMG1} />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className='d-block w-100'
                            src={Macbook} />

                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className='d-block w-100'
                            src={IPTitan} />

                    </Carousel.Item>
                </Carousel>
            </Container>
            <Typography variant='h3' textAlign='center' sx={{ fontWeight: 550, mt: 2 }}>Tại sao lại là Shop24h</Typography>

            <Container sx={{ display: 'flex', mt: 4 }}>
                <Row style={{ width: '110%', gap: '10px' }} >
                    <Col style={{ ml: 5, backgroundColor: '#D2691E', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <LocalShippingIcon sx={{ fontSize: 70, color: 'white' }} />
                        <Typography variant='h6' textAlign='center' sx={{ fontWeight: 550, mt: 2, color: 'white' }}>Giao hàng nhanh chóng</Typography>
                    </Col>
                    <Col style={{ ml: 5, backgroundColor: '#6495ED', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <ProductionQuantityLimitsIcon sx={{ fontSize: 70, color: 'white' }} />
                        <Typography variant='h6' textAlign='center' sx={{ fontWeight: 550, mt: 2, color: 'white' }}>Đa dạng sản phẩm</Typography>

                    </Col>
                    <Col style={{ ml: 5, backgroundColor: '#008B8B', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <AssignmentReturnIcon sx={{ fontSize: 70, color: 'white' }} />
                        <Typography variant='h6' textAlign='center' sx={{ fontWeight: 550, mt: 2, color: 'white' }}>Đổi trả</Typography>
                    </Col>
                    <Col style={{ ml: 5, backgroundColor: '#A9A9A9', borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                        <SupportAgentIcon sx={{ fontSize: 70, color: 'white' }} />
                        <Typography variant='h6' textAlign='center' sx={{ fontWeight: 550, mt: 2, color: 'white' }}>Hỗ trợ 24/7</Typography>
                    </Col>
                </Row>
            </Container>

            <Typography variant='h3' textAlign='center' sx={{ fontWeight: 550, mt: 4 }}>Sản phẩm nổi bật</Typography>

            <Container style={{ display: 'flex', marginTop: '50px', maxWidth: '100%' }}>
                <Row style={{ width: '100%', gap: '10px', maxWidth: '100%' }}>
                    <Col style={{ border: '1px solid black', padding: '10px', borderRadius: 10, textAlign: 'center' }}>
                        <img src={SPNB_Airpods} style={{ width: '50%', borderRadius: 10 }} alt='image' />
                    </Col>

                    <Col style={{ border: '1px solid black', padding: '10px', borderRadius: 10, textAlign: 'center' }}>
                        <Link to='/Macbook'>
                            <img src={SPNB_Macbook} style={{ width: '50%', borderRadius: 10 }} alt='image' />
                        </Link>
                    </Col>

                    <Col style={{ border: '1px solid black', padding: '10px', borderRadius: 10, textAlign: 'center' }}>
                        <img src={SPNB_Iphone} style={{ width: '50%', borderRadius: 10 }} alt='image' />
                    </Col>
                </Row>
            </Container>

            <Typography variant='h3' textAlign='center' sx={{ fontWeight: 550, mt: 4 }}>Sản phẩm bán chạy</Typography>

            <Container style={{ marginTop: '40px', maxWidth: '120%' }}>
                <Row style={{ gap: '2rem', display: 'flex', justifyContent: 'center' }}>
                    {product.map((element, index) => (
                        <Col md={3} key={index} style={{ boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px' }}>
                            <Card style={{ width: '22rem', textAlign: 'center', display: 'flex', alignItems: 'center', gap: '10px' }} >
                                <Card.Img variant="top" src={element.imageUrl} style={{ width: '18rem' }} />
                                <Card.Body>
                                    <Card.Title>{element.name}</Card.Title>

                                    <Button variant="primary">Go somewhere</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            <Container style={{ mt: 5, backgroundColor: '#FAEBD7', maxWidth: '120%', borderRadius: 10, marginTop: '50px' }}>
                <Row style={{ color: '#00FFFF' }}>
                    <Col>
                        <Typography variant='h3' >Shop24H</Typography>
                        <Typography variant='h6' sx={{ mt: 3 }}>Viết năm 2024: Tác Giả</Typography>
                        <Typography variant='h6' sx={{ mb: 2 }}>-DAO ANH KHOA-</Typography>
                        <TelegramIcon sx={{ mr: 1, fontSize: 50 }} />
                        <FacebookIcon sx={{ mr: 1, fontSize: 50 }} />
                        <InstagramIcon sx={{ mr: 1, fontSize: 50 }} />
                        <XIcon sx={{ fontSize: 50 }} />
                    </Col>

                    <Col style={{ marginTop: 'auto' }}>
                        <Typography variant='h6'>Thông tin</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Dịch vụ</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Blog</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Liên hệ</Typography>
                    </Col>

                    <Col style={{ marginTop: 'auto' }}>
                        <Typography variant='h6'>Tuyển dụng</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Điều khoản</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Chính sách bảo hành</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Chính sách đổi trả</Typography>
                    </Col>

                    <Col style={{ marginTop: 'auto' }}>
                        <Typography variant='h6'>Hỗ trợ</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}> Chính sách bảo mật</Typography>
                        <Typography variant='h6' sx={{ mt: 1 }}>Trò chuyện trực tuyến</Typography>
                    </Col>
                </Row>
            </Container>

        </Container >
    )
}

export default CardProduct
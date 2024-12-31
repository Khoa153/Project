
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {
    Button, Grid, Paper,
    Typography, Container, FormGroup,
    FormControlLabel, Checkbox, Card, CardContent,
    CardActions, CardMedia, Switch, Pagination, Breadcrumbs, Slider, Modal, Box,
    FormControl
} from '@mui/material';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'
import '../../Home.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import '../../../src/Home.css'

import { useState } from 'react';
const PriceTotal = () => {
    const [countProduct, setCountProduct] = useState(0)
    const data = JSON.parse(sessionStorage.getItem('Products'))
    const [products, setProducts] = useState(data)
    console.log(data);

    useEffect(() => {
        const cartItems = sessionStorage.getItem('Products')
        if (cartItems) {
            const parsedCartItems = JSON.parse(cartItems)
            setCountProduct(parsedCartItems.length)
        }
    }, [countProduct])
    const removeProduct = (product) => {
        const filtetUpdate = data.filter(item => item._id !== product._id)
        sessionStorage.setItem('Products', JSON.stringify(filtetUpdate))
        setCart([...filtetUpdate])
    }
    return (
        <Container className='container' style={{ maxWidth: '2900px' }}>

            <Container style={{ display: 'flex', backgroundColor: '#FAEBD7', maxWidth: '2900px' }}>
                <Row style={{ width: '100%', color: '#00FFFF' }}>
                    <Col>
                        <Link to='/' style={{ textDecoration: 'none', color: '#00FFFF' }}>
                            <Typography variant='h2'>Shop24h</Typography>
                        </Link>

                    </Col>

                    <Col style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '15px' }}>
                        <Typography variant='h5' style={{ fontWeight: 550 }}>Trang Chủ</Typography>

                        <Link to='/Product' style={{ textDecoration: 'none', color: '#00FFFF' }}>
                            <Typography variant='h5' style={{ fontWeight: 550 }}>Sản Phẩm</Typography>
                        </Link>
                        <Typography variant='h5' style={{ fontWeight: 550 }}>Thông Tin</Typography>
                    </Col>

                    <Col style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px' }}>
                        <AccountCircleIcon sx={{ fontSize: 40 }} />
                        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Link to='/Card' style={{ textDecoration: 'none', color: '#00FFFF' }}>
                                <LocalGroceryStoreIcon className='icon-card' sx={{ fontSize: 40 }} />

                            </Link>
                            <span className="badge bg-primary">{countProduct}</span>
                        </div>
                    </Col>
                </Row>
            </Container>

            <div style={{ display: 'flex', marginTop: '50px', justifyContent: 'space-around', backgroundColor: '#FAEBD7', width: '70%', borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                <Typography variant='h6' style={{ fontWeight: 550, textAlign: 'center' }}>Giỏ hàng của bạn</Typography>
                <div className='back-to-product' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }} >
                    <ArrowBackIcon style={{ fontSize: 30 }} />
                    <Typography variant='h6' style={{ fontWeight: 550, textAlign: 'center' }} >Mua thêm sản phẩm khác</Typography>
                </div>
            </div>

            <div style={{ display: 'flex', marginTop: '10px', justifyContent: 'space-around', backgroundColor: '#FAEBD7', width: '70%', borderRadius: 10, marginLeft: 'auto', marginRight: 'auto' }}>
                <Container spacing={2} >
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="contained" style={{ backgroundColor: '#00FFFF', color: '#FAEBD7', fontWeight: 550, borderRadius: 10 }}>Xóa giỏ hàng</Button>
                    </div>
                    <Row>
                        {products && products.length > 0 ? (products.map((element, index) => (
                            <Col key={index} style={{ display: 'flex', gap: '10px', marginTop: '10px' }} xs={12}  >
                                <img style={{ height: '150px', width: '180px', borderRadius: 10 }} src={element.imageUrl} />
                                <Typography variant='h6' style={{ fontWeight: 550, textAlign: 'center' }}>{element.name}</Typography>
                                <Typography variant='h6' style={{ fontWeight: 550, textAlign: 'center' }}>{element.amount}</Typography>
                            </Col>


                        ))) : null
                        }

                    </Row>
                </Container>
            </div>
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
export default PriceTotal
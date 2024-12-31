
import React, { useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
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
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useState } from 'react';
const Product = () => {
    const categoryOptions = [
        { label: 'Tất Cả', value: 'all' }, // Include an "all" option for selecting all categories
        { label: 'iPhone', value: 'iphone' },
        { label: 'Macbook', value: 'macbook' },
        { label: 'AirPods', value: 'airpods' },
        { label: 'Mac mini', value: 'macmini' },
    ]
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        height: 1000,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(9)
    const [selectedCategory, setSelectedCategory] = useState('all')

    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(2000)

    const [show, setShow] = useState(false)
    const [detail, setDetail] = useState({})
    const [cart, setCart] = useState([])

    const [countProduct, setCountProduct] = useState(0)

    useEffect(() => {
        const cartItems = sessionStorage.getItem('Products')
        if (cartItems) {
            const parsedCartItems = JSON.parse(cartItems)
            setCountProduct(parsedCartItems.length)
        }
    }, [cart, countProduct])


    useEffect(() => {
        fetchAPIProduct()
    }, [currentPage, pageSize, minPrice, maxPrice])
    const fetchAPIProduct = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product`)
            const data = await response.json()
            setProducts(data.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value)
    }

    const handlePriceRangeChange = (event, newValue) => {
        setMinPrice(newValue[0]);
        setMaxPrice(newValue[1]);
        fetchAPIProduct();
    }
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage)
        fetchAPIProduct()
    }

    const handleProduct = (value) => {
        const newCard = [...cart, value]
        const id = value._id
        const storeProduct = sessionStorage.getItem('Products')
        const storeProductArray = storeProduct ? JSON.parse(storeProduct) : []

        if (storeProductArray.some(item => item._id === id)) {
            Swal.fire({
                title: "Sản phẩm đã có trong giỏ hàng",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
        } else {
            const updateProduct = [...storeProductArray, value]
            sessionStorage.setItem('Products', JSON.stringify(updateProduct))
            setCart(newCard)
            Swal.fire("Đã Thêm Vào Giỏ")
            return true
        }
    }

    const handleModal = (value) => {
        console.log(value)
        setShow(true)
        setDetail(value)
        console.log(detail)
    }


    const closeModal = () => {
        setShow(false)
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
                            <Typography variant='h5' className='product-home' style={{ fontWeight: 550 }}>Sản Phẩm</Typography>
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

            <Typography variant='h3' style={{ marginTop: '50px', fontWeight: 550, textAlign: 'center' }}>Danh sách sản phẩm</Typography>

            <Container style={{ mt: 5, maxWidth: '100%', borderRadius: 10, marginTop: '50px' }}>
                <Row style={{ display: 'flex', flexWrap: 'nowrap', gap: '10px' }}>
                    <Col xs={3} style={{ backgroundColor: '#F0F8FF' }}>
                        <Typography variant='h5'>Lọc Sản Phẩm</Typography>
                        <Typography variant='h6'>Tầm giá: 0đ - 60.000.000đ</Typography>
                        <Slider min={0}
                            max={2000}
                            value={[minPrice, maxPrice]}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay="auto"
                            color="primary"
                            aria-label="Price Range"
                            getAriaValueText={(value) => `${value}`} />

                        <Typography variant='h6'>Loại Sản Phẩm</Typography>

                        <div style={{ display: 'flex', flexDirection: 'column', }}> {/* Wrap checkboxes in a flex container */}
                            {categoryOptions.map((option) => (
                                <Col key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '15px', margin: '5px' }}>
                                    <Checkbox
                                        checked={selectedCategory === option.value}
                                        onChange={handleCategoryChange}
                                        value={option.value}
                                        color="primary"
                                        size="large"
                                    />
                                    <Typography variant="h6">{option.label}</Typography>
                                </Col>
                            ))}
                        </div>
                    </Col>

                    <Col item xs={9} spacing={2} style={{ display: 'flex', gap: '20px', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {products
                            .filter(
                                (product) => product.buyPrice >= minPrice && product.buyPrice <= maxPrice
                            )
                            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                            .map((element, index) => (
                                <Col key={index} item xs={3}>
                                    <Card sx={{ maxWidth: 250 }}>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={element.imageUrl}
                                            title="green iguana"
                                        />
                                        <CardContent sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            <Typography gutterBottom variant="h6" component="div">
                                                {element.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {element.buyPrice}$
                                                <b style={{ color: 'red' }}>     {element.promotionPrice}$</b>
                                            </Typography>

                                            <Typography variant="body2" style={{ fontSize: '16px', mt: 3 }} color="text.secondary">
                                                {element.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Tooltip title="Xem Chi Tiết">
                                                <Button size="small" onClick={() => handleModal(element)}>
                                                    <SavedSearchIcon />
                                                </Button>
                                            </Tooltip>
                                            <Tooltip title="Thêm Vào Giỏ Hàng">
                                                <Button size="small" onClick={() => handleProduct(element)}>
                                                    <StorefrontIcon />
                                                </Button>
                                            </Tooltip>
                                        </CardActions>
                                    </Card>
                                </Col>
                            ))}
                    </Col>
                </Row>
                <Grid item lg={12} md={12} sm={12} xs={12} mt={4} style={{ display: "flex", justifyContent: "center" }} >
                    <Pagination count={Math.ceil(products.filter(product => product.buyPrice >= minPrice && product.buyPrice <= maxPrice).length / pageSize)} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Grid>
            </Container>

            <Modal
                open={show}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" style={{ fontWeight: 550, textAlign: 'center' }}>
                        Thông tin sản phẩm
                    </Typography>
                    <hr />
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <img src={detail.imageUrl} style={{ width: '100%' }} />
                            </Col>
                            <Col xs={6}>
                                <Typography variant='h4'>{detail.name}</Typography>
                                <div style={{ display: 'flex', flexDirection: 'column', }}> {/* Flexbox for alignment */}
                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='h5' style={{ fontWeight: 500, opacity: 0.5, marginRight: '10px' }}>Giá gốc:  </Typography>
                                        <Typography variant='h5' style={{ fontWeight: 500, opacity: 0.5, textDecoration: 'line-through' }} >{detail.buyPrice}$</Typography>
                                    </div>

                                    <div style={{ display: 'flex' }}>
                                        <Typography variant='h5' style={{ marginRight: '10px' }}>Giá khuyến mãi: </Typography>
                                        <Typography variant='h5' style={{ color: 'red' }}>
                                            {detail.promotionPrice}$
                                        </Typography>
                                    </div>
                                </div>
                                <Typography variant='h5' style={{ fontWeight: 500, marginTop: '10px' }}>Tồn Kho : {detail.category}</Typography>
                                <Typography variant='h5' style={{ fontWeight: 500, marginTop: '10px' }}>Mô tả: </Typography>
                            </Col>
                        </Row>
                    </Container>
                </Box>
            </Modal>

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
export default Product
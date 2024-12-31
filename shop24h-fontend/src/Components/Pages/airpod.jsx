import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom'

import {
    TextField, Button, Grid, Paper,
    Typography, Container, FormGroup,
    FormControlLabel, Checkbox, Card, CardContent,
    CardActions, CardMedia, Row, Col, Switch, Pagination, Slider
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchAPIProduct, addProductToSession, filterItemPrice, pageChangePagination, fetchAPIGetAllIphone } from '../../action/action'
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
import Bread from './breadcrumbs';
import Footer from '../../Image/FootesIMG.jpg';
import Logo from '../../Image/LogoHeaders.jpg';
import Phone from '../../Image/Phone.jpg';
import Youtube from '../../Image/instagram.jpg';
import Isntagram from '../../Image/youtube.jpg';
import Facebook from '../../Image/facebook.jpg';
import Twitter from '../../Image/twitter.jpg';
const Airpod = () => {
    const dispatch = useDispatch()
    const { countProduct, cartItem } = useSelector((reduxData) => reduxData.shopReducers)
    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [filter, setFilter] = useState('')
    const [card, setCard] = useState([])
    useEffect(() => {
        fetchGetAll()
    }, [currentPage, filter])

    const setTotalPageValue = (data) => {
        const totalPages = Math.ceil(data.length / 9)
        if (!isNaN(totalPages) && totalPages > 0) {
            setTotalPage(totalPages);
        } else {
            setTotalPage(1)
        }
    }
    const fetchGetAll = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product`)
            const data = await response.json()
            const cate = data.cateAirpod
            const filteredData = filterData(cate)
            const paginatedData = getPaginatedData(filteredData)
            setTotalPageValue(Math.ceil(filteredData.length / 9))
            setProduct(paginatedData)
        } catch (error) {
            console.error('Error fetching products:', error)
        }
    }

    const filterData = (data) => {
        if (filter.trim() === '') {
            return data;
        }
        return data.filter(product =>
            product.name.toLowerCase().includes(filter.toLowerCase())
        )
    }

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * 9
        const endIndex = startIndex + 9
        return data.slice(startIndex, endIndex)
    }

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1)
    }

    const handleProduct = (value) => {
        localStorage.setItem('Detail', JSON.stringify(value))

    }
    return (
        < Container >
            <div >
                <div className="d-flex bd-highlight mb-3" style={{ marginRight: '150px', marginLeft: '50px', marginTop: '50px' }}>
                    <div className="me-auto p-2 bd-highlight">
                        <Link to="/">    <img className='logo' src={Logo}></img> </Link>
                    </div>
                    <Link to='/Signup'>
                        <div className="icon-head p-2 bd-highlight mt-3">
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </Link>
                    <div className="icon-head p-2 bd-highlight mt-3"><FontAwesomeIcon icon={faBell} /></div>
                    <Link to='/Card' >
                        <div className="p-2 bd-highlight mt-3">
                            <FontAwesomeIcon icon={faCartShopping} />
                            <span className="badge bg-primary">{countProduct}</span>
                        </div>
                    </Link>
                </div>
                <Bread />
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Typography style={{ fontSize: '18px', textAlign: 'center' }} sx={{ ml: 1, mt: 5 }} gutterBottom><b>Apple</b></Typography>
                        <FormGroup >
                            <Link to='/Iphone' style={{ textAlign: 'center' }}> <Button color="secondary"> Iphone </Button></Link>
                            <Link to='/Macbook' style={{ textAlign: 'center' }}> <Button color="secondary"> Macbook </Button></Link>
                            <Link to='/Airpod' style={{ textAlign: 'center' }}> <Button color="secondary">Airpod</Button></Link>
                            <Link to='/Macmini' style={{ textAlign: 'center' }}> <Button color="secondary">Macmini</Button></Link>

                        </FormGroup>

                    </Grid>
                    <Grid item xs={9} >

                        <div className="form-seach">
                            <input className='input-seach' type='text' placeholder='Seach' value={filter} onChange={handleFilterChange} />
                            <label className='form-label'>Seach</label>
                        </div>
                        <Grid container spacing={2}>
                            {product.map((element, index) => (
                                <Grid key={index} item xs={4}>
                                    <Card sx={{ maxWidth: 250 }}>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={element.imageUrl}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h4" component="div">
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
                                            <Link to='/Detail'>
                                                <Button size="small" onClick={() => handleProduct(element)}>Xem Chi Tiết</Button>
                                            </Link>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <Grid item lg={12} md={12} sm={12} xs={12} mt={4} style={{ display: "flex", justifyContent: "center" }} >
                            <Pagination count={parseInt(totalPage)} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
                        </Grid>

                    </Grid>
                </Grid>
                <div style={{ border: '1px solid #CCC', marginTop: '50px' }}></div>
                <div className='container mt-4 ' style={{ border: '#F0F8FF' }}>
                    <div className='row ' >
                        <div className='col-sm-3 text-center' style={{ fontSize: '14px' }}>
                            <h3>Hỗ trợ khách hàng</h3>
                            <div className='title-1'>
                                <img src={Footer} className='item-footer' />
                                <a href='#' className='a-link'>  <p className='p-delivery'>Kiểm tra đơn hàng</p></a>
                            </div>
                        </div>
                        <div className='col-sm-3 text-center' style={{ fontSize: '14px' }}>
                            <h3>Liên Hệ</h3>
                            <div className='title-2'>
                                <img src={Phone} className='item-footer-2' />
                                <a href='#' className='a-link'>  <p className='p-contact'>1800xxxx</p> </a>
                            </div>
                        </div>
                        <div className='col-sm-3 text-center' style={{ fontSize: '14px' }}>
                        </div>
                        <div className='col-sm-3 mb-5'>
                            <h3 className='social'>Contact Social</h3>
                            <div className='item-social'>
                                <img className='box-item-social' src={Youtube} alt='logo' />
                                <img className='box-item-social' src={Facebook} alt='logo' />
                                <img className='box-item-social' src={Isntagram} alt='logo' />
                                <img className='box-item-social' src={Twitter} alt='logo' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container >
    )
}

export default Airpod
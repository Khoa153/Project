
import { useDispatch, useSelector } from 'react-redux';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import Bread from './breadcrumbs';
import Footer from '../../Image/FootesIMG.jpg';
import Logo from '../../Image/LogoHeaders.jpg';
import Phone from '../../Image/Phone.jpg';
import Youtube from '../../Image/instagram.jpg';
import Isntagram from '../../Image/youtube.jpg';
import Facebook from '../../Image/facebook.jpg';
import Twitter from '../../Image/twitter.jpg';
import { red } from '@mui/material/colors';
import '../../App.css';
import HeaderLogo from './headersLogo'
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { Link, Route, Routes, Router } from 'react-router-dom';
import {
    TextField, Button, Grid, Paper,
    Typography, Container, FormGroup, Slider
} from '@mui/material';
import { setCountProduct } from '../../action/action'
const Total = () => {
    const dispatch = useDispatch()
    const { countProduct, cartItem } = useSelector((reduxData) => reduxData.shopReducers)
    const data = JSON.parse(localStorage.getItem('Products'))
    const [total, setTotal] = useState(0)
    const [cart, setCart] = useState(data)
    useEffect(() => {

        const newTotal = calculatePrice(cart)
        setTotal(newTotal)
        const cartItems = localStorage.getItem('Products')
        if (cartItems) {
            const parsedCartItems = JSON.parse(cartItems)
            dispatch(setCountProduct(parsedCartItems.length))
        }
    }, [cart, total, countProduct])


    const onCLickClearSession = () => {
        setCart([])
        localStorage.removeItem('Products')
    }

    const removeProduct = (product) => {
        const filtetUpdate = data.filter(item => item._id !== product._id)
        localStorage.setItem('Products', JSON.stringify(filtetUpdate))
        setCart([...filtetUpdate])
    }

    const plusQuantity = (product, newAmount) => {
        const foundProductIndex = cart.findIndex(item => item._id === product._id)
        if (foundProductIndex !== -1) {
            const updatedCart = [...cart]
            const updatedProduct = {
                ...updatedCart[foundProductIndex],
                amount: newAmount,
                total: product.promotionPrice * newAmount
            }
            updatedCart[foundProductIndex] = updatedProduct
            const newTotal = calculatePrice(updatedCart)
            setCart(updatedCart)
            setTotal(newTotal)
            return true
        }
    }

    const minusQuantity = (product, newAmount) => {
        const foundProductIndex = cart.findIndex(item => item._id === product._id)
        if (foundProductIndex !== -1 && newAmount > 0) {
            var updatedCart = [...cart]
            var updatedProduct = {
                ...updatedCart[foundProductIndex],
                amount: newAmount,
                total: product.promotionPrice * newAmount
            }
            updatedCart[foundProductIndex] = updatedProduct
            const newTotal = calculatePrice(updatedCart)
            setCart(updatedCart)
            setTotal(newTotal)
            return true
        }
    }

    const calculatePrice = (product) => {
        let total = 0;
        if (product && product.length > 0) {
            for (let i = 0; i < product.length; i++) {
                const productPrice = product[i];
                total += productPrice.promotionPrice * productPrice.amount;
            }
        }
        return total;

    }

    return (
        < Container >
            <div >
                <div className="d-flex bd-highlight mb-3" style={{ marginRight: '150px', marginLeft: '50px', marginTop: '50px' }}>
                    <div className="me-auto p-2 bd-highlight">
                        <a href="/">    <img className='logo' src={Logo}></img> </a>
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
                            <Button color="secondary">Airpod</Button>
                            <Button color="secondary">Macmini</Button>
                            <Button color="secondary">Display</Button>
                        </FormGroup>

                    </Grid>
                    <Grid item xs={9} >
                        <div className='container'>
                            <div className='flex-product-total'>
                                <div className='products'><p >Products</p></div>
                                <div className='total'>
                                    <p>Price</p>
                                    <p>Quantity</p>
                                    <button onClick={() => onCLickClearSession()} type='button' className='button-clear'><MdDeleteForever /></button>
                                </div>
                            </div>
                            <div className='hr'></div>
                            {/* Load Session for Card */}
                            {cart && cart.length > 0 ? (cart.map((element, index) => (
                                <div className='detail-product' key={index} >
                                    <div className='set-1' >
                                        <div ><img className='image' src={element.imageUrl} alt='logo'></img></div>

                                        <div className='nameProducts'>
                                            {element.name}
                                        </div>
                                    </div>
                                    <div className='set-2'>
                                        <p>{element.promotionPrice * element.amount}$</p>
                                        <div className='quantity-count'>
                                            <button type='button' onClick={() => minusQuantity(element, element.amount - 1)} className='button-count'>-</button>
                                            <input type='text' className='input-count' value={element.amount} onChange={() => plusQuantity(element)} readOnly={true} />
                                            <button type='button' onClick={() => plusQuantity(element, element.amount + 1)} className='button-count'>+</button>
                                        </div>
                                        <button className='button-remove' onClick={() => removeProduct(element)}><FaDeleteLeft /></button>

                                    </div>

                                </div>

                            ))
                            )
                                : <div className=''>
                                    <p className='p-product-session'>Giỏ hàng của bạn đang trống</p>

                                    <Link to='/' className='button-back-store'><p className='p-back-home'>Quay lại mua sắm</p></Link>
                                </div>

                            }
                            <div className='hr'></div>
                            {/*Payment */}
                            <div className='flex-total'>
                                <div className='clear-card'>

                                </div>

                                <div className='sub-price'>
                                    <div className='flex-sub'>
                                        <div className='p-total'>Subtotal</div>
                                        <div className='p-price'>{total} $</div>
                                    </div>
                                    <p className='p-calculate'>Shipping and calculate at checkout</p>
                                    <button className='button-total'>Confirm</button>
                                </div>
                            </div>
                        </div>

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

export default Total
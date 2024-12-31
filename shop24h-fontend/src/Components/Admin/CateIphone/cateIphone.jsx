import { useDispatch, useSelector } from "react-redux"
import {
    Select, MenuItem, Button, CircularProgress, Container, Grid,
    Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Modal, FormGroup, Typography
} from "@mui/material";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import { fetchAPIProduct, showModalCreate, pageChangePagination, showModalUpdate, updateObj, fetchAPIDeleteProduct, filterAdmin } from '../../../action/action'
import '../../../App.css';
import CreateModalIphone from "./modalCreateIphone";
import UpdateModalIphone from "./modalUpdateIphone";
import Swal from "sweetalert2";
const CateIphone = () => {
    const dispatch = useDispatch()
    const { isLoading } = useSelector((reduxData) => reduxData.shopReducers)
    const [product, setProduct] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [filter, setFilter] = useState('')
    const [indexProduct, setIndexProduct] = useState(1)
    useEffect(() => {
        fetchGetAll()
    }, [currentPage, filter])
    const setTotalPageValue = (data) => {
        const totalPages = Math.ceil(data.length / 9)
        if (!isNaN(totalPages) && totalPages > 0) {
            setTotalPage(totalPages);
        } else {
            setTotalPage(2)
        }
    }
    const fetchGetAll = async () => {
        try {
            const response = await fetch(`http://localhost:8080/product`)
            const data = await response.json()
            const cateIphone = data.cateIphone
            const filteredData = filterData(cateIphone)
            const paginatedData = getPaginatedData(filteredData)
            setTotalPageValue(Math.ceil(filteredData.length / 9))
            setIndexProduct((currentPage - 1) * 9 + 1)
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

    }
    const handleShow = (value) => {

        dispatch(showModalUpdate())
        dispatch(updateObj(value))

    }
    const deleteOrder = (value) => {
        Swal.fire({
            title: "Bạn chắc chắn muốn xóa ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Có"
        }).then((result) => {
            if (result.isConfirmed) {
                // Thực hiện xóa
                dispatch(fetchAPIDeleteProduct(value))

                Swal.fire({
                    title: "Xóa thành công!",
                    icon: "success"
                }).then(() => {
                    // Reload trang sau khi xóa thành công
                    window.location.reload()
                })
            }
        })
    }
    const onShowModalCreate = () => {
        dispatch(showModalCreate())
    }
    return (

        <Container>
            <Grid container mt={5}>
                <div className="header-admin">
                    <h1 className="h1-order">Danh sách Sản Phẩm Iphone </h1>
                    <button className="button-create" type="button" onClick={onShowModalCreate}>Tạo Sản Phẩm</button>
                </div>
                <Link to='/'><Button className="button-create" type="button" color="secondary">Trở về trang chủ</Button></Link>
                <Grid container>
                    <Grid item xs={6}>
                        <Link to='/Admin' ><Button color="secondary">Tất cả sản phẩm</Button></Link>
                        <Link to='/CateIphone' style={{ textAlign: 'center' }}> <Button color="secondary"> Iphone </Button></Link>
                        <Link to='/CateMacbook' style={{ textAlign: 'center' }}> <Button color="secondary"> Macbook </Button></Link>
                        <Link to='/CateAirpod'> <Button color="secondary">Airpod</Button></Link>
                        <Link to='/CateMacmini'> <Button color="secondary">Macmini</Button></Link>
                    </Grid >
                    <Grid item xs={6}>
                        <div className="form-seach" style={{ marginLeft: '200px' }}>
                            <input className='input-seach' type='text' placeholder='Seach' onChange={handleFilterChange} />
                            <label className='form-label'>Seach</label>
                        </div>
                    </Grid>
                </Grid>

                {product?.length === 0 ? (
                    <Grid item lg={12} md={12} sm={12} xs={12} textAlign="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid >
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="left">Description</TableCell>
                                        <TableCell align="left">Image</TableCell>

                                        <TableCell align="left">BuyPrice</TableCell>

                                        <TableCell align="center">Amount</TableCell>

                                        <TableCell align="center">Phone</TableCell>
                                        <TableCell align="center">Trạng Thái</TableCell>

                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {product?.map((element, index) => (
                                        <TableRow
                                            key={index}
                                        >
                                            <TableCell align="left">{index + indexProduct}</TableCell>
                                            <TableCell align="left">{element.name}</TableCell>
                                            <TableCell align="left">{element.description}</TableCell>
                                            <TableCell align="left"><img src={element.imageUrl} style={{ width: '80px', height: '50px' }} /></TableCell>
                                            <TableCell align="left">{element.buyPrice}</TableCell>
                                            <TableCell align="left">{element.amount}</TableCell>

                                            <TableCell align="left">{element.phone}</TableCell>
                                            <TableCell align="left">{element.status}</TableCell>
                                            <TableCell align="center"><Button onClick={() => handleShow(element)}>Chi tiết</Button></TableCell>
                                            <TableCell align="center"><Button onClick={() => deleteOrder(element._id)}>Delete</Button></TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                )}

                <Grid item lg={12} md={12} sm={12} xs={12} mt={4} style={{ display: "flex", justifyContent: "center" }} >
                    <Pagination count={parseInt(totalPage)} page={currentPage} onChange={handlePageChange} variant="outlined" shape="rounded" />
                </Grid>
                <CreateModalIphone
                    onShowModalCreate={onShowModalCreate} />
                <UpdateModalIphone
                    handleShow={handleShow}
                />
            </Grid>
        </Container>
    )
}
export default CateIphone
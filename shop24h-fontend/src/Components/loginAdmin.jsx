import { useDispatch, useSelector } from "react-redux"
import { fetchLoginAdmin, valueUserName, valuePassword, setAccessToken, setRefreshToken } from '../action/action'
import useHistory, { Link } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
const LoginAdmin = () => {
    const dispatch = useDispatch()
    const { username, password, cofirmpassword } = useSelector((reduxData) => reduxData.shopReducers)
    const handleChangeUserName = (event) => {
        const value = event.target.value
        dispatch(valueUserName(value))
    }

    const handleChangePassword = (event) => {
        const value = event.target.value
        dispatch(valuePassword(value))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            username,
            password
        }
        dispatch(fetchLoginAdmin(user))
    }
    return (
        <Container maxWidth="sm" sx={{ borderRadius: 26, border: '1px solid #D6D6D6', height: '50vh', display: 'flex', alignItems: 'center' }}>
            <div className="div-form" style={{ margin: 'auto', width: '100%', paddingLeft: '5%' }}>
                <form id="form-user" className="" onSubmit={handleSubmit}>
                    <Typography variant="h2" gutterBottom>
                        Login Admin
                    </Typography>
                    <Typography variant="h4" gutterBottom>
                        to get started
                    </Typography>

                    <TextField
                        id="inp-username"
                        label="User Name"
                        variant="outlined"
                        value={username}
                        onChange={handleChangeUserName}
                        fullWidth
                        style={{ height: 50, borderRadius: 10, border: '1px solid #EAEAEA' }}
                    />

                    <TextField sx={{ mt: 4 }}
                        id="inp-password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        value={password}
                        onChange={handleChangePassword}
                        fullWidth
                        style={{ height: 50, borderRadius: 10, border: '1px solid #EAEAEA' }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link to='/Admin'>
                            <Button type="submit" variant="contained" sx={{ height: 50, borderRadius: 10, mt: 3 }}>
                                Continue
                            </Button>
                        </Link>
                        <Link to='/Login' style={{ marginBottom: 6 }}>
                            <SupervisedUserCircleIcon />
                        </Link>
                    </div>

                </form>

            </div >
        </Container >
    )
}
export default LoginAdmin
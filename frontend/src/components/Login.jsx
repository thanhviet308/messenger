import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userLogin } from '../store/actions/authAction'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { SUCCESS_MESSAGE_CLEAR, ERROR_CLEAR } from '../store/types/authType'

const Login = () => {

    const navigate = useNavigate();

    const { loading, authenticate, error, successMessage, myInfo } = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const inputHandle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        dispatch(userLogin(state));
    }

    useEffect(() => {
        if (authenticate) {
            navigate('/');
        }
        if (successMessage) {
            toast.success(successMessage);
            dispatch({ type: SUCCESS_MESSAGE_CLEAR });
        }
        if (error) {
            error.map(err => toast.error(err));
            dispatch({ type: ERROR_CLEAR });
        }
    }, [successMessage, error]);

    return (
        <div className='register'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Login</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={login}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input type='Email' onChange={inputHandle} name="email" value={state.email} className='form-control' placeholder='Email' id='email'></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input type='password' onChange={inputHandle} name="password" value={state.password} className='form-control' placeholder='Password' id='password'></input>
                        </div>
                        <div className='form-group'>
                            <input type='submit' value='Login' className='btn'></input>
                        </div>
                        <div className='form-group'>
                            <span><Link to='/messenger/register'>Don't have a any Account</Link></span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
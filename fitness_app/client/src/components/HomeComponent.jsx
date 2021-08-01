import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { navigate } from '@reach/router';

const HomeComponent = props => {
    
    const cookies = new Cookies();
    const user_id = cookies.get('userID');
    
    const [registerState, setRegisterState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });

    // const [errorState, setErrorState] = useState({});
    const [error, setError] = useState({});

    const registerSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/register', registerState, { withCredentials: true })
            .then(res => {
                // console.log(res)
                if (res.data.msg === 'Success!') {
                    navigate(`/${user_id}`);
                }
            })
            .catch(err => {
                // console.log('errors: ', errors);
                const errors = err.response.data.errors;
                let errorObj = {};
                for (const [key, value] of Object.entries(errors)) {
                    errorObj[key] = value.message;
                }
                setError(errorObj)
                console.log('errorObj: ', errorObj);
                console.log('error:', error)
                // console.log('error: ', error.errors.email);

            });    
            // .catch(err => {
            //     console.log(err);
            //     if (err.response.status === 401) {
            //         console.log('UNAUTHORIZED');
            //     }
            //     else if (err.response.status === 400) {
            //         console.log('BAD REQUEST');
            //     }
            // });
    };

    const loginSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/user/login', loginState, { withCredentials: true })
            .then(res => {
                // console.log(res)
                if (res.status === 200) {
                    navigate(`/dashboard/${user_id}`);
                }
            })
            .catch(err => {
                // console.log('err: ', err.response.data);
                // const {errors} = err.response.data;
                // console.log('errors: ', errors)
                let errorObj = {};
                for (const [key, value] of Object.entries(err.response.data)) {
                    errorObj[key] = value;
                }
                setError(errorObj);
                // console.log('errorObj: ', errorObj);
                // console.log('error: ', error);
            })                 
    }

    const handleLoginChange = e => {
        setLoginState({
            ...loginState,
            [e.target.name]: e.target.value
        })
    };

    const handleRegisterChange = e => {
        setRegisterState({
            ...registerState,
            [e.target.name]: e.target.value
        })
    };

    return (
        <div>
            <h2>New user? Register</h2>
            <form onSubmit={registerSubmit}>
                <p>
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" onChange={handleRegisterChange} />
                    {(error.firstName) ? <p>{error.firstName}</p> : null }
                </p>
                <p>
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" onChange={handleRegisterChange} />
                    {(error.lastName) ? <p>{error.lastName}</p> : null }
                </p>
                <p>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={handleRegisterChange} />
                    {(error.email) ? <p>{error.email}</p> : null }
                </p>
                <p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={handleRegisterChange} />
                    {(error.password) ? <p>{error.password}</p> : null }
                </p>
                <p>
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input type="password" name="confirmPassword" onChange={handleRegisterChange} />
                    {(error.confirmPassword) ? <p>{error.confirmPassword}</p> : null }
                </p>
                <button type="submit">Register</button>
            </form>
            <br />
            <h2>Login</h2>
            <form onSubmit={loginSubmit}>
                <p>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" onChange={handleLoginChange}/>
                    {(error.status === 404) ? <p>{error.msg}</p> : null}
                </p>
                <p>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" onChange={handleLoginChange}/>
                    {(error.status === 400) ? <p>{error.msg}</p> : null}
                </p>
                <button type="submit">Login</button>
            </form>
        </div>
    )

};

export default HomeComponent;
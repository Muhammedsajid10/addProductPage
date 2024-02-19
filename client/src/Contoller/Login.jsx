import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Login = () => {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const navigate = useNavigate()

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/login`, { Email, Password })
            console.log('posted Data : ', response.data);
            const token = response.data.data;
            localStorage.setItem('tokennn', token);
            if (token) {
                Swal.fire({
                    title: "Login Successfull",
                    icon: "success"

                })
                navigate('/itemAdd')

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',

                })
            }


        } catch (error) {
            console.log(`Error whitle posting data : ${error}`)
        }


    }

    return (
        <div className='container'>

            <div className="form-container">
                <h2 style={{ margin: "20px", fontFamily: "monospace", color: "darkgray" }}>Login Page</h2>
                <Form onSubmit={postData}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={Email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Login

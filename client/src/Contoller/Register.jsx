import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Style.css';

const Register = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();

    const postData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/register`, { Name, Email, Password });
            console.log('posted Data : ', response.data.token);
            localStorage.setItem('authToken', response.data.token);
            if (response.data.token) {
                Swal.fire({
                    title: "Registration Successfull",
                    text: "You can now addItems",
                    icon: "success"
                })
                navigate('/itemAdd');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        } catch (error) {
            console.log(`Error while posting data : ${error}`);
        }
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <div className="container">
            <div className="form-container">
                <h2 style={{ margin: "20px", fontFamily: "monospace", color: "darkgray" }}>Registration</h2>
                <Form onSubmit={postData}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label className="form-label">Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" value={Name} onChange={(e) => setName(e.target.value)} className="form-control" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="form-label">Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" value={Email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label className="form-label">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} className="form-control" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="submit-btn">
                        Submit
                    </Button>
                </Form>
                <div>
                    Already have an account? <span onClick={handleLoginClick} style={{ cursor: 'pointer', color: 'blue' }}>Login</span>
                </div>
            </div>
        </div>
    );
}

export default Register;

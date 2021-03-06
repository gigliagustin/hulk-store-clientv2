import React, { Fragment, useState } from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import axios from "axios";
import { isEmpty } from '../components/helpers/validators';

export default function Register() {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState({})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleChange = (event) => {
        console.log(event.target.value);
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const register = () => {
        console.log(isEmpty(userData.name));
        if(isEmpty(userData.name) || isEmpty(userData.surname) || isEmpty(userData.email) || isEmpty(userData.password) || isEmpty(userData.confirmPassword)){
            alert("Todos los campos son requeridos.");
            return;
        }
        if(!validateEmail(userData.email)){
            alert("El email no es valido.");
            return;
        } 

        if(userData.password !== userData.confirmPassword){
            alert("Las contraseñas no coinciden.");
            return;
        }
    
        axios.post(`${process.env.REACT_APP_API_URL}/user/register`, userData).then((response) => {
            console.log(response)
            if (response.data.status.code !== 0) {
                alert(response.data.status.message);
            } else {
                alert("Ya estas registrado. Ahora puedes iniciar sesion.");
                setUserData({});
                setShow(false);
            }
        })
    
    }
    return (
        <Fragment>
            <Button variant="outline-success" className="" onClick={handleShow}>
                Registrarme
            </Button>
            <Modal show={show} onHide={handleClose} keyboard={false} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Registro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="userFirstname">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Nombre" value={userData.name} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} controlId="userLastname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Apellido" name="surname" value={userData.surname} onChange={handleChange} required />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="userPassword">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" placeholder="Email" name="email" value={userData.email} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userPassword">
                            <Form.Label>Contraseña:</Form.Label>
                            <Form.Control type="password" placeholder="Contraseña" name="password" value={userData.password} onChange={handleChange} required/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="userPasswordRepeat">
                            <Form.Label>Repita su contraseña:</Form.Label>
                            <Form.Control type="password" placeholder="Repetir contraseña" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} required />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" type="submit" onClick={register} className="btn-hulkPrimary">
                        Registrarme
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button> 
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

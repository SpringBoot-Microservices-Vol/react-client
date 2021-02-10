import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";
import {authService, API} from "../utils/API";
import Card from "react-bootstrap/Card";
import './Login.css'

const Login = () => {
    const [redirect, toggleRedirect] = useState(authService.isAuthenticated());
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    function login(event) {
        event.preventDefault();

        API.post('/login', {username, password})
            .then(({data}) => {
                authService.login(data.jwt);
                toggleRedirect(true);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleUsername = event => updateUsername(event.target.value);
    const handlePassword = event => updatePassword(event.target.value);

    return (
        <div className={'login'}>
            <Card className={'login-container'}>
                <h3 className={'login-title'}>Login</h3>
                <Form onSubmit={login} className={'login-form'}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Utilizatorul</Form.Label>
                        <Form.Control type="username" placeholder="Introdu numele utilizatorului" value={username}
                                      onChange={handleUsername}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Parola</Form.Label>
                        <Form.Control type="password" placeholder="Introdu parola" value={password}
                                      onChange={handlePassword}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={'login-form-submit-button'}>
                        Login
                    </Button>
                    {redirect && <Redirect to={'/home'}/>}
                </Form>
            </Card>
        </div>
    );
};


export default Login
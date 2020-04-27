import React from 'react'
import {
    Form,
    Button,
    Container,
    Col,
    Row,
    Card
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

class Regis extends React.Component {

    state={
        username:'',
        password:'',
        name: '',
        role:0,
        status:0
    }

    handleInputUsername=(event)=>{
        let inputUsername = event.target.value
        this.setState({
            username: inputUsername
        }) 
    }

    handleInputPassword=(event)=>{
        let inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    handleInputName=(event)=>{
        let inputName = event.target.value
        this.setState({
            name: inputName
        })
    }

    handleSubmitRegistration=(event)=>{
        event.preventDefault()
        const {name, username, password, role, status} = this.state
        const data = {
            username: username,
            password: password,
            name: name,
            role: role,
            status: status
        }
        if (!name || !username || !password) {
            alert('All form must filled')
        } else {
            axios
                .post(`http://127.0.0.1:3001/user/registration`, data)
                .then(res=>{
                    if (res.status === 200) {
                        alert('Registration success, Redirected to Login Page')
                        this.props.history.push('/Login')
                    }
                })
                .catch(()=>{
                    alert('Check input of form')
                })
        }
    }


    render() {
        return (
            <Container fluid='sm'>
                <Row className="justify-content-md-center">
                    <Col xs={6} md={4}>
                        <Card>
                            <Card.Body>
                                <Card.Title>Registration</Card.Title>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter name"
                                        onChange={(event)=>this.handleInputName(event)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter username" 
                                        onChange={(event)=>this.handleInputUsername(event)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password" 
                                        onChange={(event)=>this.handleInputPassword(event)}
                                        />
                                    </Form.Group>
                                    <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={(event)=> this.handleSubmitRegistration(event)}
                                    >
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default withRouter(Regis)
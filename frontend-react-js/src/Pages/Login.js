import React from 'react'
import {
    Form,
    Button,
    Container,
    Col,
    Row,
    Card
} from 'react-bootstrap'
import qs from 'qs'
import axios from 'axios'
import {connect} from 'react-redux'

class Login extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInputUsername = (event) =>{
        let inputUsername = event.target.value
        this.setState({
            username: inputUsername
        })
    }

    handleInputPassword = (event) =>{
        let inputPassword = event.target.value
        this.setState({
            password: inputPassword
        })
    }

    handleSubmitLogin = (event)=>{
        event.preventDefault()
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        if (!this.state.username || !this.state.password) {
            alert('Please enter username and password')
        } else {
            axios.post(`http://127.0.0.1:3001/user/login`, qs.stringify(data))
            .then(res =>{
                if (res.status === 200) {
                    this.props.setDataLogin(res.data.data)
                    this.props.history.push('/Home')
                }
            })
            .catch(error=>{
               alert("Username or password invalid") 
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
                                <Card.Title>Login</Card.Title>
                                <Form>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control 
                                        type="text" 
                                        placeholder="Enter username"
                                        onChange={(event)=> this.handleInputUsername(event)}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        onChange={(event)=> this.handleInputPassword(event)}
                                        />
                                    </Form.Group>
                                    <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={(event)=>this.handleSubmitLogin(event)}
                                    > Login
                                    </Button>
                                </Form>
                            </Card.Body>
                            <Card.Body>
                                <Card.Link href="/Regis">Registration</Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
      auth: state.auth
    }
  }
  
  const mapDispatchToProps = dispatch => ({
    setDataLogin: payload => dispatch({
      type: 'POST_LOGIN_FULLFILLED',
      payload
    })
  })

export default connect(mapStateToProps,mapDispatchToProps)(Login)
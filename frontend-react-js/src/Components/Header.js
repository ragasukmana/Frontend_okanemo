import React from 'react'
import {
    Navbar,
    Nav,
    Dropdown,
    Modal,
    Button,
    Card,
    CardImg
} from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Header extends React.Component {
    state = {
        openModal: false,
    }

    handleCloseModal = () => this.setState({
        openModal: false
    })

    handleOpenModal = () => this.setState({
        openModal: true
    })

    handleLogout = () => {
        this.props.setLogout()
        this.props.history.push('/Login')
    }
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand
                    as={Link}
                    to={'/Home'}>
                    Welcome</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link
                        as={Link}
                        to={'/Home'}>
                        Home</Nav.Link>
                    {this.props.auth.data.role === 1 ?
                        <Nav.Link
                            as={Link}
                            to={'/User'}
                        >Manage User</Nav.Link>
                        : null}
                </Nav>
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Setting
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item
                            as='button'
                            onClick={() => this.handleOpenModal()}
                        >Profile</Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => this.handleLogout()}
                        >Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Modal show={this.state.openModal} onHide={this.handleCloseModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Hello</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card style={{ alignItems: 'center' }}>
                            <CardImg
                                src={require('../public/assets/Images/ava.png')}
                                style={{ width: 150, height: 150, borderRadius: 100 }}
                            />
                            <Card.Body>
                                <Card.Title style={{ textAlign: 'center' }}>{this.props.auth.data.name}</Card.Title>
                                <Card.Text style={{ textAlign: 'center' }}>
                                    {this.props.auth.data.role === 1 ? "Admin" : "Member"}
                                </Card.Text>
                                <Card.Text style={{ textAlign: 'center' }}>
                                    Status
                            {this.props.auth.data.status === 1 ?
                                        <div style={{ color: 'green' }}>
                                            Active
                                        </div> :
                                        <div style={{ color: 'red' }}>
                                            Not Active
                                        </div>}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Navbar>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => ({
    setLogout: payload => dispatch({
        type: 'POST_LOGOUT',
        payload
    })
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
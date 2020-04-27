import React from 'react'
import {
    Table,
    Button,
    Modal,
    Form
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

class User extends React.Component {
    componentDidMount() {
        this.getUser()
    }

    state = {
        dataUser: null,
        selectedData: {},
        openModal: false,
    }

    handleCloseModal = () => this.setState({
        openModal: false
    })

    getUser = () => {
        axios.get(`http://127.0.0.1:3001/user/`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        dataUser: res.data.data
                    })
                }
            })
    }
    handleSelectedData = (event, data) => {
        event.preventDefault()
        this.setState({
            selectedData: data,
            openModal: true
        })
    }

    handleEditName = (value) => {
        this.setState({
            selectedData: {
                ...this.state.selectedData,
                name: value
            }
        })
    }

    handleEditPassword = (value) => {
        this.setState({
            selectedData: {
                ...this.state.selectedData,
                password: value
            }
        })
    }

    handleEditRole = (e) => {
        let { value } = e.target
        this.setState({
            selectedData: {
                ...this.state.selectedData,
                role: value
            }
        })
    }

    handleEditStatus = (e) => {
        let { value } = e.target
        this.setState({
            selectedData: {
                ...this.state.selectedData,
                status: value
            }
        })
    }

    handleEditSubmit = (event, id_user) => {
        event.preventDefault()
        const { selectedData } = this.state
        const data = {
            password: selectedData.password,
            name: selectedData.name,
            role: selectedData.role,
            status: selectedData.status
        }
        if (!selectedData.password) {
            alert("Enter Password")
        } else {
            axios.put(`http://127.0.0.1:3001/user/edituser/${id_user}`, data)
                .then(res => {
                    if (res.status === 200) {
                        this.getUser()
                        this.handleCloseModal()
                        alert("Success Edit User")
                    }
                })
                .catch(()=>{
                    alert('Something wrong')
                })
        }
    }

    render() {
        const { dataUser, openModal, selectedData } = this.state
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'center' }}>Name</th>
                        <th style={{ textAlign: 'center' }}>Username</th>
                        <th style={{ textAlign: 'center' }}>Role</th>
                        <th style={{ textAlign: 'center' }}>Status</th>
                        <th style={{ textAlign: 'center' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {dataUser ?
                        dataUser.map((data) => {
                            return (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>{data.name}</td>
                                    <td style={{ textAlign: 'center' }}>{data.username}</td>
                                    <td style={{ textAlign: 'center' }}>{data.role === 1 ? "Admin" : "Member"}</td>
                                    <td style={{ textAlign: 'center' }}>{data.status === 1 ?
                                        <div style={{ color: 'green' }}>
                                            Active
                                        </div> :
                                        <div style={{ color: 'red' }}>
                                            Not Active
                                        </div>}
                                    </td>
                                    <div style={{ textAlign: 'center' }}>
                                        <Button
                                            onClick={(event) => this.handleSelectedData(event, data)}
                                        >
                                            Edit User
                                        </Button>
                                    </div>
                                </tr>
                            )
                        })
                        : null}
                </tbody>

                <Modal show={openModal} onHide={this.handleCloseModal} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit user</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    disabled
                                    defaultValue={selectedData.username}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    defaultValue={selectedData.name}
                                    onChange={(event) => this.handleEditName(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    onChange={(event) => this.handleEditPassword(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={selectedData.role}
                                    onChange={this.handleEditRole}
                                >
                                    <option value={0}>Member</option>
                                    <option value={1}>Admin</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    defaultValue={selectedData.status}
                                    onChange={this.handleEditStatus}
                                >
                                    <option value={0}>Not Active</option>
                                    <option value={1}>Active</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={this.handleCloseModal}>
                            Close
                        </Button>
                        <Button
                            variant="primary"
                            onClick={(event) => this.handleEditSubmit(event, selectedData.id_user)}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Table>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User))
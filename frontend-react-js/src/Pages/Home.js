import React from 'react'
import {
    Card,
    Button,
    CardDeck
} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'

class Home extends React.Component {

    componentDidMount(){
        this.getBook()
    }

    state={
        listBooks: null
    }

    getBook=()=>{
        axios.get(`http://127.0.0.1:3001/book`)
        .then(res=>{
            if (res.status === 200) {
                this.setState({
                    listBooks: res.data.data
                })
            }
        })
    }

    handleTakeBook=()=>{
        if (this.props.auth.data.status === 1) {
            alert('Success take a book')
        } else {
            alert('Sorry, you status still not active')
        }
    }

    render() {
        console.log(this.state.listBooks);
        const {listBooks} = this.state    
        return (
            <CardDeck>
                {listBooks ? 
                listBooks.map((data)=> {
                    return(
                        <Card style={{ alignItems: 'center' }}>
                            <Card.Img variant="top" src={require('../public/assets/Images/book.png')} style={{height:200, width:200}}/>
                            <Card.Body>
                                <Card.Title style={{textAlign:'center'}}>{data.title}</Card.Title>
                            </Card.Body>
                            <Card.Footer>
                                <Button 
                                variant="primary"
                                onClick={()=>this.handleTakeBook()}
                                >Take a book</Button>
                            </Card.Footer>
                         </Card> 
                    )
                })
                : null}
            </CardDeck>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps)(Home))
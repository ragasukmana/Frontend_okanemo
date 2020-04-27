import React from 'react'
import { connect } from 'react-redux'

class Main extends React.Component {
    componentDidMount(){
        if (this.props.auth.data.token) {
            this.props.history.push('/Home')
        } else {
            this.props.history.push('/Login')
        }
    }
    render() {
        return (
            null
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect (mapStateToProps)(Main)
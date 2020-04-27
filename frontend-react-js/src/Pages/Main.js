import React from 'react'
import {
    Badge
} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

class Main extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    Example heading <Badge variant="secondary">New</Badge>
                </h1>
                <h2>
                    Example heading <Badge variant="secondary">New</Badge>
                </h2>
                <h3>
                    Example heading <Badge variant="secondary">New</Badge>
                </h3>
                <h4>
                    Example heading <Badge variant="secondary">New</Badge>
                </h4>
                <h5>
                    Example heading <Badge variant="secondary">New</Badge>
                </h5>
                <h6>
                    Example heading <Badge variant="secondary">New</Badge>
                </h6>
            </div>
        )
    }
}

export default withRouter(Main)
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import Header from './components/Header'
import Main from './pages/Main'
import Login from './pages/Login'
import Regis from './pages/Regis'
import Home from './pages/Home'
import User from './pages/User'

import { connect } from 'react-redux'

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        {this.props.auth.data.token && <Header {...this.props} />}
        <Switch>
          <Route path='/' exact render={(props)=>(<Main {...props}/>)} />
          <Route path='/Login' render={(props)=>{
             return this.props.auth.data.token ? (<Redirect to='/Home'/>) : (<Login {...props} />)
          }} />
          <Route path='/Regis' render={(props)=>{
            return this.props.auth.data.token ? (<Redirect to='/Home'/>) : (<Regis {...props} />)
          }} />
          <Route path='/Home' render={(props)=>{
             return this.props.auth.data.token ? (<Home {...props} />) : (<Redirect to='/Login'/>) 
          }} />
          <Route path='/User' render={(props)=> {
            return this.props.auth.data.role === 1 ? (<User {...props} />) : (<Redirect to='/Home'/>)
          }}/>
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}


export default connect(mapStateToProps)(App)

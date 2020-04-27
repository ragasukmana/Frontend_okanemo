import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'
import Header from './Components/Header'
// import Home from './Pages/Home'
// import User from './Pages/User'
// import Login from './Pages/Login'
// import Regis from './Pages/Regis'
import Main from './Pages/Main'


class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Header {...this.props} />
        <Switch>
          <Route path='/' exact render={(props)=>(<Main {...props}/>)} />
          {/* <Route path='/Login' render={(props)=>(<Login {...props} />)} />
          <Route path='/Regis' render={(props)=>(<Regis {...props} />)} />
          <Route path='/Home' render={(props)=>(<Home {...props} />)} />
          <Route path='/User' render={(props)=>(<User {...props} />)} /> */}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;

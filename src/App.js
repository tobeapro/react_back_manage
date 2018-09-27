import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom"
import { Button } from 'antd'
import Login from './pages/login'
import Home from './pages/home'
const NoMatch = () => (
  <div style={{textAlign:'center',paddingTop:100}}>
    <h1>404</h1>
    <Button type='primary'>
      <Link to='/'>返回首页</Link>
    </Button>
  </div>
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

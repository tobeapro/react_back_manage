import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom"
import { Layout, Menu, Icon, Button } from 'antd'
import Personal from '../personal'
import Article from '../article'
const { Header, Footer, Sider, Content } = Layout
const HomePage = () => (
  <div>
    home page
  </div>
)
class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      defaultSelectedKeys:''
    }
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  redirectRouter = ({ item, key, keyPath }) => {
    this.props.history.push(key)
  }
  componentWillMount(){
    if(this.props.location.pathname==='/'){
      this.props.history.push('/home')
    }
    console.log(this)
    this.setState({
      defaultSelectedKeys:this.props.location.pathname
    })
  }
  render() {
    return (
      <div className="home">
        <Header>
          <Button type="primary" onClick={this.toggleCollapsed}>
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
        </Header>
        <Layout>
          <Sider
            collapsed={this.state.collapsed}
          >
            <Menu
              style = {{height:'calc(100vh - 64px)',overflow:'auto'}}
              defaultSelectedKeys={[this.state.defaultSelectedKeys]}
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="/home" onClick={this.redirectRouter}>
                <Icon type="pie-chart" />
                <span>首页</span>
              </Menu.Item>
              <Menu.Item key="/personal" onClick={this.redirectRouter}>
                <Icon type="desktop" />
                <span>个人信息</span>
              </Menu.Item>
              <Menu.Item key="/article" onClick={this.redirectRouter}>
                <Icon type="inbox" />
                <span>文章</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
              <Route path='/home' component={HomePage} />
              <Route path='/personal' component={Personal} />
              <Route path='/article' component={Article} />
          </Content>
        </Layout>
      </div>
    );
  }
}

export default Home
import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Layout, Menu, Icon, Button } from 'antd'
const { Header, Sider, Content } = Layout
export default class MainLayout extends Component {
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
  componentWillMount(){
    this.setState({
      defaultSelectedKeys:this.props.location
    })
  }
  render() {
    const {children} = this.props
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
              <Menu.Item key="/home">
                <Link to="/">
                    <Icon type="pie-chart" />
                    <span>首页</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/personal">
                <Link to="/personal">
                    <Icon type="desktop" />
                    <span>个人信息</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/article">
                <Link to="/article">
                    <Icon type="inbox" />
                    <span>文章</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Content>
              {children}
          </Content>
        </Layout>
      </div>
    );
  }
}

import React, { Component } from 'react'
import { Form, Icon, Input, Button, message} from 'antd'
import $http from '../../assets/http'
class LoginForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      username:'admin',
      password:'123456'
    }
  }
  login = () => {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        $http.postForm('back_manage/api/login',{
          name:values.userName,
          password:values.password
        }).then(res=>{
          if(res.result===1){
            this.props.history.push('/')
          }else if(res.msg){
            message.error(res.msg)
          }else{
            message.error('登录失败')
          }
        })
      }
    })
  }
  componentDidMount () {
    this.props.form.setFieldsValue({
      userName:this.state.username,
      password:this.state.password
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login" style={{width:'400px',margin:'0 auto',paddingTop:100}}>
        <Form onSubmit={this.login}>
          <Form.Item>
            {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名' }],
            })(
            <Input prefix={<Icon type="user" />} placeholder="账号" autoComplete="new-username" />
            )}
          </Form.Item>
          <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input prefix={<Icon type="lock" />} type="password" placeholder="密码" autoComplete="new-password" />
          )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={this.login}>登录</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const Login = Form.create()(LoginForm)
export default Login;

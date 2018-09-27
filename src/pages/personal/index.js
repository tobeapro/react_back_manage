import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message} from 'antd'
import $http from '../../assets/http'
import './index.css'
export default class Personal extends Component {
    constructor(props){
        super(props)
        this.state={
            userInfo:{}
        }
    }
    componentWillMount(){
        $http.get('back_manage/api/getInfo').then(res=>{
            if(res.result===1){
                this.setState({
                    userInfo:res.data
                })
            }else if(res.msg){
                message.error(res.msg)
            }else{
                message.error('获取信息失败')
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    render(){
        const ROOTSERVER = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/'

        return (
            <div className='personal'>
                <div className='menu-item'>
                    <label className='menu-item-title'>用户名</label><span>{this.state.userInfo.name}</span>
                </div>
                <div className='menu-item'>
                    <label className='menu-item-title'>头像</label><span><img width='100' src={ROOTSERVER+this.state.userInfo.avatar} /></span>
                </div>
                <div className='menu-item'>
                    <label className='menu-item-title'>操作</label><span><Button type='primary'>修改密码</Button></span>
                </div>
            </div>
        )
    }
} 
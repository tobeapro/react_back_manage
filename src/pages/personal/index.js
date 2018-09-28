import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message, Avatar, Upload, Modal} from 'antd'
import MainLayout from '../../components/mainLayout'
import $http from '../../assets/http'
import './index.css'
class PersonalForm extends Component {
    constructor(props){
        super(props)
        this.state={
            userInfo:{},
            changeState:false
        }
    }
    getInfo(){
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
    componentWillMount(){
        this.getInfo()
    }
    changePassword = () => {
        this.props.form.validateFields(
            (err,value) => {
                if (!err) {
                    $http.postForm('back_manage/api/pwdUpdate',{
                        oldPwd:value.oldPassword,
                        newPwd:value.newPassword
                    }).then(res=>{
                        if(res.result===1){
                            message.success('修改成功')
                            this.setState({
                                changeState:false
                            })
                            this.props.form.resetFields()
                        }else if(res.msg){
                            message.error(res.msg)
                        }else{
                            message.error('修改失败')
                        }
                    })
                }
            }
        )
    }
    render(){
        const _this = this
        const ROOTSERVER = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/'
        const uploadProps = {
            name:'file',
            action:ROOTSERVER+'back_manage/api/upload_avatar',
            showUploadList:false,
            withCredentials:true,
            beforeUpload(file){
                const isImg = file.type === 'image/png' || file.type === 'image/jpeg'
                if(!isImg){
                    message.error('只能上传PNG或JPG格式的图片')
                    return false
                }
                return true
            },
            onChange(info){
                if(info.file.status === 'done'){
                    if(info.file.response.result===1){
                        message.success('上传成功')

                        const userInfo = Object.assign(_this.state.userInfo,{avatar:info.file.response.url})
                        _this.setState({
                            userInfo
                        })
                    }else if(info.file.response.result===0){
                        Modal.warning({
                            title: '警告',
                            content: '你未登录或登录信息已失效！',
                            afterClose(){
                                _this.props.history.push('/login')  
                            }
                        })
                    }else if(info.file.response.msg){
                        message.error(info.file.response.msg)
                    }else{
                        message.error('上传失败')
                    }
                    
                }else if(info.file.status === 'error'){
                    message.error('上传失败')
                }
            }
        }
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 18 },
        }
        return (
            <MainLayout location='/personal'>
                <div className='personal'>
                    <Form>
                        <Form.Item label="用户名" {...formItemLayout}>
                            <span>{this.state.userInfo.name}</span>
                        </Form.Item>
                        <Form.Item label="头像" {...formItemLayout}>
                            {
                                this.state.userInfo.avatar?
                                <img width='100' style={{marginRight:20}} src={ROOTSERVER+this.state.userInfo.avatar} />
                                :
                                <Avatar style={{marginRight:20}} icon="user" />
                            }
                            <Upload {...uploadProps}>
                            <Button>
                                <Icon type="upload" /> 
                                    { this.state.userInfo.avatar?'更新头像':'上传头像' }
                                </Button>
                            </Upload>
                        </Form.Item>
                        <Form.Item label="操作" {...formItemLayout}>
                            <span><Button type='primary' onClick={()=>{this.setState({
                                changeState:true
                            })}}>修改密码</Button></span>
                        </Form.Item>
                        <Form.Item style={{display:this.state.changeState?'block':'none'}} label="原密码" {...formItemLayout}>
                            {getFieldDecorator('oldPassword', {
                                rules: [{
                                required: true,
                                message: '请输入原密码',
                                }],
                            })(
                                <Input placeholder="原密码" style={{width:200}} type="password" />
                            )}
                        </Form.Item>
                        <Form.Item style={{display:this.state.changeState?'block':'none'}} label="新密码" {...formItemLayout}>
                            {getFieldDecorator('newPassword', {
                                rules: [{
                                required: true,
                                message: '请输入新密码',
                                }],
                            })(
                                <Input placeholder="新密码" style={{width:200}} type="password" />
                            )}
                        </Form.Item>
                        <Form.Item style={{display:this.state.changeState?'block':'none'}} wrapperCol = {{ offset: 2 }}>
                            <Button style={{marginRight:10}} onClick={()=>{
                                this.props.form.resetFields()
                                this.setState({
                                    changeState:false
                                })
                            }}>取消</Button>
                            <Button type='primary' onClick={this.changePassword}>确认</Button>
                        </Form.Item>
                    </Form>
                </div>
            </MainLayout>
        )
    }
} 
const Personal = Form.create()(PersonalForm)
export default Personal
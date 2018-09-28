import React, { Component } from 'react'
import { Table, message, Button, Popconfirm } from 'antd'
import MainLayout from '../../components/mainLayout'
import $http from '../../assets/http'
import './index.css'
export default class Article extends Component {
  constructor(props){
    super(props)
    this.state={
      dataSource:[],
      columns:[
        {
          title:'标题',
          dataIndex:'title',
          key:'title'
        },
        {
          title:'作者',
          dataIndex:'user_name',
          key:'user_name'
        },
        {
          title:'创建时间',
          dataIndex:'create_time',
          key:'create_time',
          render:time=>new Date(time).toLocaleString()
        },
        {
          title:'更新时间',
          dataIndex:'update_time',
          key:'update_time',
          render:time=>new Date(time).toLocaleString()
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          width: 360,
          render: (text, record) => (
            <span>
              <Button size="small" type="primary" style={{marginRight:10}}>编辑</Button>
              <Popconfirm title="确认删除该条数据?" onConfirm={()=>{this.deleteItem}}  okText="确认" cancelText="取消">
                <Button size="small" type="danger">删除</Button>
              </Popconfirm>
            </span>
          )
        }
      ]
    }
  }
  deleteItem(){

  }
  getItems(){
    $http.get('back_manage/api/articles').then(res=>{
      if(res.result===1){
        this.setState({
          dataSource:res.data
        })
      }else if(res.msg){
        message.error(res.msg)
      }else{
        message.error('获取失败！')
      }
    }).catch(()=>{

    })
  }
  componentWillMount(){
    this.getItems()
  }
  render() {
    return (
      <MainLayout location='/article'>
        <div className='articles'>
          <Table size='small' rowKey='_id' columns={this.state.columns} dataSource={this.state.dataSource} bordered></Table>
        </div>
      </MainLayout>
    )
  }
}

import React, { Component } from 'react'
import { Table, message, Button } from 'antd'
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
          key: 'action',
          width: 360,
          render: (text, record) => (
            <span>
              <Button size="small" type="primary" style={{marginRight:10}}>编辑</Button>
              <Button size="small" type="danger">删除</Button>
            </span>
          )
        }
      ]
    }
  }
  componentWillMount(){
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
  render() {
    return (
      <div className='articles'>
        <Table size='small' columns={this.state.columns} dataSource={this.state.dataSource}></Table>
      </div>
    )
  }
}

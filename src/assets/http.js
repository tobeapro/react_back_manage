import { BrowserRouter as Router} from "react-router-dom"
import { Modal } from 'antd'
import qs from "qs"
let requsetUrl 
process.env.NODE_ENV === 'development' ? requsetUrl = 'http://localhost:4000/' : requsetUrl = '/' 
function filterUrl(url){
    if(url.slice(0,4) === 'http' || url.slice(0,2) === '//'){
        return url
    }else{
        return requsetUrl + url
    }
}
function checkTimeout(data){

    if(data.result===0){
        Modal.warning({
            title: '警告',
            content: '你未登录或登录信息已失效！',
            afterClose(){
                Router.push('/')  
            }
        })
        throw new Error('timeout')
    }else{
        return data
    }
}
function filterFetch(url,options){
    return fetch(filterUrl(url),options).then(res=>{
        if(res.ok){
            return res.json().then(data=>{
               return checkTimeout(data)
            })
        }else{
            throw new Error('error status:' + res.status)
        }
    },err=>{
        throw new Error(err)
    })
}
// function encodeFormData(data){
//     let formData = new FormData()
//     for(let key in data){
//         formData.append(key,data[key])
//     }
//     return formData
// }
class request {
    get(url){
        return filterFetch(url,{
            credentials: 'include'
        })
    }
    postJSON(url,data){
        return filterFetch(url,{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            credentials: 'include' 
        })
    }
    postForm(url,data){
        return filterFetch(url,{
            method: 'POST',
            body: qs.stringify(data),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            credentials: 'include' 
        })
    }
}
const $http = new request()
export default $http
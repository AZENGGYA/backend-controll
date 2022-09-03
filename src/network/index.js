import axios from "axios"


export const instance = axios.create({
    baseURL:'http://localhost:8001',
    timeout: 5000
})

instance.interceptors.request.use(
    config=>{
        if (JSON.parse(window.localStorage.getItem('token'))) {
            config.headers.token = JSON.parse(window.localStorage.getItem('token'))
        }
        return config
    },
    err=>{
        alert('请求超时')
        return Promise.reject(err)
    }
)

instance.interceptors.response.use(
    response=>{
        if(response.data.code == 200){
            return response;
        }
        else{
            alert("请求错误，服务器返回："+response.data.msg)
            return Promise.reject(response.data.msg);
        }
    },err =>{
        alert({message:"发生错误！"+err})
        return Promise.reject(err);
    }
)
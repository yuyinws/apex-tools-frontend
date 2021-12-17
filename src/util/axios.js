import axios from 'axios'
import { Toast } from 'vant'

const domain = 'https://apex-api-yuyinws.vercel.app'

axios.interceptors.response.use(
  (res) => {
    const { data } = res
    if (data.status === 200 && !data.data.Error) {
      return data
    } else {
      Toast.fail('出错了:(')
      return false
    }
  },
  (err) => {
    console.log(err)
    Toast.fail('出错了:(')
    return false
  }
)

const _axios = (method, url, params) => {
  method = method.toUpperCase()
  let options = {
    method: method,
    url: domain + url,
  }
  if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    if (params) {
      options.data = params
    }
  }

  if (method === 'GET' || method === 'DELETE') {
    if (params) {
      options.params = params
    }
  }

  return axios(options).then(
    (res) => {
      return res
    },
    (error) => {
      return error
    }
  )
}

export default _axios

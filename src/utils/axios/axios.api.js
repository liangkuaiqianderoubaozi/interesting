import axios from '@/utils/axios/axios'

export const post = ({ url, param }) => {
  const params = Object.assign(param, {})
  return new Promise((resolve, reject) => {
    axios.send({
      url: url,
      method: 'post',
      params
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export const get = ({ url, param }) => {
  const params = Object.assign(param, {})
  return new Promise((resolve, reject) => {
    axios.send({
      url: url,
      method: 'get',
      params
    }).then(res => {
      resolve()
    }).catch(err => {
      reject(err)
    })
  })
}

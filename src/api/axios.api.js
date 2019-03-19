import axios from '../libs/axios/axios'

export const post = ({url, param}) => {
    let params = Object.assign(param, {});
    return new Promise((resolve, reject) => {
        axios.go({
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


export const get = ({url, param}) => {
    let params = Object.assign(param, {});
    return new Promise((resolve, reject) => {
        axios.go({
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
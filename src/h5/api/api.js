import axios from 'axios'

// 这里写后台地址
const boiteDomain = 'https://xxx-xxx'// 本地版接口(测试)
const boiteDomain1 = 'https://xxx-xxx'// 本地版接口(测试)
const boiteDomain2 = 'https://xxx-xxx'// 本地版接口(测试)

const api = {
    send: function (obj) {
        //后台返回的token
        let access_token = '123'
        if (access_token) {
            axios.defaults.headers.common['Authorization'] = access_token;
        }
        let apiObj = {}
        if (obj.type === 'get') {
            apiObj.params = obj.data;
            apiObj.method = 'get';
        } else {
            apiObj.data = obj.data;
            apiObj.method = 'post';
        }
        apiObj.url = boiteDomain1 + obj.url;
        if (obj.url.indexOf('login') !== -1) {
            apiObj.url = boiteDomain + obj.url;
        }
        if (obj.url.indexOf('weixinUser') !== -1) {
            apiObj.url = boiteDomain2 + obj.url;
        }
        const instance = axios.create();
        return instance(apiObj);
    },
    sendAll: function (arr) {
        return axios.all(arr);
    }
}

export default api;

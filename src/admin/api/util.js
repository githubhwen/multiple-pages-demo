import axios from 'axios'
import { message } from 'antd'

const util = {
    exportTable: function (url, tableName, that) {
        let access_token = sessionStorage.getItem('access_token');
        if (access_token) {
            axios.defaults.headers.common['Authorization'] = access_token;
        }
        // 这里写导出文件的后台地址
        const baseUrl = 'https://xxx---xxx'
        let config = {}
        config = {
            method: 'get',
            url: `${baseUrl}${url}`,
            responseType: 'blob'
        }
        axios.request(config)
            .then(function (res) {
                let blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' }) // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
                let downloadElement = document.createElement('a')
                let href = window.URL.createObjectURL(blob) // 创建下载的链接
                downloadElement.href = href
                downloadElement.download = tableName // 下载后文件名
                document.body.appendChild(downloadElement)
                downloadElement.click() // 点击下载
                document.body.removeChild(downloadElement) // 下载完成移除元素
                window.URL.revokeObjectURL(href) // 释放掉blob对象
                that.setState({ isExporting: false })
            })
            .catch((error) => {
                that.setState({ tableLoading: false })
                message.error('导出失败，服务器错误')
            })
    }
}

export default util;

// 留言管理
import React, { Component } from 'react'
import { Table, Row, Col, Button, Pagination, message, Spin } from 'antd';
import api from '../api/api.js';
import util from '../api/util';

const columns = [
    {
        title: '编号',
        render:(text,record,index)=>`${index+1}`,
        key: '0'
    },
    {
        title: '用户头像',
        dataIndex: 'headImg',
        render: text => <img src={text} width={50} height={50}/>,
        key: '1'
    },
    {
        title: '用户昵称',
        dataIndex: 'userName',
        key: '2'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: '3'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: '4'
    },
    {
        title: '国家',
        dataIndex: 'country',
        key: '5'
    },
    {
        title: '省份',
        dataIndex: 'province',
        key: '6'
    },
    {
        title: '城市',
        dataIndex: 'city',
        key: '7'
    },
    {
        title: '留言内容',
        dataIndex: 'content',
        render: text => {
            return <p className="table-p">
                {text}
            </p>
        },
        key: '8',
        width: 200,
    },
    {
        title: '留言时间',
        dataIndex: 'createTime',
        key: '9'
    },
];

class Message extends Component {

    constructor(props) {
        super(props)
        this.state = {
            current: 1,
            pageSize: 5,
            total: 0,
            pageSizeOptions: ['5', '10', '20'],
            dataSource: [],
            tableLoading: false,
            notPagination: false,
            isExporting: false,
        }
    }

    componentDidMount() {
        this.setState({ tableLoding: true })
    }

    exportTable = () => {
        let that = this
        this.setState({ isExporting: true })
        let tableName = '留言明细.xls'
        let url = 'message/downexcel'
        util.exportTable(url, tableName, that)
    }

    handlePageChange = (page, pageSize) => {
        this.setState({ current: page })
        this.setState({ tableLoding: true })
        this.getData()
    }

    handleSizeChange = (current, size) => {
        this.setState({ tableLoding: true })
        this.setState((pre, props) => {
            return { pageSize: size, current: 1 }
        }, () => {
            this.getData()
        })
    }

    render() {
        let showTotal = function (total) {
            return `共 ${total} 条`;
        }
        let { current, pageSize, total, pageSizeOptions, dataSource, tableLoding, notPagination, isExporting } = this.state
        return (
            <Row>
                <Row>
                    <Col span={4}>
                        <Button icon="download" onClick={this.exportTable}>
                            导出
                        </Button>
                    </Col>
                    <Spin spinning={isExporting} tip="正在导出..."></Spin>
                </Row>
                <Row className="mar-top-twenty">
                    <Table columns={columns} dataSource={dataSource} loading={tableLoding} pagination={notPagination} rowKey="id" />
                    <Pagination className="mar-top-twenty" pageSize={pageSize} current={current} total={total} showSizeChanger showQuickJumper
                                showTotal={showTotal} onChange={this.handlePageChange} onShowSizeChange={this.handleSizeChange}
                                pageSizeOptions={pageSizeOptions} />
                </Row>
            </Row>
        )
    }
}

export default Message;

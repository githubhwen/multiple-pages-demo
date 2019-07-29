import React, { Component } from 'react';
import moment from 'moment'
import {Row, Col, Button, message, DatePicker, TimePicker } from 'antd';
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'

import api from '../api/api.js';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm:ss'

class timeManagement extends Component {
    state = {
        selectTime: '',
        selectDate: '',
        timeStatus: true,
        defaultTime: null,
        defaultDate: null
    }
    componentDidMount() {
    }
    getData(time) {
        api.send({
            url: 'setting/setTime',
            type: 'post',
            data: {
                time: time
            }
        }).then(res => {
            if (res.data.code === '200') {
                message.success('设置成功');
            }
        }).catch(err => {
            message.error('服务器错误');
        })
    }

    // dom绑定的函数采用箭头函数自动绑定上下文this指针
    onChange = (time, timeString) => {
        this.setState({ defaultTime: moment(timeString, timeFormat) })
    }

    onDateChange = (time, timeString) => {
        this.setState({ defaultDate: moment(timeString, dateFormat) })
    }

    update = () => {
        this.setState({ timeStatus: false });
    }

    save = () => {
        this.setState({ timeStatus: true });
        let selectDate = this.state.defaultDate
        let selectTime = this.state.defaultTime
        let time = selectDate._i + ' ' + selectTime._i;
        this.getData(time);
    }

    render() {
        let { timeStatus, defaultDate, defaultTime } = this.state;
        return (
            <Row>
                <Row>
                    <Col span={4}>
                        <DatePicker renderExtraFooter={() => 'extra footer'} locale={locale} onChange={this.onDateChange}
                                    disabled={timeStatus} value={defaultDate} allowClear={false} />
                        </Col>
                    <Col span={4} offset={2}>
                        <TimePicker placeholder="请选择时间" onChange={this.onChange} className="whole-width"
                                    disabled={timeStatus} value={defaultTime} allowClear={false} />
                        </Col>
                </Row>
                <Row className="mar-top-twenty">
                    <Col span={10}>
                        <Button onClick={this.save} type="primary" className="module-button">
                            保存
                        </Button>
                        <Button onClick={this.update} className="module-button">
                            修改
                        </Button>
                    </Col>
                </Row>
                {/*<Row>*/}
                    {/*<AddTodo />*/}
                    {/*<VisibleTodoList />*/}
                    {/*<Footer />*/}
                {/*</Row>*/}
            </Row>
        )
    }
}

export default timeManagement;

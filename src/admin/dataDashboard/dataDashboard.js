import React, { Component } from 'react';
import {Row, Col, message, Divider, Select } from 'antd';
import api from '../api/api.js';
// 按需引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入折现图
import 'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

const Option = Select.Option;
let myChart = null;

class dataDashboard extends Component {

    state = {
        uvData: [],
        uvDataTemp: [],
        jumpRate: 0, // 首页跳失率
        uvPage: 0, // 活动页uv
        homeUv: 0, // homeuv
        uvList: [], // uv走势
        uvpageSelect: '',
        daySelect: ''
    }

    componentDidMount() {
        myChart = echarts.init(document.getElementById('chartMain'));
    }

    paint(rowData, colData) {
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: rowData
            },
            tooltip: {trigger: 'axis'},
            yAxis: {
                type: 'value'
            },
            series: [{
                data: colData,
                type: 'line'
            }]
        });
    }

    onUvChange = (LabeledValue, option) => {
        this.setState({ uvPage: option.props.label });
    }

    onUvChangeHistory = (LabeledValue, option) => {
        this.setState((pre, props) => {return {uvpageSelect: LabeledValue}}, () => { this.getUVList() })
    }

    onUvTimeChange = (LabeledValue, option) => {
        if (LabeledValue === '最近7天') {
            this.setState((pre, props) => {return {daySelect: 1}}, () => { this.getUVList() })
        } else if (LabeledValue === '最近14天') {
            this.setState((pre, props) => {return {daySelect: 2}}, () => { this.getUVList() })
        } else {
            this.setState((pre, props) => {return {daySelect: 3}}, () => { this.getUVList() })
        }
    }

    render() {
        let { uvData, jumpRate, uvPage, homeUv, uvDataTemp } = this.state;
        let pageSelect = uvData.map((item) => {
            return (
                <Option value={item['page_name']} key={item['page_name']} label={item['uv']}>{item.page_name}</Option>
            )
        })
        let pageSelectHistory = uvDataTemp.map((item) => {
            return (
                <Option value={item['page_name']} key={item['page_name']} label={item['uv']}>{item.page_name}</Option>
            )
        })
        let timeSelectHistory = ['最近7天', '最近14天', '最近30天'].map((item) => {
            return (
                <Option value={item} key={item}>{item}</Option>
            )
        })
        return (
            <Row>
                <Row>
                    <h1>昨日数据</h1>
                    <Divider />
                </Row>
                <Row className="mar-top-twenty">
                    <Col span={4} offset={2}>
                        <span>首页UV</span>
                    </Col>
                    <Col span={4} offset={2}>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="选择活动页"
                            onChange={this.onUvChange}
                        >
                            {pageSelect}
                        </Select>
                    </Col>
                    <Col span={4} offset={2}>
                        首页跳失率 (%)
                    </Col>
                </Row>
                <Row className="mar-top-twenty">
                    <Col span={4} offset={2}>
                        <h2>{homeUv}</h2>
                    </Col>
                    <Col span={4} offset={2}>
                        <h2>{uvPage}</h2>
                    </Col>
                    <Col span={4} offset={2}>
                        <h2>{jumpRate}</h2>
                    </Col>
                </Row>
                <Row className="mar-top-fourty">
                    <h1>历史数据</h1>
                    <Divider />
                </Row>
                <Row className="mar-top-twenty">
                    <Row>
                        <Col span={4} offset={2}>
                            <span>UV走势</span>
                        </Col>
                        <Col span={4} offset={2}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择活动页"
                                onChange={this.onUvChangeHistory}
                            >
                                {pageSelectHistory}
                            </Select>
                        </Col>
                        <Col span={4} offset={2}>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                placeholder="选择最近天数"
                                onChange={this.onUvTimeChange}
                            >
                                {timeSelectHistory}
                            </Select>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={20}>
                            <div id="chartMain" style={{ width: '100%', height: 400 }}></div>
                        </Col>
                    </Row>
                </Row>
            </Row>
        )
    }
}

export default dataDashboard;

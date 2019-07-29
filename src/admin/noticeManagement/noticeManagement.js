import React, { Component } from 'react';
import {Row, Col, Button, message, Input } from 'antd';
import api from '../api/api.js';

const { TextArea } = Input;

class noticeManagement extends Component {

    state = {
        titleStatus: true,
        contentStatus: true,
        contentValue: '',
        titleValue: '',
        id: '',
        isAdd: true
    }

    componentDidMount() {
    }

    setNotice() {
        let data = {}
        let { isAdd } = this.state
        if (isAdd) {
            data = {
                content: this.state.contentValue,
                title: this.state.titleValue
            }
        } else {
            data = {
                content: this.state.contentValue,
                title: this.state.titleValue,
                id: this.state.id
            }
        }
    }

    inputChange = (e) => {
        e.persist();
        const val = e.target.value
        this.setState({ titleValue: val })
    }

    areaChange = (e) => {
        e.persist();
        const val = e.target.value
        this.setState({ contentValue: val })
    }

    titleUpdate = () => {
        this.setState({ titleStatus: false })
    }

    titleSave = () => {
        let { titleValue }= this.state
        this.setNotice(titleValue, 'title')
        this.setState({ titleStatus: true })
    }

    contentUpdate = () => {
        this.setState({ contentStatus: false })
    }

    contentSave = () => {
        let { contentValue }= this.state
        this.setNotice(contentValue, 'content')
        this.setState({ contentStatus: true })
    }

    render() {
        let { titleStatus, contentStatus, titleValue, contentValue } = this.state;
        return (
            <Row>
                <Row>
                    <h1>标题</h1>
                </Row>
                <Row className="mar-top-twenty">
                    <Col span={4}>
                        <Input placeholder="请输入标题" disabled={titleStatus} onChange={this.inputChange} value={titleValue} maxLength={20} />
                    </Col>
                    <Col span={4} offset={2}>
                        <Button onClick={this.titleSave} type="primary" className="module-button">
                            保存
                        </Button>
                        <Button onClick={this.titleUpdate} className="module-button">
                            修改
                        </Button>
                    </Col>
                </Row>
                <Row className="mar-top-twenty">
                    <h1>内容</h1>
                </Row>
                <Row className="mar-top-twenty">
                    <Row>
                        <Col span={10}>
                            <TextArea rows={4} placeholder="请输入内容" disabled={contentStatus} onChange={this.areaChange} value={contentValue} maxLength={100} />
                        </Col>
                    </Row>
                    <Row className="mar-top-twenty">
                        <Col span={10}>
                            <Button onClick={this.contentSave} type="primary" className="module-button">
                                保存
                            </Button>
                            <Button onClick={this.contentUpdate} className="module-button">
                                修改
                            </Button>
                        </Col>
                    </Row>
                </Row>
            </Row>
        )
    }
}

export default noticeManagement;

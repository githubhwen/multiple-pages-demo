import React, { Component } from 'react'
import {Row, Col, Button, message, Input, Upload, Icon, Spin,} from 'antd';
import api from '../api/api.js';

class actManagement extends Component {

    constructor(props) {
        super(props)
        this.state = {
            moduleArr: [
                {
                    id: '',
                    img: '',
                    titleValue: '',
                    urlValue: '',
                    titleStatus: true,
                    urlStatus: true,
                    index: 1,
                    isAdd: true
                },
                {
                    id: '',
                    img: '',
                    titleValue: '',
                    urlValue: '',
                    titleStatus: true,
                    urlStatus: true,
                    index: 2,
                    isAdd: true
                },
                {
                    id: '',
                    img: '',
                    titleValue: '',
                    urlValue: '',
                    titleStatus: true,
                    urlStatus: true,
                    index: 3,
                    isAdd: true
                },
                {
                    id: '',
                    img: '',
                    titleValue: '',
                    urlValue: '',
                    titleStatus: true,
                    urlStatus: true,
                    index: 4,
                    isAdd: true
                },
                {
                    id: '',
                    img: '',
                    titleValue: '',
                    urlValue: '',
                    titleStatus: true,
                    urlStatus: true,
                    index: 5,
                    isAdd: true
                }
            ],
            previewVisible: false,
            previewImage: '',
            fileList: [[], [], [], [], []],
            client: null,
        }
    }

    titleChange = (index, e) => {
        e.persist();
        const val = e.target.value;
        this.setModuleArr(index, 'setTitleValue', val);
    }

    urlChange = (index, e) => {
        e.persist();
        const val = e.target.value;
        this.setModuleArr(index, 'setUrlValue', val);
    }

    update = (index) => {
        this.getStatusByIndex(index, false);
    }

    save = (index) => {
        this.getStatusByIndex(index, true, 'save');
    }

    getStatusByIndex(index, isDisabled, isSave) {
        let _index = index;
        switch (_index) {
            case 1 :
                this.setModuleArr(1, 'setStatus', isDisabled, isSave);
                break
            case 2 :
                this.setModuleArr(2, 'setStatus', isDisabled, isSave);
                break
            case 3 :
                this.setModuleArr(3, 'setStatus', isDisabled, isSave);
                break
            case 4 :
                this.setModuleArr(4, 'setStatus', isDisabled, isSave);
                break
            default :
                this.setModuleArr(5, 'setStatus', isDisabled, isSave);
        }
    }

    setModuleArr(index, status, val, isSave) {
        let data = JSON.parse(JSON.stringify(this.state.moduleArr))
        let _status = status
        if (_status === 'setTitleValue') {
            data[index - 1].titleValue = val
        } else if (_status === 'setUrlValue') {
            data[index - 1].urlValue = val
        } else {
            data[index - 1].urlStatus = val
            data[index - 1].titleStatus = val
        }
        this.setState((pre, props) => { return { moduleArr: data }}, () => {
          if (isSave === 'save') {
              let { fileList } = this.state;
              if (fileList[index - 1].length) {
                  this.saveActive(index, '', fileList[index - 1].url);
              } else {
                  this.saveActive(index, '', '');
              }
          }
        })
    }

    saveActive(index, content, imgUrl) {
        let { moduleArr } = this.state;
        let data = {
            type: 1,
            title: moduleArr[index - 1].titleValue,
            url: moduleArr[index - 1].urlValue,
            img: imgUrl
        }
        if (moduleArr[index - 1].id) {
            data.id = moduleArr[index - 1].id
        }
    }

    render() {
        const { fileList } = this.state;
        let { moduleArr } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传图片</div>
            </div>
        );
        let _modules = moduleArr.map((item, index) => {
            return (
                <Row className="mar-top-twenty" key={item.index}>
                    <Col span={2}>{item.index}</Col>
                    <Col span={4} offset={1}>
                        <Input placeholder="请输入名称" disabled={item.titleStatus} value={item.titleValue} onChange={this.titleChange.bind(this, item.index)} />
                    </Col>
                    <Col span={4} offset={1}>
                        <Row>
                            <Input placeholder="请输入链接" disabled={item.urlStatus} value={item.urlValue} onChange={this.urlChange.bind(this, item.index)} />
                        </Row>
                        <Row className="mar-top-twenty clearfix">
                            <Button onClick={this.save.bind(this, item.index)} type="primary" className="module-button">
                                保存
                            </Button>
                            <Button onClick={this.update.bind(this, item.index)} className="module-button">
                                修改
                            </Button>
                        </Row>
                    </Col>
                    <Col span={4} offset={2}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList[index]}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange.bind(this, index)}
                        >
                            {fileList[index].length >= 1 ? null : uploadButton}
                        </Upload>
                    </Col>
                </Row>
            )
        })
        return (
            <Row>
                <Row>
                    <Col span={2}>编号</Col>
                    <Col span={4} offset={1}>名称</Col>
                    <Col span={4} offset={1}>链接</Col>
                    <Col span={4} offset={2}>ICON</Col>
                </Row>
                {_modules}
            </Row>
        )
    }
}

export default actManagement;

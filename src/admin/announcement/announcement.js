import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';
import api from '../api/api'
import {Toast} from "antd-mobile";

class Announcement extends React.Component {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        client: null,
    };

    componentDidMount() {
    }

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传公告图片</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange.bind(this)}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default Announcement;

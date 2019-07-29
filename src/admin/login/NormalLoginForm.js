import React from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import './normal-login-form.css'
import PropTypes from 'prop-types'; // 使用typeScript废弃PropTypes

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginStatus: false
        }
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Received values of form: ', values);
            } else {
                // 任意用户名密码校验通过
                this.props.toMenu(true);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="输入任意用户名"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="输入任意密码"
                        />,
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

NormalLoginForm.propTypes = {
    toMenu: PropTypes.func
}

// 封装高阶组件
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;

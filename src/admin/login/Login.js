import React, { Component } from 'react';
import './login.css'
import { Layout } from 'antd';
import NormalLoginForm from './NormalLoginForm.js'
const { Header, Content, Footer } = Layout;

class Login extends Component {

    // 这一步可以省略
    constructor(props) {
        super(props)
    }

    toMenu = (value) => {
        if (value) {
            this.props.history.push("/menu")
        }
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <span className="title">后台管理</span>
                </Header>
                <Content className="content">
                    <div className="normalLoginForm">
                        <NormalLoginForm toMenu={this.toMenu.bind(this)}/>
                    </div>
                </Content>
                <Footer className="footer" style={{ textAlign: 'center' }}>haow ©2019 Created</Footer>
            </Layout>
    )
    }
}

export default Login;

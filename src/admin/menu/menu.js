import React, {Component} from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import DataDashboard from '../dataDashboard/dataDashboard.js';
import NoticeManagement from '../noticeManagement/noticeManagement.js';
import TimeManagement from '../timeManagement/timeManagement.js';
import ActManagement from '../actManagement/actManagement.js';
import ShopManagement from '../shopManagement/shopManagement.js';
import ModuleManagement from '../moduleManagement/moduleManagement.js';
import Message from '../message/message.js';
import Announcement from '../announcement/announcement.js';
import './menu.css';

const { Header, Content, Sider, Footer } = Layout;

class MenuA extends Component {

    constructor(props) {
        super(props)
        this.state = {
            menuList: [
                {
                    name: '数据看板',
                    type: 'switcher'
                },
                {
                    name: '通知管理',
                    type: 'sound'
                },
                {
                    name: '时间管理',
                    type: 'contacts'
                },
                {
                    name: '活动管理',
                    type: 'trophy'
                },
                {
                    name: '商品管理',
                    type: 'shopping'
                },
                {
                    name: '模块管理',
                    type: 'pie-chart'
                },
                {
                    name: '留言管理',
                    type: 'switcher'
                },
                {
                    name: '公告管理',
                    type: 'read'
                }
            ],
            title: '数据看板',
            currentModule: '',
        }
    }
    componentWillMount() {
        let userId = sessionStorage.getItem('userId');
        if (!userId) {
            this.props.history.push('/login');
        }
    }

    rd = (currentModule) => {
        let _currentModule = currentModule
        switch (_currentModule) {
            case "DataDashboard":
                return (
                    <DataDashboard />
                )
                break
            case "NoticeManagement":
                return (
                    <NoticeManagement />
                )
                break
            case "TimeManagement":
                return (
                    <TimeManagement />
                )
                break
            case "ActManagement":
                return (
                    <ActManagement />
                )
                break
            case "ShopManagement":
                return (
                    <ShopManagement />
                )
                break
            case "ModuleManagement":
                return (
                    <ModuleManagement />
                )
                break
            case "Message":
                return (
                    <Message />
                )
                break
            case "Announcement":
                return (
                    <Announcement />
                )
                break
            default:
                return (
                    <DataDashboard />
                )
        }
    }
    // 事件委托
    menuClick = (event) => {
        let key = event.key
        switch (key) {
            case "0":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[0].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'DataDashboard' }
                })
                break;
            case "1":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[1].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'NoticeManagement' }
                })
                break;
            case "2":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[2].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'TimeManagement' }
                })
                break;
            case "3":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[3].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'ActManagement' }
                })
                break;
            case "4":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[4].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'ShopManagement' }
                })
                break;
            case "5":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[5].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'ModuleManagement' }
                })
                break;
            case "6":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[6].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'Message' }
                }, () => {
                    this.setState((pre, props) => {
                        return { CM: this.rd(this.state.currentModule) }
                    })
                })
                this.setState()
                break;
            case "7":
                this.setState((pre, props) => {
                    return { title: this.state.menuList[7].name }
                })
                this.setState((pre, props) => {
                    return { currentModule: 'Announcement' }
                })
                break;
        }
    }
    logout = () => {
        sessionStorage.removeItem('access_token')
        sessionStorage.removeItem('openId')
        sessionStorage.removeItem('unionId')
        sessionStorage.removeItem('userId')
        this.props.history.push('/login');
    }

    render() {
        let {menuList, currentModule } = this.state
        let menuLists = menuList.map((item, index) => {
            return (
                <Menu.Item key={index}>
                    <Icon type={item.type} />
                    <span>{item.name}</span>
                </Menu.Item>
            )
        })
        let CM = null;
        let userId = sessionStorage.getItem('userId');
        if (userId) {
            CM = this.rd(currentModule);
        }
        return (
            <Layout className="layout">
                <Header className="header">
                    <span className="title">后台管理</span>
                    <span className="title logout" onClick={this.logout}><Icon type="logout" />退出</span>
                </Header>
                <Layout>
                    <Sider width={200} style={{ background: '#fff' }}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['0']}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.menuClick}
                        >
                            {menuLists}
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.title}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            style={{
                                background: '#fff',
                                padding: 24,
                                margin: 0,
                                minHeight: 480,
                            }}
                        >
                            {CM}
                        </Content>
                    </Layout>
                </Layout>
                <Footer className="footer" style={{ textAlign: 'center' }}>haow ©2019 Created</Footer>
            </Layout>
        );
    }
}

export default withRouter(MenuA);


import React, { Component } from 'react';
import api from './api/api.js';
import { Input } from "antd";
import { Toast, Modal, InputItem, Carousel } from 'antd-mobile';
import moment from "moment";
import { createForm } from 'rc-form';
import './home.css';
import * as clock from './img/bg.png';
import * as gearOne from './img/gearOne.png';
import * as memberGearOne from './img/memberGearOne.png';
import * as memberGearTwo from './img/memberGearTwo.png';
import * as memberGearThree from './img/memberGearThree.png';

const dateFormat = 'YYYY-MM-DD';
const timeFormat = 'HH:mm:ss';
const { TextArea } = Input;
const alert = Modal.alert;

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            timeObj: {
                time: 23,
                hour: 23,
                min: 59,
                sec: 59
            }, // 倒计时
            imgList: [{
                    title: '图片名称',
                    url: 'http://www.baidu.com/',
                    img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
                }, {
                    title: '图片名称',
                    url: 'http://www.baidu.com/',
                    img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
                }, {
                    title: '图片名称',
                    url: 'http://www.baidu.com/',
                    img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
                }], // 活动图
            productList: [{
                url: 'http://www.baidu.com/',
                img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
            }, {
                url: 'http://www.baidu.com/',
                img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
            }, {
                url: 'http://www.baidu.com/',
                img: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small'
            }], // 商场
            moduleList: [], // 模块
            title: '通知', // 标题
            content: '这里显示滚动的通知', // 通知
            announcement: 'https://preview.qiantucdn.com/58pic/34/99/22/54n58PIC8uMcPecbheBSH_PIC2018.jpg!w1024_small', // 公告
            messageValue: '', // 留言
            modal1: false, //对话框状态
            userId: '', // 用户id
            vCode: null, // 验证码    手机号的状态可以封装为一个对象
            phone: null, // 手机号
            vCodeStatus: false, // 验证码状态
            vCodeTitle: '验证码', // 验证码显示
            isLoading: true, // 是否加载中
            homeUV: '', // 首页uv
            imgHeight: 227
        }
    }

    componentDidMount() {
        this.getTime(this.state.timeObj)
    }

    // 从后台获取时间转化为天时分秒
    getData() {
        api.send({
            url: 'setting/getTime',
            type: 'post',
        }).then(res => {
            let arr = []
            if (res.data.code === '200') {
                let value = res.data.data.value
                if (value.trim() && value.split(' ')[0] && value.split(' ')[1]) {
                    let date = value.split(' ')[0];
                    let time = value.split(' ')[1];
                    let nowTime = moment().valueOf();
                    let countdown = moment(date + ' ' + time, dateFormat + ' ' + timeFormat).valueOf();
                    if (countdown >= nowTime) {
                        let timeValue = countdown - nowTime;
                        let day = Math.floor(timeValue / (1000 * 60 * 60 * 24)) || 0;
                        let hour = Math.floor((timeValue % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) || 0;
                        let min = Math.floor(((timeValue % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) / (1000 * 60)) || 0;
                        let sec = Math.floor((((timeValue % (1000 * 60 * 60 * 24)) % (1000 * 60 * 60)) % (1000 * 60)) / 1000) || 0;
                        if (hour < 10) {
                            hour = '0' + hour;
                        }
                        if (min < 10) {
                            min = '0' + min;
                        }
                        if (sec < 10) {
                            sec = '0' + sec;
                        }
                        let obj = {
                            time: day,
                            hour: hour,
                            min: min,
                            sec: sec
                        }
                        this.setState((pre, props) => { return { timeObj: obj } }, () => {
                            this.getTime(obj)
                        });
                    }
                }
            }
        }).catch(err => {
            Toast.fail('服务器错误', 2)
        })
    }

    getTime(obj) {
        setInterval(() => {
            if (parseInt(obj.sec) !== 0) {
                obj.sec = parseInt(obj.sec) - 1;
                if (obj.sec < 10) {
                    obj.sec = '0' + parseInt(obj.sec);
                }
            } else {
                obj.sec = 59
                if (parseInt(obj.min)!== 0) {
                    obj.min = parseInt(obj.min) - 1;
                    if (obj.min < 10) {
                        obj.min = '0' + parseInt(obj.min);
                    }
                } else {
                    obj.min = 59
                    if (parseInt(obj.hour) !== 0) {
                        obj.hour = parseInt(obj.hour) - 1;
                        if (obj.hour < 10) {
                            obj.hour = '0' + parseInt(obj.hour);
                        }
                    } else {
                        obj.hour = 23
                        if (obj.time !== 0) {
                            obj.time--;
                        } else {
                            obj.time = 0
                        }
                    }
                }
            }
            this.setState({ timeObj: obj});
        }, 1000);
    }

    vCodeClick = (e) => {
        e.preventDefault();
        if (this.state.phone && this.state.phone.replace(/\s*/g,"").length === 11) {
            if (!this.state.vCodeStatus) {
                this.sendVCode();
                this.setState((pre, props) => { return { vCodeStatus: true }}, () => {
                    this.setVCode(60);
                })
            }
        } else {
            Toast.fail('请输入正确的手机号', 2)
        }
    }

    setVCode(time) {
        this.interval = setInterval(() => {
            if (time !== 0) {
                time--;
                this.setState({ vCodeTitle: '已发送' + '(' + time + ')' });
            } else {
                this.setState({ vCodeTitle: '验证码' });
                this.setState({ vCodeStatus: false });
                this.clearSetVCode();
            }
        }, 1000)
    }

    clearSetVCode() {
        clearInterval(this.interval);
    }

    phoneChange = (str) => {
        const val = str;
        this.setState({ phone: val });
    }

    vCodeChange = (str) => {
        const val = str;
        this.setState({ vCode: val });
    }

    checkPV() {
        if (!this.state.phone || this.state.phone.replace(/\s*/g,"").length !== 11) {
            Toast.fail('请输入正确的手机号', 2)
        } else if (!this.state.vCode || this.state.vCode.length !== 6) {
            Toast.fail('请输入正确的验证码', 2)
        } else {
            this.checkVCode();
        }
    }

    messageChange = (e) => {
        e.persist();
        const val = e.target.value;
        this.setState({ messageValue: val });
    }

    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        if (!localStorage.getItem('telphone')) {
            this.setState({
                [key]: true,
            });
        } else {
            if (!this.state.messageValue) {
                Toast.fail('留言内容不能为空', 2);
            } else {
                this.addMessage();
            }
        }
    }

    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }

    onWrapTouchStart = (e) => {
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    render() {
        const { getFieldProps } = this.props.form;
        const isLoading = this.state.isLoading;
        let { timeObj, imgList, title, content, productList, moduleList, messageValue, vCodeTitle,
            phone, vCode, announcement, vCodeStatus } = this.state;
        let imgLists = imgList.map((list, index) => {
            return (<li className="home-member-carousel-ul-li" key={index}>
                <img src={list.img} width="98%" height="227px" alt="图片" /></li>)
        })
        let _moduleList = moduleList.map((list, index) => {
            return (<img src={list.img} width="15.8%" height="60px" alt="图片" key={index}/>)
        })
        let _moduleListTitle = moduleList.map((list, index) => {
            return (<h2 key={index}>{list.title}</h2>)
        })
        return (

              <div className="home-main">
                    <header className="home-header">
                        <h1>{title}</h1>
                        <div className="marquee">
                            <div className="content">
                                <span>{content}</span>
                            </div>
                        </div>
                    </header>
                    <div className="home-clock">
                        <img src={clock} width="100%" height="385px" />
                    </div>
                    <div className="home-time">
                        <div className="home-time-title">
                            <div></div>
                        </div>
                    </div>
                    <div className="home-time-main">
                        <div className="home-time-gear"><img src={gearOne} width="100%" height="90px" className="gear"/></div>
                        <div className="home-time-main-img">
                            <p>{timeObj.time}<span>天</span></p>
                            <p><span>{timeObj.hour}</span><span>:</span><span>{timeObj.min}</span><span>:</span><span>{timeObj.sec}</span></p>
                            <p><span>Hour</span><span>:</span><span>Min</span><span>:</span><span>Sec</span></p>
                        </div>
                    </div>
                    <div className="home-member">
                        <div className="home-member-img">
                            <img src={memberGearOne} width="20%" height="70px" alt="图片" />
                            <img src={memberGearTwo} width="27%" height="104px" alt="图片" />
                            <img src={memberGearThree} width="20%" height="70px" alt="图片" />
                        </div>
                        <div className="home-member-title">
                            <div></div>
                        </div>
                        <div className="home-member-carousel">
                            <Carousel
                                autoplay={true}
                                infinite={true}
                                style={{height: 227}}
                            >
                                {this.state.imgList.map((val, index) => (
                                    <img
                                        src={val.img}
                                        alt={val.title}
                                        key={index}
                                        style={{ width: '100%', verticalAlign: 'top', height: '227px' }}
                                        onLoad={() => {
                                            window.dispatchEvent(new Event('resize'));
                                            this.setState({ imgHeight: 227 });
                                        }}
                                    />
                                ))}
                            </Carousel>
                        </div>
                        <div className="home-member-banner">
                            <div className="home-member-banner-left">
                                <img src={productList[0].img} width="98.5%" height="152px" alt="图片"/>
                            </div>
                            <div className="home-member-banner-right">
                                <img src={productList[1].img} width="98.5%" height="152px" alt="图片" />
                            </div>
                        </div>
                        <div className="home-member-game">
                            {_moduleList}
                        </div>
                        <div className="home-member-game-title">
                            {_moduleListTitle}
                        </div>
                        <div className="home-member-message">
                            <TextArea className="home-member-message-area" rows={2} focus placeholder="请输入留言"  value={messageValue} onChange={this.messageChange} />
                            <h2 onClick={this.showModal('modal1')}>留言</h2>
                            <Modal
                                className="modal-style"
                                visible={this.state.modal1}
                                transparent
                                maskClosable={false}
                                closable={true}
                                onClose={this.onClose('modal1')}
                                title="验证手机号"
                                footer={[{ text: '确定', onPress: () => { this.checkPV(); } }]}
                                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                            >
                                <div style={{ height: 100, overflow: 'scroll' }}>
                                    <InputItem
                                        {...getFieldProps('phone')}
                                        type="phone"
                                        placeholder="请输入手机号"
                                        value={phone}
                                        onChange={this.phoneChange}
                                    >手机号码</InputItem>
                                    <InputItem
                                        {...getFieldProps('number')}
                                        type="number"
                                        placeholder="请输入验证码"
                                        maxLength={6}
                                        value={vCode}
                                        onChange={this.vCodeChange}
                                    ><span className={["home-member-message-span", vCodeStatus===true?"grey-style":null].join(' ')}
                                           onClick={this.vCodeClick}>{vCodeTitle}</span></InputItem>
                                    <br />
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <footer className="footer">
                        <img src={announcement} width="100%" height="200px"></img>
                    </footer>
                </div>
        )
    }
}

export default createForm()(Home);

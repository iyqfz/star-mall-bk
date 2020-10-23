import React    from 'react';

import MMUtile  from 'util/mm.jsx';
import User     from 'service/user.jsx';
import Bg from 'images/bg.jpg';

const _mm    = new MMUtile();
const _user  = new User();

import './index.scss';

const Login = React.createClass({
    getInitialState() {
        return {
            username : '',
            password : '',
            redirect : _mm.getHashParam('redirect')
        };
    },
    componentDidMount: function(){
        let height = $(window).height();
        $('.bg').css('height', height).css('background', 'url('+ Bg +')');
    },
    // 点击登录
    onLogin(e){
        e.preventDefault();
        let loginInfo   = {
                username: this.state.username,
                password: this.state.password
            },
            checkLogin  = _user.checkLoginInfo(loginInfo);
        if(checkLogin.state){
            // 登录成功后进行跳转
            _user.login(loginInfo).then(res => {
                _mm.setStorage('userInfo', res);
                window.location.href = this.state.redirect || '#/home';
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }else{
            _mm.errorTips(checkLogin.msg);
        }
    },
    // 输入框内容变化时，更新state中的字段
    onInputChange(e){
        let ele         = e.target,
            inputValue  = e.target.value,
            inputName   = e.target.name;
        this.setState({
            [inputName] : inputValue
        });
    },
    render() {
        return (
            <div className="bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-offset-3 col-md-6">
                            <form className="form-horizontal fh" role="form" onSubmit={this.onLogin}>
                                <span className="heading">管理员登录</span>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="username" placeholder="用户名：admina"
                                               name="username"
                                               type="text"
                                               autoComplete="off"
                                               autoFocus
                                               onChange={this.onInputChange}/>
                                    <i className="fa fa-user"></i>
                                </div>
                                <div className="form-group help">
                                    <input type="password" className="form-control" id="password" placeholder="密　码：111111"
                                               name="password"
                                               type="password"
                                               autoComplete="off"
                                               onChange={this.onInputChange}/>
                                    <i className="fa fa-lock"></i>
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-default">登录</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default Login;

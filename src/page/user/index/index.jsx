import React        from 'react';
import { Link }     from 'react-router';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import User         from 'service/user.jsx';

const _mm = new MMUtile();
const _user = new User();

import './index.scss';

const UserList = React.createClass({
    getInitialState() {
        return {
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'userId', //
            searchKeyword   : '',
            pageNum         : 1,
            pages           : 0,
            userId          : '',
            username        : '',
            password        : '',
            confirmPassword : '',
            phone           : '',
            email           :'',
            userPhone       :'',
            question        : '',
            answer          :'',
            rolephone       :''

        };
    },
    componentDidMount(){
        this.loadUserList();
    },
    // 加载用户列表
    loadUserList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;

        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按用户id搜索
        if(listType == 'search' && searchType == "userId"){
            listParam.userId = this.state.searchKeyword;
        }
        // 按用户名搜索
        if(listType == 'search' && searchType == "username"){
            listParam.username = this.state.searchKeyword;
        }
        // 按联系电话搜索
        if(listType == 'search' && searchType == "phone"){
            listParam.phone = this.state.searchKeyword;
        }
        // 按角色搜索
        if(listType == 'search' && searchType == "roleName"){
            listParam.roleName = this.state.searchKeyword;
        }
        // 查询
        _user.getUserList(listParam).then(res => {
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // 搜索类型变化
    onSearchTypeChange(e){
        let searchType = e.target.value;
        this.setState({
            searchType : searchType
        });
    },
    // 关键词变化
    onKeywordChange(e){
        let keyword = e.target.value;
        this.setState({
            searchKeyword : keyword
        });
    },
    // 搜索
    onSearch(){
        this.setState({
            listType    : 'search'
        }, () => {
            this.loadUserList(1);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadUserList(pageNum);
    },
    loadUser(e){
        let userId = e.target.dataset.userid;
        _user.getUser(userId).then(res => {
            this.state.userId = res.id;
            this.state.email = res.email;
            this.state.userPhone = res.phone;
            this.state.question = res.question;
            this.state.answer = res.answer;
            $('.id').val(res.id);
            $('.u-name').val(res.username);
            $('.email').val(res.email);
            $('.phone').val(res.phone);
            $('.question').val(res.question);
            $('.answer').val(res.answer);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    loadRole(e){
        let userId = e.target.dataset.userid;
        _user.getUser(userId).then(res => {
            this.state.userId  = res.id; 
            this.state.rolephone   = res.phone; 
            $('.id').val(res.id); 
            $('.rolephone').val(res.phone); 
            $('.rolename').val(res.username); 
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // 字段更新
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        // 更改state
        this.setState({
            [name] : e.target.value
        });
    },
    submitAdd(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let user = {
                username            : this.state.username,
                password            : this.state.password,
                confirmPassword    : this.state.confirmPassword,
                phone               : this.state.phone
            },
            checkUser = this.checkUser(user);
        // 验证通过后，提交信息
        if(checkUser.status){
            // 保存
            _user.saveUser(user).then(res => {
                alert("添加成功！");
                window.location.reload();
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }else{
            alert(checkUser.msg);
        }
        return false;
    },
    submitEditUser(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let user = {
                id               : this.state.userId,
                email            : this.state.email,
                phone            : this.state.userPhone,
                question         : this.state.question,
                answer           : this.state.answer
            },
            checkUser = this.checkUserEdit(user);
        // 验证通过后，提交信息
       if(checkUser.status){
            // 保存
            _user.editUser(user).then(res => {
                alert("修改成功！");
                window.location.reload();
            }, err => {
                console.log(err);
                alert(err || '哪里不对了~');
            });
        }else{
            alert(checkUser.msg);
        }
        return false;
    },
    submitRoleEdit(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let user = {
                id               : this.state.userId, 
                phone            : this.state.rolephone
            },
            checkUser = this.checkRoleEdit(user);
        // 验证通过后，提交信息
       if(checkUser.status){
            // 保存
            _user.editUser(user).then(res => {
                alert("修改成功！");
                window.location.reload();
            }, err => {
                console.log(err);
                alert(err || '哪里不对了~');
            });
        }else{
            alert(checkUser.msg);
        }
        return false;
    },
    // 验证字段
    checkRoleEdit(user){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!(/^1\d{10}$/).test(user.phone)){
            result = {
                status  : false,
                msg     : '请输入正确的11位联系电话！'
            }
        }
        if(!user.phone){
            result = {
                status  : false,
                msg     : '请输入联系电话！'
            }
        }
        return result;
    },
    // 验证字段
    checkUserEdit(user){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!(/^1\d{10}$/).test(user.phone)){
            result = {
                status  : false,
                msg     : '请输入正确的11位联系电话！'
            }
        }
        if(!user.phone){
            result = {
                status  : false,
                msg     : '请输入联系电话！'
            }
        }
        if(!(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/).test(user.email)){
            result = {
                status  : false,
                msg     : '邮箱格式不正确！'
            }
        }
        if(!user.email){
            result = {
                status  : false,
                msg     : '请输入邮箱！'
            }
        }
        return result;
    },
    // 验证字段
    checkUser(user){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!(/^1\d{10}$/).test(user.phone)){
            result = {
                status  : false,
                msg     : '请输入正确的11位联系电话！'
            }
        }
        if(!user.phone){
            result = {
                status  : false,
                msg     : '请输入联系电话！'
            }
        }
        if(user.password != user.confirmPassword){
            result = {
                status  : false,
                msg     : '两次密码不一致！'
            }
        }
        if(!user.confirmPassword){
            result = {
                status  : false,
                msg     : '请确认密码！'
            }
        }
        if(user.password.length < 6){
            result = {
                status  : false,
                msg     : '密码长度不能少于6位！'
            }
        }
        if(!user.password){
            result = {
                status  : false,
                msg     : '请输入密码！'
            }
        }
        if(user.username.length < 6){
            result = {
                status  : false,
                msg     : '用户名长度不能少于6位！'
            }
        }
        if(!user.username){
            result = {
                status  : false,
                msg     : '请输入用户名！'
            }
        }
        return result;
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="用户管理">
                    <div className="page-header-right">
                        <button className="btn btn-primary" data-toggle="modal" data-target="#myModal"><i className="fa fa-plus fa-fw"></i>
                            添加管理员
                        </button>
                        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 className="modal-title" id="myModalLabel">添加管理员</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form role="form">
                                            <div className="form-group">
                                                <label>用户名</label>
                                                <input id="username" name="username" className="form-control" placeholder="Enter username"  value={this.state.username} onChange={this.onValueChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label>密码</label>
                                                <input id="password" name="password" type="password" className="form-control" placeholder="Enter password" value={this.state.password} onChange={this.onValueChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label>确认密码</label>
                                                <input id="confirmPassword" name="confirmPassword" type="password" className="form-control" placeholder="Confirm password" value={this.state.confirmPassword} onChange={this.onValueChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label>联系电话</label>
                                                <input id="phone" name="phone" type="number" className="form-control" placeholder="Enter phone" value={this.state.phone} onChange={this.onValueChange}/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" className="btn btn-primary" onClick={this.submitAdd}>确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="roleEdit" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 className="modal-title" id="myModalLabel">更新管理员信息</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form role="form">
                                            <div className="form-group">
                                                <label>用户名</label>
                                                <input id="rolename" name="rolename" className="form-control rolename"  readOnly/>
                                            </div>
                                            <div className="form-group">
                                                <label>联系电话</label>
                                                <input id="rolephone" name="rolephone" type="number" className="form-control rolephone" placeholder="Enter phone" value={this.state.rolephone} onChange={this.onValueChange}/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" className="btn btn-primary" onClick={this.submitRoleEdit}>确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="userEdit" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                        <h4 className="modal-title" id="myModalLabel">更新用户信息</h4>
                                    </div>
                                    <div className="modal-body">
                                        <form role="form">
                                            <div className="form-group">
                                                <label>用户名</label>
                                                <input id="u-name" name="u-name" className="form-control u-name" readOnly />
                                                <input type="hidden" className="id"/>
                                            </div>
                                            <div className="form-group">
                                                <label>邮箱</label>
                                                <input id="email" name="email" className="form-control email" placeholder="Enter email" value={this.state.email} onChange={this.onValueChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label>联系电话</label>
                                                <input id="userPhone" name="userPhone" type="number" className="form-control phone" placeholder="Enter phone" value={this.state.userPhone} onChange={this.onValueChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label>找回密码提示问题</label>
                                                <input id="question" name="question" type="text" className="form-control question" placeholder="Confirm question" value={this.state.question} onChange={this.onValueChange} />
                                            </div>
                                            <div className="form-group">
                                                <label>找回密码提示问题</label>
                                                <input id="answer" name="answer" type="text" className="form-control answer" placeholder="Enter answer" value={this.state.answer} onChange={this.onValueChange} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                                        <button type="button" className="btn btn-primary" onClick={this.submitEditUser}>确认</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="userId">按id查询</option>
                                    <option value="username">按用户名查询</option>
                                    <option value="phone">按联系电话查询</option>
                                    <option value="roleName">按角色查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="关键词" onChange={this.onKeywordChange}/>
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>用户名</th>
                                <th>当前可用消费积分</th>
                                <th>当前星级</th>
                                <th>星级经验值</th>
                                <th>邮箱</th>
                                <th>联系电话</th>
                                <th>找回密码提示问题</th>
                                <th>找回密码提示问题答案</th>
                                <th>角色</th>
                                <th>注册时间</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((user, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.totalPoint}</td>
                                            <td>{user.level}</td>
                                            <td>{user.experience}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.question}</td>
                                            <td>{user.answer}</td>
                                            <td>{user.roleName}</td>
                                            <td>{user.createTime}</td>
                                            <td>
                                                {
                                                    user.roleName == "管理员" ? <a className="opear editLink" data-toggle="modal" data-target="#roleEdit" data-userid={user.id} onClick={this.loadRole}>编辑</a> :
                                                        <div><Link className="opear" to={'/user.shipping/detail/' + user.id + '/' + user.username}>查看他的收货地址</Link>
                                                        <a className="opear editLink" data-toggle="modal" data-target="#userEdit" data-userid={user.id} onClick={this.loadUser}>编辑</a></div>
                                                }
                                            </td>
                                        </tr>
                                    );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="12" className="text-center">暂无结果~</td>
                                        </tr>
                                    ) 
                            }     
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange}
                                                           current={this.state.pageNum}
                                                           total={this.state.total}
                                                           showLessItems/>: null
                    }
                </div>
            </div>
        );
}
});

export default UserList;
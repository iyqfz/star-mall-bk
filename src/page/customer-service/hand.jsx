import React                    from 'react';
import { Link }                 from 'react-router';

import PageTitle                from 'component/page-title/index.jsx'; 

import MMUtile                  from 'util/mm.jsx';  
import CustomerService          from 'service/customer-service.jsx';

const _mm                   = new MMUtile();  
const _customer_service     = new CustomerService();

const CustomerServiceHand = React.createClass({
    getInitialState() {
        return {   
            csId          : this.props.params.csId,
            username      : this.props.params.username,
            state         : '',
            reply         : ''
        };
    },
    componentDidMount(){  
        this.loadCustomerService();
    },
    loadCustomerService(){
        _customer_service.getCustomerService(this.state.csId).then(res => {
            this.setState(res); 
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    onStateChange(e){
        let newValue    = e.target.value || '';
        this.setState({
            state : newValue
        });
    },
    // 普通字段更新
    onValueChange(e){
        let name    = e.target.name,
            value   = e.target.value;
        // 更改state
        this.setState({
            [name] : e.target.value
        });
    },
    // 验证要提交的信息是否符合规范
    checkCustomerService(customerService){
        let result = {
            status  : true,
            msg     : '验证通过'
        };
        if(!customerService.reply){
            result = {
                status  : false,
                msg     : '请输入回复内容'
            }
        }
        if(!customerService.state){
            result = {
                status  : false,
                msg     : '请选择处理状态'
            }
        }
        return result;
    },
    // 提交表单
    onSubmit(e){
        // 阻止提交
        e.preventDefault();
        // 需要提交的字段
        let customerService = {
                id                  : this.state.csId,
                state               : this.state.state,
                reply               : this.state.reply,
                userId              : this.state.userId,
                orderNo             : this.state.orderNo
            },
            checkCustomerService = this.checkCustomerService(customerService); 
        // 验证通过后，提交信息
        if(checkCustomerService.status){
            // 处理
            _customer_service.updateCustomerService(customerService).then(res => {
                alert(res);
                window.location.href = '#/customer-service/index';
            }, err => {
                alert(err.msg || '哪里不对了~');
            });
        }else{
            alert(checkCustomerService.msg);
        }
        return false;
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="售后管理 -- 处理售后"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">用户名</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.username}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">订单号</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.orderNo}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">标题</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.title}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">详细描述</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.mainContent}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">状态</label>
                                <div className="col-md-5">
                                    <select className="form-control cate-select col-md-5" value={this.state.state} onChange={this.onStateChange}>
                                        <option value="">请选择状态</option> 
                                        <option value="处理中">处理中</option>
                                        <option value="退货退款">退货退款</option>
                                        <option value="结束">结束</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">回复</label>
                                <div className="col-md-8">
                                    <textarea className="form-control" rows="100" name="reply" value={this.state.reply} onChange={this.onValueChange}>{this.state.reply}</textarea>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-md-offset-2 col-md-10">
                                    <button type="btn" className="btn btn-xl btn-primary" onClick={this.onSubmit}>提交</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

export default CustomerServiceHand;
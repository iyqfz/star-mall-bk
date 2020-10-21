import React                    from 'react';
import { Link }                 from 'react-router';

import PageTitle                from 'component/page-title/index.jsx';
import Pagination               from 'component/pagination/index.jsx';

import MMUtile                  from 'util/mm.jsx';  
import CustomerService          from 'service/customer-service.jsx';

const _mm                   = new MMUtile();  
const _customer_service     = new CustomerService();

const CustomerServiceList = React.createClass({
    getInitialState() {
        return { 
            list            : [],
            listType        : 'list', // list / search
            searchType      : 'id', //
            searchKeyword   : '',
            pageNum         : 1,
            pages           : 0
        };
    },
    componentDidMount(){ 
        this.loadCustomerServiceList();
    }, 
    loadCustomerServiceList(pageNum){
        let listParam       = {},
            listType        = this.state.listType,
            searchType      = this.state.searchType;

        listParam.listType  = listType;
        listParam.pageNum   = pageNum || this.state.pageNum;
        // 按服务id搜索
        if(listType == 'search' && searchType == "id"){
            listParam.id = this.state.searchKeyword;
        }
        // 按用户名搜索
        if(listType == 'search' && searchType == "username"){
            listParam.username = this.state.searchKeyword;
        }
        // 按订单编号搜索
        if(listType == 'search' && searchType == "orderNo"){
            listParam.orderNo = this.state.searchKeyword;
        }
        // 查询
        _customer_service.getCustomerServiceList(listParam).then(res => {
            this.setState(res);
        }, err => {
            _mm.errorTips(err.msg || err.statusText);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadCustomerServiceList(pageNum);
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
            this.loadCustomerServiceList(1);
        });
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="售后管理"></PageTitle>
                <div className="row">
                    <div className="search-wrap col-md-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="id">按id查询</option>
                                    <option value="username">按用户名查询</option>
                                    <option value="orderNo">按订单号查询</option> 
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
                                <th width="5%">id</th>
                                <th width="5%">用户</th>
                                <th width="5%">订单号</th>
                                <th width="10%">标题</th>
                                <th width="25%">详细描述</th>
                                <th width="5%">状态</th>
                                <th width="25%">回复</th>
                                <th width="10%">申请时间</th> 
                                <th width="5%">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.list.length ? this.state.list.map((cService, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{cService.id}</td>
                                            <td>{cService.username}</td>
                                            <td>{cService.orderNo}</td>
                                            <td>{cService.title}</td>
                                            <td>{cService.mainContent}</td>
                                            <td>{cService.status}</td>
                                            <td>{cService.reply}</td>
                                            <td>{cService.createTime}</td>
                                            <td> 
                                                <Link className="opear" to={ '/customer-service/hand/' + cService.id + '/' + cService.username}>处理</Link>
                                            </td> 
                                        </tr>
                                    );
                                    }) :
                                    (
                                        <tr>
                                            <td colSpan="9" className="text-center">暂无结果~</td>
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

export default CustomerServiceList;
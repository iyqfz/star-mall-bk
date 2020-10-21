import React        from 'react';

import PageTitle    from 'component/page-title/index.jsx';
import Pagination   from 'component/pagination/index.jsx';

import MMUtile      from 'util/mm.jsx';
import User         from 'service/user.jsx';

const _mm           = new MMUtile();
const _user         = new User();

const ShippingList = React.createClass({
    getInitialState() {
        return {
            list           : [],
            userId         : this.props.params.userId,
            username       : this.props.params.username,
            pageNum        : 1
        };
    },
    componentDidMount: function(){
        // 初始化产品
        this.loadUserShipping();
    },
    // 加载shipping信息
    loadUserShipping(){
        _user.getUserShipping(this.state).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    },
    // 页数变化
    onPageNumChange(pageNum){
        this.loadUserShipping(pageNum);
    },
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="收货地址"/>
                <div className="row">
                    <div className="form-wrap col-lg-12">
                        <div className="form-horizontal">
                            <div className="form-group">
                                <label htmlFor="name" className="col-md-2 control-label">用户ID：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.userId}</p>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subtitle" className="col-md-2 control-label">用户名：</label>
                                <div className="col-md-5">
                                    <p type="text" className="form-control-static">{this.state.username}</p>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <table className="table table-striped table-bordered table-hover">
                                    <thead>
                                    <tr>
                                        <th width="10%">收货人</th>
                                        <th width="10%">省份</th>
                                        <th width="10%">城市</th>
                                        <th width="40%">详细地址</th>
                                        <th width="20%">联系电话</th>
                                        <th width="10%">邮编</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.list.length ? this.state.list.map((shipping, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{shipping.receiverName}</td>
                                                    <td>{shipping.receiverProvince}</td>
                                                    <td>{shipping.receiverCity}</td>
                                                    <td>{shipping.receiverAddress}</td>
                                                    <td>{shipping.receiverPhone}</td>
                                                    <td>{shipping.receiverZip}</td>
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
                </div>
            </div>
        );
    }
});

export default ShippingList;
import React        from 'react';
import './index.scss';

import { Link, IndexLink } from 'react-router';

const navSize = React.createClass({
    render() {
        return (
            <div className="navbar-default sidebar" role="navigation">
                <div className="sidebar-nav navbar-collapse">
                    <ul className="nav" id="side-menu">
                        <li className="sidebar-search">
                            <div className="input-group custom-search-form">
                                <input type="text" className="form-control" placeholder="Search..." readOnly="readOnly" />
                                <span className="input-group-btn">
									<button className="btn btn-default" type="button">
										<i className="fa fa-search"></i>
									</button>
								</span>
                            </div>
                        </li>
                        <li>
                            <IndexLink to="/home">
                                <i className="fa fa-dashboard fa-fw"></i>
                                <span>Home</span>
                            </IndexLink>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-user fa-fw"></i>
                                <span>用户</span>
                            </Link>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/user">用户管理</Link>
                                </li>
                            </ul>
                        </li> 
                        <li>
                            <Link>
                                <i className="fa fa-building fa-fw"></i>
                                <span>商品</span>
                            </Link>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/product">商品管理</Link>
                                </li>
                                <li>
                                    <Link to="/product.category">品类管理</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-wrench fa-fw"></i>
                                <span>订单</span>
                            </Link>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/order">订单管理</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link>
                                <i className="fa fa-server fa-fw"></i>
                                <span>售后</span>
                            </Link>
                            <ul className="nav nav-second-level">
                                <li>
                                    <Link to="/customer-service">售后管理</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
});

export default navSize;
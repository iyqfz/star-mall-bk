import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRedirect, Link, hashHistory } from 'react-router';
// bootstrap
import 'node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'node_modules/bootstrap/dist/js/bootstrap.min.js';
// bootstrap sb-admin-2 主题
import 'node_modules/sb-admin-2/dist/css/sb-admin-2.min.css';
import 'node_modules/sb-admin-2/dist/js/sb-admin-2.min.js';
// font-awesome 字体
import 'node_modules/font-awesome/css/font-awesome.min.css'; 

// 页面
import Layout               from 'page/layout/index.jsx';
import Home                 from 'page/home/index.jsx';
import ProductList          from 'page/product/index/index.jsx';
import ProductSave          from 'page/product/index/save.jsx';
import ProductDetail        from 'page/product/index/detail.jsx';
import ProductCategory      from 'page/product/category/index.jsx';
import ProductCategoryAdd   from 'page/product/category/add.jsx';
import OrderList            from 'page/order/index.jsx';
import OrderDetail          from 'page/order/detail.jsx';
import UserList             from 'page/user/index/index.jsx';
import ShippingList         from 'page/user/shipping/index.jsx';
import CustomerServiceList  from 'page/customer-service/index.jsx';
import CustomerServiceHand  from 'page/customer-service/hand.jsx';
import Login                from 'page/login/index.jsx';

// render router
render(
    <Router history={hashHistory}>
        <Route path="/">
            {/* home */}
            <IndexRedirect to="home" />
            <Route path="home" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={Home}/>
            </Route>
            {/* user */}
            <Route path="user" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={UserList}/>
            </Route>
            {/* shipping */}
            <Route path="user.shipping" component={Layout}>
                <IndexRedirect to="detail" />
                <Route path="detail/:userId/:username" component={ShippingList}/>
            </Route>
            {/* product */}
            <Route path="product" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={ProductList}/>
                <Route path="save(/:pId)" component={ProductSave}/>
                <Route path="detail/:pId" component={ProductDetail}/>
            </Route>
            <Route path="product.category" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index(/:categoryId)" component={ProductCategory}/>
                <Route path="add" component={ProductCategoryAdd}/>
            </Route>
            {/* order */}
            <Route path="order" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={OrderList}/>
                <Route path="detail/:orderNumber" component={OrderDetail}/>
            </Route>
            {/* customer-service */}
            <Route path="customer-service" component={Layout}>
                <IndexRedirect to="index" />
                <Route path="index" component={CustomerServiceList}/> 
                <Route path="hand/:csId/:username" component={CustomerServiceHand}/> 
            </Route> 
            {/* without layout */}
            <Route path="login" component={Login}/>
        </Route>
    </Router>,
    document.getElementById('app')
);
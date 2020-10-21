import React        from 'react';
import './index.scss';
import TopNav               from 'component/nav-top/index.jsx';
import SideNav              from 'component/nav-side/index.jsx';

const Layout = React.createClass({
    render() {
        return (
            <div className="wrapper">
                <nav className="navbar navbar-default navbar-static-top" role="navigation">
                    <TopNav />
                    <SideNav />
                </nav>
                {this.props.children}
            </div>
        );
    }
});

export default Layout;
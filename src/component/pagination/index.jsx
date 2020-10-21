import React        from 'react';

import RcPagination from 'rc-pagination';

import './index.scss';

// 通用分页组件
const Pagination = React.createClass({
    getInitialState() {
        return {

        };
    },
    render() {
        return (
            <RcPagination {...this.props}/>
        )
    }
});

export default Pagination;
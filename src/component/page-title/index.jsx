import React from 'react';

const PageTitle = React.createClass({
    componentDidMount(){
        document.title = this.props.pageTitle || 'BTUC Admin'
    },
    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="page-header">{this.props.pageTitle}</h1>
                    {this.props.children}
                </div>
            </div>
        );
    }
});

export default PageTitle;
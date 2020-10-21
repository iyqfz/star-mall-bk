import MMUtile from 'util/mm.jsx';

const mm = new MMUtile();

export default class CustomerService{ 
    // 获取服务信息
    getCustomerServiceList(listParam){ 
        if(listParam.listType == 'list'){
            return mm.request({
                    url     : mm.getServerUrl('/manage/customer_service/list'),
                    data    : {
                        pageNum : listParam.pageNum || 1
                    }
                });
            }
            else if(listParam.listType == 'search'){
                return mm.request({
                    url     : mm.getServerUrl('/manage/customer_service/search'),
                    data    : listParam
            });
        }
    }
    getCustomerService(csId){
        return mm.request({
                    url     : mm.getServerUrl('/manage/customer_service/get'),
                    data    : {
                        csId : csId
                    }
                });
    }
    updateCustomerService(customerService){
        return mm.request({
                    url     : mm.getServerUrl('/manage/customer_service/reply_service'),
                    data    : {
                        id          : customerService.id,
                        status      : customerService.state,
                        reply       : customerService.reply,
                        userId     : customerService.userId,
                        orderNo    : customerService.orderNo 
                    }
                });
    }
}
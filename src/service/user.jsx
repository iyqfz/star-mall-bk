import MMUtile from 'util/mm.jsx';

const mm = new MMUtile();

export default class User{
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo){
        if(!userInfo.username){
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if(!userInfo.password){
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    }
    // 登录
    login(userInfo){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/login.do'),
            method  : 'POST',
            data    : {
                username : userInfo.username || '',
                password : userInfo.password || ''
            }
        });
    }
    // 退出登录
    logout(){
        return mm.request({
            url     : mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
        });
    }
    // 获取用户信息
    getUserList(listParam){
        if(listParam.listType == 'list'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/list.do'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return mm.request({
                url     : mm.getServerUrl('/manage/user/search.do'),
                data    : listParam
            });
        }
    }
    // 获取用户收货地址信息
    getUserShipping(listParam){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/shipping_list.do'),
            data    : {
                pageNum  : listParam.pageNum || 1,
                userId   : listParam.userId
            },
            method : 'POST'
        });
    }
    // 获取用户信息
    getUser(userId){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/get.do'),
            data    : {
                userId   : userId
            },
            method : 'POST'
        });
    }
    // 添加管理员
    saveUser(user){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/add.do'),
            data    : {
                username   : user.username,
                password   : user.password,
                phone      : user.phone
            },
            method : 'POST'
        });
    }
    // 更新用户信息
    editUser(user){
        return mm.request({
            url     : mm.getServerUrl('/manage/user/edit.do'),
            data    : {
                id            : user.id,
                email         : user.email,
                phone         : user.phone,
                question      : user.question,
                answer        : user.answer
            }
        });
    }
}

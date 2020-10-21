import MMUtile from 'util/mm.jsx';

const _mm = new MMUtile();

export default class Product{

    // 获取商品信息
    getProduct(productId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/detail'),
            data    : {
                productId : productId || 0
            }
        });
    }
    // 获取商品信息
    getProductList(listParam){
        if(listParam.listType == 'list'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/list'),
                data    : {
                    pageNum : listParam.pageNum || 1
                }
            });
        }
        else if(listParam.listType == 'search'){
            return _mm.request({
                url     : _mm.getServerUrl('/manage/product/search'),
                data    : listParam
            });
        }

    }
    // 获取商品信息
    saveProduct(product){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/save'),
            data    : product
        });
    }
    // 改变商品状态
    setProductStatus(productId, status){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/product/set_sale_status'),
            data    : {
                productId   : productId,
                status      : status
            }
        });
    }
    // 获取品类
    getCategory(parentCategoryId){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/get_category'),
            data    : {
                categoryId : parentCategoryId || 0
            }
        });
    }
    // 新增品类
    saveCategory(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/add_category'),
            data    : {
                parentId        : category.parentId    || 0,
                categoryName    : category.categoryName  || ''
            }
        });
    }
    // 更新品类名称
    updateCategoryName(category){
        return _mm.request({
            url     : _mm.getServerUrl('/manage/category/set_category_name'),
            data    : category
        });
    }
}
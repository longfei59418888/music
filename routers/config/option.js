/**
 * Created by DELL on 2017/6/22.
 */

module.exports.err=function (msg) {
    return JSON.stringify({
        msg:msg,
        data:{},
        code:4
    })
}
module.exports.suc=function (data) {
    return JSON.stringify({
        msg:'成功！',
        data:data,
        code:0
    })
}
module.exports.noLogin=function () {
    return JSON.stringify({
        msg:'请先登录！',
        data:{} ,
        code:1
    })
}
/**
 * Created by DELL on 2017/6/21.
 */
var db= require('./modules')
var SingleModel = require('./modules/single')
var MESSAGE_TITLE = 'singleDao'
module.exports.add =  function add(feild,s,e) {
    db.addOne(SingleModel,{singerid:feild.singerid,userId:feild.userId},feild,()=>{
        db.log(MESSAGE_TITLE,'添加歌手')
        s()
    },()=>{
        db.log(MESSAGE_TITLE,'添加歌手失败',true)
        e()
    })
}
module.exports.remove = function (feild,s,e) {
    SingleModel.remove(feild,function (error) {
        if(error){e()
            db.log(MESSAGE_TITLE,'删除歌手失败',true)
        }else {s()
            db.log(MESSAGE_TITLE,'删除歌手成功')
        }
    })
}
module.exports.find = function (feild,s,e) {
    var data = {}
    if(feild.page){
        data['page'] = feild.page
        delete feild.page
    }
    if(feild.page_size){
        data['page_size'] = feild.page_size
        delete feild.page_size
    }
    data['query'] = feild
    db.getList(SingleModel,data,(err,data)=>{
        if(err){
            e(e)
        }else {
            s(data)
        }
    })
}
module.exports.isSave=function (feild,s,e) {
    db.isHasData(SingleModel,feild,function (num) {
        s(num)
    })
}
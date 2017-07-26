/**
 * Created by DELL on 2017/6/21.
 */
var db = require('./modules')
var sheet = require('./modules/sheets')
var MESSAGE_TITLE = 'sheetDao'
//添加关注歌单
module.exports.add=function add(field,s,e) {
    db.addOne(sheet,{specialid:field.specialid,userId:field.userId},field,(rst)=>{
        if(s)db.log(MESSAGE_TITLE,'添加歌单成功');s(rst);},()=>{
        if(e) db.log(MESSAGE_TITLE,'添加歌单失败',true);e();})
}
//删除关注歌单
module.exports.deleted= function deleted(id,s,e) {
    sheet.remove(id,function (error) {
        if(error){e()
            db.log(MESSAGE_TITLE,'删除歌单失败',true)
        }else {s()
            db.log(MESSAGE_TITLE,'添加歌单成功')
        }
    })
}
//查询关注歌单
module.exports.find= function find(option,s,e) {
    db.getList(sheet,{
        query:option,
    },(err,data)=>{
        if(err){
            e(e)
        }else {
            s(data)
        }
    })
}
module.exports.isSave = function (option,s) {
    db.isHasData(sheet,option,(rst)=>{
        s(rst)
    })
}
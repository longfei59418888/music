/**
 * Created by DELL on 2017/6/21.
 */
var db = require('./modules/index')
var user = require('./modules/users')
var MESSAGE_TITLE = 'userDao'
//注册用户
module.exports.add=function add(field,s,e) {
    db.addOne(user,{userName:field.userName},field,()=>{
        if(s)db.log(MESSAGE_TITLE,'添加用户');s();},(msg)=>{
        if(e) db.log(MESSAGE_TITLE,'添加用户失败',true);e(msg);})
}
//更新用户信息
module.exports.update = function update(field,s,e) {
    user.update({_id:field.id},{$set:field},{upsert : true},(e)=>{
        if(e){db.log(MESSAGE_TITLE,'更新用户失败',true);e()}else {db.log(MESSAGE_TITLE,'更新用户');s()}
    })
}
//查询用户信息
module.exports.find = function find(field,s,e) {
    var  query = user.find(field);
    query.exec(function (err,docs) {
        if(err){db.log(MESSAGE_TITLE,'查询用户失败',true);
            e(err)
        }else {db.log(MESSAGE_TITLE,'查询用户');
         s(docs)
        }
    })
}
/**
 * Created by DELL on 2017/6/21.
 */
var mongoose = require('mongoose');
var shortId = require('shortid');
var AdminUserSchema = new mongoose.Schema({
    _id : {
        type:String,
        unique:true,
        'default': shortId.generate
    },
    name:  String,  //名称
    userName : String,  //账号
    password:   String,  //密码
    email : String,  //
    phoneNum : String,  //手机号
    comments : String,  //个性签名
    date: { type: Date, default: Date.now },  //申请时间
    // logo: { type: String, default: "/upload/images/defaultlogo.png" },  //头像
    logo: { type: String},  //头像
    auth: { type : Boolean ,default :false},  //是否认证
    level:String  //等级
})
var AdminUser = mongoose.model("AdminUser",AdminUserSchema);
module.exports = AdminUser;
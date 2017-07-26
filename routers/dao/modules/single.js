/**
 * Created by DELL on 2017/6/21.
 */
var mongooes = require('mongoose')
var shortId = require('shortid')

//音乐模型
var Single = new mongooes.Schema({
    _id:{
        type:String,
        unique:true,
        'default':shortId.generate
    },
    singerid:String,
    singername:String,
    imgurl:String,
    userId:String  //用户ID
})
module.exports = mongooes.model('SingleModel',Single)
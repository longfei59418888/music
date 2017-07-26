/**
 * Created by DELL on 2017/6/21.
 */
var mongooes = require('mongoose')
var shortId = require('shortid')

//音乐模型
var Music = new mongooes.Schema({
    _id:{
        type:String,
        unique:true,
        'default':shortId.generate
    },
    remark:String,
    filename:String,
    hash:String,
    sheets:String,
    userId:String
})
module.exports = mongooes.model('MusicModel',Music)
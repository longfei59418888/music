/**
 * Created by DELL on 2017/6/21.
 */
var mongoose = require('mongoose')
var shortId = require('shortid')
//用户收藏的歌单模型
var SheetSchema = new mongoose.Schema({
    _id:{
        type:String,
        unique:true,
        'default':shortId.generate
    },
    type:String,  //  1：我关注的歌单 ，:2：我的歌单
    imgurl:String,  //图片
    specialid:String, //歌单ID
    intro:String,  //介绍
    username:String, //歌单人名称
    specialname:String,  //名称
    userId:String  //用户ID
})

module.exports = mongoose.model('SheetSchema',SheetSchema)
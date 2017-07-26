/**
 * Created by DELL on 2017/6/29.
 */
var mongoose = require('mongoose')
var shortId = require('shortid')
var userInfo = new mongoose.Schema({
    _id:{
        type:String,
        unique:true,
        'default':shortId.generate
    },
    name:String,
    phoneNum:String,
    comments:String,
    headImg:String,
})
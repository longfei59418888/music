/**
 * Created by DELL on 2017/6/21.
 */
var mongoose = require('mongoose')
var shortId = require('shortid')
var musics = require('./music')
var sheets = require('./sheets')
var MusicSheet=new mongoose.Schema({
    _id:{
        type:String,
        unique:true,
        'default':shortId.generate
    },
    musics: {
        type : String,
        ref : 'musics'
    },
    sheets:{
        type : String,
        ref : 'sheets'
    },
    userId:String
})
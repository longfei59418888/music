/**
 * Created by DELL on 2017/6/21.
 */
var db = require('./modules')
var async = require('async')
var musicSheet = require('./modules/music_sheet')
var music = require('./music')
var MESSAGE_TITLE = 'musicSheet'
module.exports.add=function add(feild,s,e) {
    async.parallel({
        counts:function (done) {
            //添加歌曲
            db.addOne(music,{musics:feild.musicId,sheets:feild.sheetId},feild,function () {
                done()
            },function () {
                done()
            })
        },
        //添加歌单
        list:function (done) {
            db.addOne(musicSheet,{musics:feild.musicId,sheets:feild.sheetId},feild,function () {
                done()
            })
        }},function (err, results) {
            if(err){e()
                db.log(MESSAGE_TITLE,'添加歌曲到歌单失败',true)
            }else {s()
                db.log(MESSAGE_TITLE,'添加歌曲到歌单')
            }
    })
}

module.exports.deleted=function deleted(id,s,e) {
    musicSheet.remove({_id:id},function (error) {
        if(error){e()
            db.log(MESSAGE_TITLE,'删除歌单歌曲失败',true)
        }else {s()
            db.log(MESSAGE_TITLE,'删除歌单歌曲成功')
        }
    })
}

//查询关注歌单
module.exports.find=function find(option,s,e) {
    db.getPaginationResult(musicSheet,{
        query:option.query,//查询字段
        fields:option.fields,  //返回字段
        page_size:option.page_size,  //页长度
        page:option.page,  //页长度
        callback:function (err,data) {
            if(err){e()
                db.log(MESSAGE_TITLE,'查询歌单歌曲失败',true)
            }else {s(data)
                db.log(MESSAGE_TITLE,'查询歌单歌曲')
            }
        },
    })
}

module.exports.isSave =function (o,s,e) {
    db.isHasData(o,(s)=>{
        s()
    },(e)=>{
        e()
    })
}

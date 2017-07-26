/**
 * Created by DELL on 2017/6/21.
 */
var db= require('./modules')
var music = require('./modules/music')
var MESSAGE_TITLE = 'nusicDao'
module.exports.add=function add(feild,s,e) {
    db.addOne(music,{hash:feild.hash,userId:feild.userId,sheets:feild.sheets},feild,()=>{
        db.log(MESSAGE_TITLE,'添加音乐')
        s()
    },()=>{
        db.log(MESSAGE_TITLE,'添加音乐失败',true)
        e()
    })
}
module.exports.deleted=function add(feild,s,e) {
    music.remove(feild,function (error) {
        if(error){e()
            db.log(MESSAGE_TITLE,'删除歌单失败',true)
        }else {s()
            db.log(MESSAGE_TITLE,'添加歌单成功')
        }
    })
}
module.exports.isSave=function add(feild,s,e) {
    db.isHasData(music,feild,(rst)=>{
        s(rst)
    })
}
module.exports.find=function add(feild,s,e) {
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
    db.getList(music,data,(err,data)=>{
        if(err){
            e(e)
        }else {
            s(data)
        }
    })
}
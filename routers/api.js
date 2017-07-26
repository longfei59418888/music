/**
 * Created by DELL on 2017/6/21.
 */
var express = require('express');
const uuidv1 = require('uuid/v1');
var shortId = require('shortid')
var path = require('path')
var web_config = require('./config/index')
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs');
var verify = require('./middle/verify')

var userModel = require('./dao/users')
var sheets = require('./dao/sheets')
var single = require('./dao/single')
var music = require('./dao/music')

var config = require('./config/option')

router.use((req, res, next)=>{
    var uuid = req.session.uuid,token = req.headers.token
    verify(req,res,()=>{  //验证sign
        if(req.session.uuid){  //有session.uuid
            req.isLogin = true
            req.redis.expire(req.session.uuid, 1555200);  //30天后失效
            next();
        }else {
            if(!token){
                req.isLogin = false
                next();
            }else {
                req.redis.get(token,function (err,rst) {
                    if(err){
                        req.isLogin = false
                    }else {
                        if(rst == null){
                            req.isLogin = false
                        }else {
                            req.isLogin = true
                            req.session.uuid = token //重新设置session
                            req.session.info = JSON.parse(rst) //重新设置session
                            req.redis.expire(req.session.uuid, 1555200);  //30天后失效
                        }
                    }
                    next();
                })
            }
        }


    })
});
//用户操作
router.post('/user/:option',function (req,res) {
    var option = req.params.option;
    var filed = req.body
    //注册
    if(option=='add'){
        if(filed.userName.length<0 || filed.password.length<6 || filed.phoneNum.length != 11){
            res.end(config.err('参数错误!'))
        }
        userModel.add({
            userName:filed.userName,
            password: filed.password,
            phoneNum:filed.phoneNum,
        },()=>{
            res.end(config.suc({}))
        },(msg)=>{
            res.end(config.err(msg))
        })
    }
    if(option=='update'){
        if(!req.isLogin){
            res.end(config.noLogin('未登录!'))
            return
        }
        userModel.update(Object.assign({id:req.session.info._id},filed),()=>{
            res.end(config.suc({}))
        },(msg)=>{
            res.end(config.err(msg))
        })
    }
    if(option=='find'){
        if(!req.isLogin){
            res.end(config.noLogin('未登录!'))
            return
        }
        userModel.find({_id:req.session.info._id},(s)=>{
            var data = s[0]
            res.end(config.suc({
                comments:data.comments,
                date:data.date,
                logo:data.logo,
                name:data.name,
                phoneNum:data.phoneNum,
                userName:data.userName,
            }))
        },(e)=>{
            res.end(config.err(e))
        })
    }
})
//登录
router.post('/login',(req,res)=>{
    var filed = req.body
    if(filed.userName.length<0 || filed.password.length<6){
        res.end(config.err('参数错误!'))
    }
    userModel.find({
        userName:filed.userName,
        password: filed.password,
    },(data)=>{
        if(data.length>0){
            var uuid = uuidv1()
            req.redis.set(uuid,JSON.stringify(data[0]),(err)=>{console.error(err)})  //设置redis  token 到用户映射
            req.session.uuid = uuid
            req.session.info = data[0]
            req.redis.expire(uuid, 1555200);  //30天后失效
            sheets.add({type:2, imgurl:'', specialid:'100000000000', intro:'', username:req.session.info.name, specialname:'我喜欢的音乐', userId:req.session.info._id,
            },(rst)=>{},(err)=>{})
            res.end(config.suc({
                token:uuid,
                info:{
                    comments:data[0].comments,
                    date:data[0].date,
                    logo:data[0].logo,
                    name:data[0].name,
                    phoneNum:data[0].phoneNum,
                    userName:data[0].userName,
                },
            }))
        }else {
            res.end(config.err('账号或密码错误!'))
        }
    },(msg)=>{
        res.end(config.err(msg))
    })
})
//我的添加歌单
router.post('/sheet/:option',(req,res)=>{
    var option = req.params.option;
    var filed = req.body
    if(!req.isLogin){
        if(option=='issave'){
            res.end(config.suc({
                isSave:0
            }))
            return
        }
        res.end(config.noLogin('未登录!'))
        return
    }
    //添加歌单
    if(option=='add'){
        if(filed.specialname.length<1 ){
            res.end(config.err('参数有误！'))
        }
        if(filed.specialid){filed.type=1}else {filed.type=2}
        sheets.add({
            type:filed.type,
            imgurl:filed.imgurl,
            specialid:filed.specialid?filed.specialid:shortId.generate(),
            intro:filed.intro,
            username:filed.specialid?'':req.session.info.name,
            specialname:filed.specialname,
            userId:req.session.info._id,
        },(rst)=>{
            res.end(config.suc(rst))
        },(err)=>{
            res.end(config.err(err))
        })
    }
    //是否已添加
    if(option=='issave'){
        if(!filed.specialid){res.end(config.err('参数有误！'))}
        sheets.isSave({
            specialid:filed.specialid,
            userId:req.session.info._id,
        },(num)=>{
            res.end(config.suc({
                isSave:num
            }))
        })
    }
    //移除歌单
    if(option=='delete'){
        if(!filed.specialid){
            res.end(config.err('参数有误！'))
        }
        var data= {userId:req.session.info._id}
        data['specialid']=filed.specialid
        sheets.deleted(data,(rst)=>{
            music.deleted({userId:req.session.info._id,sheets:filed.specialid},(s)=>{
                res.end(config.suc({}))
            },(e)=>{
                res.end(config.err(e))
            })
        },(err)=>{
            res.end(config.err(err))
        })
    }
    if(option == 'find'){
        var data= {userId:req.session.info._id}
        if(filed.type){
            data['type'] = filed.type
        }
        sheets.find(data,(s)=>{
            res.end(config.suc(s))
        },(e)=>{
            res.end(config.err(e))
        })
    }


})
//我的关注歌手
router.post('/single/:option',(req,res)=>{
    if(!req.isLogin){
        if(option=='issave'){
            res.end(config.suc({
                isSave:0
            }))
            return
        }
        res.end(config.noLogin('未登录!'))
        return
    }
    var option = req.params.option;
    var filed = req.body
    if(option == 'add'){
        if(filed.singerid&&filed.singername&&filed.imgurl){
            single.add(Object.assign({},filed,{
                userId:req.session.info._id
            }),(s)=>{
                res.end(config.suc({}))
            },(e)=>{
                res.end(config.err(e))
            })
        }else {
            res.end(config.err('参数有误!'))
        }

    }
    if(option == 'delete'){
        if(filed.singerid){
            single.remove(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
                res.end(config.suc({}))
            },(e)=>{
                res.end(config.err(e))
            })
        }else {
            res.end(config.err('参数有误!'))
        }

    }
    if(option == 'issave'){
        if(filed.singerid){
            single.isSave(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
                res.end(config.suc({
                    isSave:s
                }))
            })
        }else {
            res.end(config.err('参数有误!'))
        }

    }
     if(option == 'find'){
         single.find(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
            res.end(config.suc(s))
        },(e)=>{
            res.end(config.err(e))
        })
    }
})
//添加歌曲到歌单
router.post('/music/:option',function (req,res) {
    if(!req.isLogin){
        if(option=='issave'){
            res.end(config.suc({
                isSave:0
            }))
            return
        }
        res.end(config.noLogin('未登录!'))
        return
    }
    var option = req.params.option;
    var filed = req.body
    if(option == 'add'){
        if(filed.sheets&&filed.filename&&filed.hash){
            music.add(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
                res.end(config.suc({}))
            },(e)=>{
                res.end(config.err(e))
            })
        }else {
            res.end(config.err('参数有误!'))
        }
    }else if(option == 'delete'){
        music.deleted(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
            res.end(config.suc({}))
        },(e)=>{
            res.end(config.err(e))
        })

    }else if(option == 'issave'){
        music.isSave(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
            res.end(config.suc({
                isSave:s
            }))
        })
    }
    else if(option == 'find'){
        music.find(Object.assign({},filed,{userId:req.session.info._id}),(s)=>{
            res.end(config.suc(s))
        },(e)=>{
            res.end(config.err(e))
        })
    }
})

router.post('/upload',function (req,res) {
    if(!req.isLogin){
        res.end(config.noLogin('未登录!'))
        return
    }
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname,'tmp')	 //设置上传目录
    form.keepExtensions = true;	 //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
    form.parse(req, function(err, fields, files) {
        var fileName = /image\/(gif|jpg|jpeg|bmp|png)$/.exec(files.userfile.type)
        if(fileName){
            var name = 'image_'+new Date().getTime()+'.'+fileName[1]
            fs.renameSync(files.userfile.path, path.join(__dirname,'../upload',name));  //重命名
            res.end(config.suc({
                image:web_config.WEB_DOMAIN+":3331/upload/"+name
            }))
        }else {
            res.end(config.err('参数错误'))
        }
    });
})

module.exports = router;
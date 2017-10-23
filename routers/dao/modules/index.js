/**
 * Created by DELL on 2017/6/21.
 */
var mongoose = require('mongoose')
var async = require('async')
var config = require('../../config/index')
var db = mongoose.connect(config.DB_URL,{useMongoClient:true});

var DbOption={
    addOne : function(obj,checkField,Field,success,fail){
        async.series({
            one:function (bak) {
                obj.count(checkField,function (err,count) {
                    if(count != 0){
                        fail("该用户名已存在！")
                        return false;
                    }else {
                        bak()
                    }
                })
            },
            two:function (bak) {
                var newObj = new obj(Field);
                newObj.save(function(err){
                    if(err){
                        fail(err)
                    }else{
                        success(newObj)
                    }
                });
            }
        },function (err, results) {
        })
    },
    getPaginationResult:function (obj,option) {   //query 查询条件 fields 查询字段  s,e 回调函数  page_size 每页长度  page 页码 o排序
        var opt = Object.assign({page:1,page_size:15,query:{},sort:{'date':'-1'}},option)
        var start = parseInt((opt.page - 1) * opt.page_size);
        var _this = this;
        async.parallel({
            counts:function (done) {
                obj.count(function (err,count) {
                    done(err, count);
                })
            },
            list:function (done) {
                _this.getResult(obj,opt.query,start,parseInt(opt.page_size),opt.sort,opt.populate,done)
            }},function (err, results) {
            opt.callback(err, {
                pageInfo:{
                    total:results.counts,
                    page:parseInt(opt.page),
                    page_size:parseInt(opt.page_size),
                },
                list:results.list});
        })
    },
    getList(obj,option,bak){
        var _this = this;
        var _opt = Object.assign({page:1,page_size:15,query:{},sort:{'date':'-1'}},option)
        var  query = obj.find(_opt.query);
        var start = parseInt((_opt.page - 1) * _opt.page_size);
        query.skip(start).limit(_opt.page_size)
        if(_opt.populate){
            query.populate(_opt.populate)
        }
        query.exec(function (err,docs) {
            bak(err, docs);
        })
    },
    getResult:function (obj,query,start,page_size,sort,populate,done) {
        var _this = this;
        var  query = obj.find(query);
        query.skip(start).limit(page_size).sort(sort)
        if(populate){
            query.populate(populate)
        }
        query.exec(function (err,docs) {
            if(start<0 || docs.length>0){
                done(err, docs);
                return false
            }
            _this.getResult(obj,query,start,page_size,sort,populate,done)
        })
    },
    isHasData(obj,checkField,bak){
    obj.count(checkField,function (err,count) {
            if(count == 0){
                bak(0)
                return false;
            }else {
                bak(1)
            }
        })
    },
    log(title,messge,type){
        if(type){
            console.error(title,messge)
        }else {
            console.log(title,messge)
        }
    }
}



module.exports=DbOption

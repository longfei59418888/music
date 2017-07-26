/**
 * Created by DELL on 2017/6/2.
 */
var path = require('path');
var express = require('express')
var webpack = require('webpack')
var fs = require('fs');
var mime = require("mime");

var cheerio = require('cheerio')
var http = require('http')
var axios = require('axios')
var bodyParser = require('body-parser')
var session = require('express-session');
var redis = require('redis')
var Api = require('./routers/api')



var app = express()
var port = 3331
var redis =  redis.createClient(6379,'127.0.0.1');  //redis


fs.readFile('index.html','utf8',function (err,data) {
    data = data.replace(/<script\s+src="\.\/bundle\.js"><\/script>/,'')
    fs.writeFile('webpack/index.html',data,(err)=>{
        if(err) throw err;
        console.log('save index to webpack!')
    })
})
var webpackConfig = require('./webpack/webpack.dev.conf')
var compiler = webpack(webpackConfig)
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})
var hotMiddleware = require('webpack-hot-middleware')(compiler)
app.use(devMiddleware)  //热加载
app.use(hotMiddleware)  //热刷新
app.all('/',function (req,res) {
    res.sendfile('index.html');
})


// client.set("test", "some val",function (err,res) {
// });
// client.expire("test", 5);

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: '12345',saveUninitialized:true,}))  //session
app.use((req,res,next)=>{
    var relPath = path.join(__dirname,req.url)
    fs.exists(relPath,(exists)=>{
        if(!exists){
            res.writeHead(200, {
                "Content-Type": "text/html;charset=utf-8"
            });
            req.redis = redis;
            next()
        }else {
            // 当文件存在时
            fs.readFile(relPath, "binary", (err, file) => {
                if (err) {
                    res.writeHead(500, {"Content-Type": "text/plain"})
                    res.end(err);
                } else {
                    // 当文件可被读取时，输出文本流
                    res.writeHead(200, {
                        'Content-type':mime.lookup(relPath)});
                    res.write(file, "binary");
                    res.end();
                }
            });
        }
    })

})


//首页banner
app.all('/list/bannerList',function (req,res) {
    var html = "",list=[]; //html
    http.get('http://m.kugou.com/', function(rst) {
        rst.setEncoding('utf8');
        rst.on('data', function(chunk) {
            html += chunk;
        });
        rst.on('end', function() {
            var $ = cheerio.load(html);
            var list = $('.swipe-wrap').find('img'),list2=[]
            for (var i =0;i<list.length;i++){
                list2.push($(list[i]).attr('src'))
            }
            res.end(JSON.stringify(list2))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//某类歌曲列表
app.all('/list/music',function (req,res) {
    var type = req.query.type
    var page = req.query.pageIndex
    http.get('http://m.kugou.com/rank/info/?rankid='+type+'&page='+page+'&json=true',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(html.replace('undefined',''))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//歌单列表
app.all('/list/sheet',function (req,res) {
    var page = req.query.pageIndex
    http.get('http://m.kugou.com/plist/index?page='+page+'&json=true',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(html.replace('undefined',''))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//歌手列表
app.all('/list/single',function (req,res) {
    var page = req.query.pageIndex
    var type = req.query.type
    http.get('http://m.kugou.com/singer/list/?classid='+type+'&page='+page+'&json=true',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(html.replace('undefined',''))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//歌手歌曲列表
app.all('/list/single/music',function (req,res) {
    var type = req.query.type,html,list=[],info={},
        page=req.query.pageIndex
    if(page>1){
        res.end(JSON.stringify(list))
    }
    http.get('http://www.kugou.com/yy/singer/home/'+type+'.html', function(rst) {
        rst.setEncoding('utf8');
        rst.on('data', function(chunk) {
            html += chunk;
        });
        rst.on('end', function() {
            var $ = cheerio.load(html)
            $('#song_container li').each((i,v)=>{
                var item = $(v).find('input').attr('value').split('|');
                list.push({filename:item[0],hash:item[1],id:item[2]});
            })
            info={
                imgurl:$('.sng_ins_1 .top>img').attr('src').replace(/\/240\//,'/400/'),
                intro:$('.sng_ins_1 .intro>p').text(),
                profile:$('.sng_ins_1 .intro>p').text().slice(0,200)
            }
            res.end(JSON.stringify({info:info,list:list}))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//歌单歌曲列表
app.all('/list/sheet/music',function (req,res) {
    var id = req.query.id,html
    http.get('http://m.kugou.com/plist/list/'+id, function(rst) {
        rst.setEncoding('utf8');
        rst.on('data', function(chunk) {
            html += chunk;
        });
        rst.on('end', function() {
            var $ = cheerio.load(html),list=[]
            $('.panel-songslist-item').each((i,v)=>{
                var item = JSON.parse($(v).find('em').text());
                list.push(item);
            })
            res.end(JSON.stringify(list))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
app.all('/music/info',function (req,res) {
    var type = req.query.type
    http.get('http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash='+type+'&from=singer',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(html.replace('undefined',''))
        })
    })
})
app.all('/music/Lyrics',function (req,res) {
    var hash = req.query.hash
    var timelength = req.query.timelength
    var keyword = req.query.keyword
    http.get('http://m.kugou.com/app/i/krc.php?cmd=100&' +
        'keyword='+keyword+'&hash='+hash+'&timelength='+timelength+'&d=0.6855015192610865',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(html.replace('undefined',''))
        })
    })
})
app.all('/list/news',function (req,res) {
    var page = req.body.page
    http.get('http://3g.163.com/touch/reconstruct/article/list/BD2AC4LMwangning/'+page+'.html',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(JSON.stringify({
                msg:'成功！',
                data:html.replace('undefined',''),
                code:0
            }))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
app.all('/info/news',function (req,res) {
    var url = req.body.url,html=''
    http.get(url, function(rst) {
        rst.setEncoding('utf8');
        rst.on('data', function(chunk) {
            html += chunk;
        });
        rst.on('end', function() {
            var $ = cheerio.load(html)
            res.end(JSON.stringify({
                msg:'成功！',
                data:$('.content').html(),
                code:0
            }))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})
//
app.all('/search',function (req,res) {
    var keyword = req.body.keyword,page= req.body.page
    console.log(keyword,page)
    http.get('http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&' +
        'keyword=' +encodeURI(keyword)+
        'page='+page+'&pagesize=50&showtype=1&callback=kgJSONP872909246',function (rst) {
        var html;rst.setEncoding('utf8');
        rst.on('data', function(chunk) {html += chunk;});
        rst.on('end', function() {
            res.end(JSON.stringify({
                msg:'成功！',
                data:html.replace('undefined',''),
                code:0
            }))
        })
    }).on('error',function (e) {
        res.writeHead(405, {
            "Content-Type": "text/html;charset=utf-8"
        });
        res.end()
    })
})


app.use('/api',Api);
app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:' + port + '\n')
})
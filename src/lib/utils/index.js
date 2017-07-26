/**
 * Created by DELL on 2017/6/7.
 */
import config from '../../config/index'
import {getAppInfoDeviceId,publicNodeRSA} from './appUtil'
const _ARRAY_NAME = "[object Array]"
const _OBJECT_NAME = "[object Object]"
const _WEB_URL = !config.isDebug ? WEB_CONFIG.web_url: WEB_CONFIG.web_debug_url;
import axios from 'axios'

export function extend(target) {
    var targets, arg = Array.from(arguments).slice(1,arguments.length);
    if(arg.length>0){
        targets = _extend(target,arg[0])
    }
    if(arg.length>1){
        return extend(targets,arg[1])
    }
    return targets;
}
export function post(opt) {
    if(!WEB_CONFIG.web_netConnect){
        alert('没有网络!')
        return
    }
    if(!isLogin && opt.isLogin){
        alert('没有登录!')
        return
    }
}


//设置缓存
export function setCache($key,$value,$expire) {
    var object = { value: $value, timestamp: $expire && (parseInt($expire) + new Date().getTime()) || '0' };
    localStorage.setItem($key, JSON.stringify(object));
}
//得到缓存
export function getCache($key) {
    var cache = localStorage.getItem($key);
    if (cache) {
        var object = JSON.parse(localStorage.getItem($key)),
            dateString = object.timestamp,
            now = new Date().getTime().toString();
        if (dateString != '0' && now > dateString) {
            localStorage.removeItem($key);
            return null;
        }
        return object.value;
    } else return null;
}
//清楚缓存
export function clearCache($key) {
    if(!$key){
        localStorage.clear()
        return
    }
    localStorage.removeItem($key);
}

//登录
export function login(url,o,s,e) {
    var deviceInfo = getAppInfoDeviceId();
    var time = new Date().getTime()
    var headers={
            deviceId:deviceInfo.DeviceId, //设备ID
            clientId:deviceInfo.ClientId,  //设备类型
            clientVer:deviceInfo.ClientVer,  //app版本号
            timestamp:time,  //当前时间
    }
    var sign = publicNodeRSA(JSON.stringify(headers));
    axios.post(url,o,{
        headers:Object.assign({},headers,{sign:sign})
    }).then((data)=>{
        if(data.data.code==0){
            setCache('login_token',data.data.data.token)
            if(s) s(data.data)
        }else {
            if(e) e(data.data.msg)
        }
    }).catch((err)=>{
        if(e)e(err);
    })
}

export function getVendorPrefix() {
    var body = document.body || document.documentElement,
        style=body.style,
        vendor = ['webkit' , 'khtml' , 'moz' , 'ms' , 'o'],
        i = 0;
    while(i < vendor.length){
        if(typeof style[vendor[i] + 'Transition'] === 'string'){
            return vendor[i];
        }
        i++;
    }
}

export function getTranslateInfo(t) {
    var reg = /translate\((.+)px?,(.+)px?\)/
    var rst = reg.exec(t)
    if(rst){
        return {
            x:parseFloat(rst[1]),
            y:parseFloat(rst[2])
        }
    }else {
        return {
            x:0,
            y:0
        }
    }
}

export function Base64ToBlob(urlData){

    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte

    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
}


export function isLogin() {
    return fasle
}


//深扩展
function _extend(target,source) {
    if(_isType(source) ==_ARRAY_NAME){
        for (var i=0;i<source.length;i++){
            if(_isType(source[i]) ==_ARRAY_NAME){
                target[i]=source[i].concat(target[i]?target[i]:[])
                _extend(target[i],source[i])
            }else if (_isType(source[i]) ==_OBJECT_NAME){
                target[i] = target[i]?target[i]:{}
                _extend(target[i],source[i])
            }else {
                target[i] = source[i]
            }
        }
    }else {
        for (var v in source){
            if(_isType(source[v]) ==_ARRAY_NAME){
                target[v]=source[v].concat(target[v]?target[v]:[])
                _extend(target[v],source[v])
            }else if(_isType(source[v]) ==_OBJECT_NAME){
                target[v] = target[v]?target[v]:{}
                _extend(target[v],source[v])
            }else {
                target[v] = source[v]
            }
        }
    }
    return target;
}

function _isType(obj) {
    return Object.prototype.toString.call(obj)
}
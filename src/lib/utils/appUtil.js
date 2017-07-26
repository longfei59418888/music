/**
 * Created by DELL on 2017/6/9.
 */
import Events from './Event/index'
import {setCache,getCache}  from './index'
var NodeRSA = require('node-rsa');
export const GET_PUSH_MESSAGE = 'getPushMessage'; //监听推送信息
export const GET_NET_CHANGE = 'getNetChange'  //监听网络变化


//监听推送信息
export function bind_getPushMessage(fn) {
    Events.on(GET_PUSH_MESSAGE,fn)
}
export function clear_getPushMessage(fn=false) {
    Events.remove(GET_PUSH_MESSAGE,fn)
}
window[GET_PUSH_MESSAGE]=function (option) {
    Events.emit(GET_PUSH_MESSAGE,option)
}



//监听网络变化
export function bind_getNetChange(fn) {
    Events.on(GET_NET_CHANGE,fn)
}
export function clear_getNetChange(fn=false) {
    Events.remove(GET_NET_CHANGE,fn)
}
window[GET_NET_CHANGE]=function (option) {
    Events.emit(GET_NET_CHANGE,option)
}


//扫一扫
export function scanGetCode() {

}

//获取当前网络信息
export function isNetConnect() {

}

//生成二维码
export function getCode(img) {

}

//设备当前信息
export function getAppInfo() {

}

//分享
export function share() {

}

//设置存储
export function setStore() {

}


//设备DeviceId,设备类型ClientId
export function getAppInfoDeviceId() {
    if(getCache('getAppInfoDeviceId')){
        return getCache('getAppInfoDeviceId')
    }
    setCache('getAppInfoDeviceId',{
        DeviceId:'sf',
        ClientId:'asdfa',
        ClientVer:1.0})
    return {
        DeviceId:'sf',
        ClientId:'asdfa',
        ClientVer:1.0
    }
}



var publicPem = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDgYVYLKUfxi2+1+O+uLpI3tU66m2k9o80AV5X9Brl1ZsyDAovK' +
    'as66XHhI8bvdAK3YRtguqFXTWSQzfmpAtJy4qjzRHMn+SRP//KmjpjuP+QCXhhYwe' +
    'Cj98QoI4ArK3jAsZtEe+jB58A5vpS965i+cUaleFWNdYW1L+RuHmU2hvwIDAQAB'
function getPem(data,type) {
    data = data+'\n';
    var data_pem=type ? '-----BEGIN RSA PRIVATE KEY-----\n':'-----BEGIN PUBLIC KEY-----\n';
    var data_array = []
    for(var i=0;i<Math.ceil(data.length/64);i++){
        data_array.push(data.slice(i*64,(i+1)*64));
    }
    data_pem +=data_array.join('\n')
    data_pem +=type ? '-----END RSA PRIVATE KEY-----':'-----END PUBLIC KEY-----';
    return data_pem;
}
var public_pem = getPem(publicPem)  //加载私钥字符串
var key_pub = new NodeRSA(public_pem);   //创建公钥加密对象
export function publicNodeRSA(option) {  //创建 sign  防止数据在传输中被改
    return key_pub.encrypt(option,'base64')//加密
}


//Md5加密
export function Md5(data) {
    return data+'123456'
}
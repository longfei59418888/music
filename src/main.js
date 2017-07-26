import Vue from "vue";
import VueRouter from "vue-router";
import VueScroller from 'vue-scroller'
import axios from 'axios'
import vueIosActionSheet from 'vue-ios-actionsheet';

import imgLoad from  './views/units/imgLoad'

import App from './app.vue'
import store from './config/store'
import VueRouterTransition from './lib/VueRouterTransition'
import routers from './config/routers'
import {getAppInfoDeviceId,publicNodeRSA} from './lib/utils/appUtil'
import {getCache} from './lib/utils'

Vue.use(VueRouter);
Vue.use(VueScroller)
Vue.use(imgLoad)



var instance = axios.create({
    baseURL: 'http://192.168.0.178:3031', //
    transformResponse:[function (data) {}],//处理返回数据
    headers: {'X-Requested-With': 'XMLHttpRequest'},//头信息
}),vueInstance;
Vue.prototype.$ajax = axios
Vue.prototype.post = function (url,o,s,e,h={}) {
    var deviceInfo = getAppInfoDeviceId();
    var time = new Date().getTime()
    var token = getCache('login_token') ? getCache('login_token'):''
    var headers={
        deviceId:deviceInfo.DeviceId, //设备ID
        clientId:deviceInfo.ClientId,  //设备类型
        clientVer:deviceInfo.ClientVer,  //app版本号
        timestamp:time,  //当前时间
        token:token,  //当前时间
    }
    var sign = publicNodeRSA(JSON.stringify(headers));
    axios.post(url,o,{
        headers:Object.assign({},headers,{sign:sign},h)
    }).then((data)=>{
        if(data.data.code==0){
            if(s) s(data.data)
        }else if(data.data.code==1){
            console.log(vueInstance.$router.push({name:'login'}))
        }else {
            if(e) e(data.data.msg)
        }
    }).catch((err)=>{
        if(err)console.log(err);
    })
}


//过滤器
Vue.filter('imgSetSize', function (value) {
    return value.replace('{size}',400)
})
Vue.filter('setTextSize', function (value,size) {
    if(value.length>size){
        value = value.slice(0,size)+'...'
    }
    return value;
})
Vue.filter('timeFormat', function (value) {
    var m = parseInt(value/60),s = parseInt(value%60)
    return (m>9?m:'0'+m)+":"+(s>9?s:'0'+s);
})



re_misic_audio_config.audio=document.getElementById('re_misic_audio');
re_misic_audio_config.audio.addEventListener('ended', function () {
    console.log(re_misic_audio_config.mode,re_misic_audio_config.musicList.length)
    if(re_misic_audio_config.mode==2 || re_misic_audio_config.musicList.length<2){
        setTimeout(function () {
            re_misic_audio_config.audio.play()
        },1000)
        return
    }
    re_misic_audio_config.index= re_misic_audio_config.index+1
    if(re_misic_audio_config.index>re_misic_audio_config.musicList.length-1){
       re_misic_audio_config.index= 0
    }
    if(re_misic_audio_config.mode==1){
        re_misic_audio_config.index= parseInt(Math.random()*re_misic_audio_config.musicList.length)
    }
    axios.get('/music/info',{params:{type:re_misic_audio_config.musicList[re_misic_audio_config.index].hash}})
        .then(function (rst) {
            re_misic_audio_config.hash=rst.data.hash
            re_misic_audio_config.musicInfo=rst.data
            re_misic_audio_config.audio.src = rst.data.url
            re_misic_audio_config.audio.currentTime=0
            re_misic_audio_config.audio.play();

        })
})
const  router = VueRouterTransition(VueRouter,routers)
vueInstance = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')



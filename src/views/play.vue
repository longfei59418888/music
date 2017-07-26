<template>
    <div>
        <div v-bind:class="playStyle['bg']"
             v-bind:style="{backgroundImage:'url(http://singerimg.kugou.com/uploadpic/pass/softhead/400/20170515/20170515114300444.jpg)'}"></div>
        <div style="position: relative;width: 100%;height: 100%;z-index: 99999;">
            <div style="background: none;position: relative;z-index: 999" v-bind:class="styles['header-index']">
                <div v-on:click="back()" v-bind:class="styles['h-scan']"><img style="width: .48rem;" src="../image/icon/jiantou-left.png" alt=""></div>
                <div v-bind:class="styles['music-title']">
                    <p>{{musicInfo.songName}}</p>
                    <span>{{musicInfo.singerName}}</span>
                </div>
                <div v-bind:class="[[styles['h-i']],playStyle['h-i']]" ><i v-bind:style="{backgroundImage:shareImage}"></i></div>
            </div>
            <div v-bind:class="playStyle['play-box']">
                <div v-bind:class="playStyle['option']">
                    <img style="position: absolute;left: 0;top: 0;width: 1.92rem;" src="../image/icon/otpion-show-1.png" alt="">
                    <img v-bind:class="isPlayOption" style="width: 1.92rem;" src="../image/icon/otpion-show-2.png" alt="">
                </div>
                <div v-bind:class="playStyle['play-music']">
                    <div v-bind:class="imgStyle" style="padding-top: 1.12rem ">
                        <img v-bind:class="removeAction" style="width: 3.68rem;border-radius: 100%;margin: 0 auto;display: block"
                             v-bind:src="musicInfo.imgUrl | imgSetSize" alt="">
                    </div>
                </div>
            </div>
            <div v-bind:class="[playStyle['option-music']]">
                <div v-bind:class="playStyle['option-top']">
                    <p style="width: 25%;float: left" v-bind:class="[styles['flex-mixin-center']]">
                        <img @click="save()" v-if="!isSave" style="width: .36rem;" src="../image/icon/muisc-option3.png" alt="">
                        <img @click="save()" v-if="isSave" style="width: .36rem;" src="../image/icon/muisc-option3-2.png" alt="">
                    </p>
                    <p style="width: 25%;float: left" v-bind:class="[styles['flex-mixin-center']]">
                        <img @click="goInfo()" src="../image/icon/muisc-option2.png" alt="">
                    </p>
                    <p style="width: 25%;float: left;position: relative" v-bind:class="[styles['flex-mixin-center']]">
                        <img src="../image/icon/muisc-option4.png" alt="">
                        <zan :left="40" :top="0"></zan>
                    </p>
                    <p style="width: 25%;float: left" v-bind:class="[styles['flex-mixin-center']]">
                        <img @click="actionsheet()" src="../image/icon/muisc-option1.png" alt=""></p>
                </div>
                <div v-bind:class="playStyle['option-center']">
                    <div style="width:.7rem;text-align: center">{{currentTime|timeFormat}}</div>
                    <div v-bind:class="playStyle['option-proccess']" style="width:.7rem;">
                        <div><p v-bind:style="{width:proWidth}"><span  ref="point_option"><i></i></span></p></div>
                    </div>
                    <div style="width:.8rem;text-align: center;">{{musicInfo.timeLength|timeFormat}}</div>
                </div>
                <div v-bind:class="playStyle['option-bottom']">
                    <div v-on:click="changeMode()" v-bind:class="playStyle['slide']">
                        <img v-if="mode==1" src="../image/icon/suij.png" alt="">
                        <img v-if="mode==2"  src="../image/icon/danqu-otp.png" alt="">
                        <img v-if="mode==3"  src="../image/icon/xunhuan.png" alt="">
                    </div>
                    <div v-bind:class="playStyle['center']">
                        <div v-bind:class="playStyle['pre']"><img v-on:click="changeMusic()" src="../image/icon/shangyiqu.png" alt=""></div>
                        <div v-on:click="play()" v-bind:class="playStyle['played']">
                            <img v-if="!isPlay" src="../image/icon/paly-d.png" alt="">
                            <img v-if="isPlay" src="../image/icon/zanting.png" alt="">
                        </div>
                        <div v-bind:class="playStyle['next']"><img v-on:click="changeMusic(true)" src="../image/icon/xiayiqu.png" alt=""></div>
                    </div>
                    <div v-bind:class="playStyle['slide']">
                        <img @click="musicChoose()" src="../image/icon/h-setting.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import config from '../config/index'
    import Toast from './units/toast'
    import zan from './unit/zan.vue'
    import shareImage from '../image/icon/share-music.png'
    import { musicOptions } from './units/actionSheet'
    import { sheetAdded } from './units/modal'
    import playIcon from '../image/option/next-option.png'
    import addIcon from '../image/option/add-option.png'
    import zjIcon from '../image/option/zhanji-poption.png'
    import jiaIcon from '../image/option/jiahao-otpin.png'
    import defaultIcon from '../image/option/wo-xid.png'
    import geshouIcon from '../image/option/geshou-optuon.png'
    export default {
        name: 'app',
        components: {
            zan
        },
        data: function () {
            return {
                styles:require('../style/scss/index.scss'),
                playStyle:require('../style/scss/play.scss'),
                musicList:[],
                musicInfo:{imgUrl:'',timeLength:0},
                shareImage,
                isPlay:false,
                mode:1,
                index:1,
                isSave:false,
                removeAction:[],
                proWidth:0,
                stopUpdate:false,
                currentTime:0,
                sheetList:[]
            };
        },
        computed:{
            imgStyle(){
                return this.isPlay?[this.playStyle['music-img']]:[this.playStyle['music-img'],this.playStyle['stop']]
            },
            isPlayOption(){
                return !this.isPlay?this.playStyle['active']:''
            }
        },
        watch: {},
        destroyed(){
            re_misic_audio_config.audio.removeEventListener('timeupdate',this.updateTime)
            re_misic_audio_config.audio.removeEventListener('ended',this.end)
        },
        created(){
            var _this = this;
            if(re_misic_audio_config.hash != this.$route.params.id){
                this.getMusic()
            }else {
                this.musicInfo = re_misic_audio_config.musicInfo
                this.currentTime=re_misic_audio_config.audio.currentTime
                this.proWidth=re_misic_audio_config.audio.currentTime*100/this.musicInfo.timeLength+'%'
            }
            _this.post('/api/music/issave',{sheets:'100000000000',hash:_this.$route.params.id},(s)=>{
                _this.isSave = s.data.isSave
            })
            this.mode=re_misic_audio_config.mode
            this.musicList = re_misic_audio_config.musicList
            this.index  = re_misic_audio_config.index
            re_misic_audio_config.audio.addEventListener('timeupdate',this.updateTime)
            re_misic_audio_config.audio.addEventListener('ended', this.end)
        },
        mounted(){
            //拖拽改变时间
            var element = this.$refs.point_option,_this = this,s_x,parentElement=element.parentNode,total = parentElement.parentNode.offsetWidth
            element.addEventListener('touchstart',function (e) {
                _this.stopUpdate=true
                e.preventDefault()
                var touch = event.targetTouches[0]
                s_x=touch.pageX
            })
            element.addEventListener('touchmove',function (e) {
                e.preventDefault()
                var touch = event.targetTouches[0],w=parentElement.offsetWidth
                if(total<w){
                    parentElement.style.width=total
                }else if(w<0){
                    parentElement.style.width=0
                }else {
                    parentElement.style.width=w+touch.pageX-s_x+'px'
                }
                s_x=touch.pageX

            })
            element.addEventListener('touchend',function (e) {
                _this.stopUpdate=false
                var w=parentElement.offsetWidth
                re_misic_audio_config.audio.currentTime=w*_this.musicInfo.timeLength/total
            })
        },
        methods: {
            back(){
                history.back();
            },
            end:function () {
                if(this.mode==2){
                    setTimeout(function () {
                        re_misic_audio_config.audio.play()
                    },1000)
                   return
                }
                this.changeMusic(true);
            },
            updateTime(time){
                this.currentTime=re_misic_audio_config.audio.currentTime
                if(!this.stopUpdate){
                    this.proWidth=re_misic_audio_config.audio.currentTime*100/this.musicInfo.timeLength+'%'
                }
//                console.log(re_misic_audio_config.audio)
            },
            getMusic(opt){
                var _this = this;
                _this.$ajax.get(config.url.infoMusic,{params:{type:opt?opt.id:_this.$route.params.id}})
                    .then(function (rst) {
                        _this.musicInfo=rst.data
                        re_misic_audio_config.hash=_this.musicInfo.hash
                        re_misic_audio_config.musicInfo=_this.musicInfo
                        re_misic_audio_config.audio.src = _this.musicInfo.url
                        re_misic_audio_config.audio.isPlay = true
                        _this.isPlay=true
                        _this.musicList.forEach((v,i)=>{
                            if(re_misic_audio_config.hash == v.hash){
                                re_misic_audio_config.index=_this.index  = i
                            }
                        })
                        if(opt){
                            opt.bak()
                        }
                        re_misic_audio_config.audio.play();

                    })
            },
            play(){
               if(re_misic_audio_config.audio.paused){
                   re_misic_audio_config.audio.play();
                   re_misic_audio_config.audio.isPlay = true
                   this.isPlay=true
               }else {
                   re_misic_audio_config.audio.pause();
                   re_misic_audio_config.audio.isPlay = false
                   this.isPlay=false
               }
            },
            changeMusic(type){
                if(this.musicList.length<1) return
                this.removeAction.push(this.playStyle['remove-action'])
                if(type){
                    this.index  = re_misic_audio_config.index= this.index+1
                    if(this.index>this.musicList.length-1){
                        this.index  = re_misic_audio_config.index= 0
                    }
                }else {
                    if(this.musicList.length<1) return
                    this.index  = re_misic_audio_config.index= this.index-1
                    if(this.index<0){
                        this.index  = re_misic_audio_config.index= this.musicList.length-1
                    }
                }
                if(this.mode==1){
                    this.index  = re_misic_audio_config.index= parseInt(Math.random()*this.musicList.length)
                }
                this.getMusic({id:this.musicList[this.index].hash,bak:function () {
                    this.removeAction=[]
                    re_misic_audio_config.audio.currentTime=0
                }})
            },
            changeMode(){
                if(this.mode==3){
                    this.mode=re_misic_audio_config.mode=1
                }else {
                    this.mode=re_misic_audio_config.mode=1+this.mode
                }

            },
            save(){
                if (!this.isSave){
                    console.log(this.musicInfo.fileName )
                    this.post('/api/music/add',{
                        sheets:'100000000000',hash:this.$route.params.id,
                        filename:this.musicInfo.fileName,remark:this.musicInfo.remark},(s)=>{
                        Toast({message:'添加到喜欢的歌单'})
                        this.isSave = 1
                    })
                }else {
                    this.post('/api/music/delete',{sheets:'100000000000',hash:this.$route.params.id},(s)=>{
                        Toast({message:'移除歌曲'})
                        this.isSave = 0
                    })
                }
            },
            goInfo(){
                this.$router.push({name:'_single-id',params:{id:this.musicInfo.singerId}})
            },
            actionsheet() {
                var _this = this;
                var musicOption =  musicOptions({
                    list:[
                        {icon:addIcon,text:'添加到歌单',handle(){
                            musicOption.removeNow();
                            var list = [{icon:jiaIcon,text:'添加新歌单',handle:()=>{sheet();}},]
                            _this.post('/api/sheet/find',{type:2},(s)=>{
                                s.data.forEach((v,i)=>{
                                    list.push({icon:defaultIcon,text:v.specialname,_id:v._id})
                                })
                                add()
                            })
                            function add() {
                                musicOptions({
                                    list:list,
                                    title:'添加到歌单',
                                    handle:(item,index)=>{
                                        _this.post('/api/music/add',{
                                            remark:_this.musicInfo.remark,
                                            filename:_this.musicInfo.fileName,
                                            hash:_this.musicInfo.hash,
                                            sheets:item._id,
                                        },(s)=>{
                                            Toast({message:'添加成功！'})
                                        },(e)=>{
                                            Toast({message:'已添加到歌单！'})
                                        })
                                    }
                                })
                            }
                        }},
                        {icon:geshouIcon,text:'歌手：'+this.musicInfo.singerName},
                        {icon:zjIcon,text:'专辑：'+(this.musicInfo.remark?this.musicInfo.remark:this.musicInfo.filename)},

                    ],
                    title:'歌曲 : '+this.musicInfo.fileName,
                    handle:function (item,index) {}
                })
                function sheet() {
                    sheetAdded({
                        direction:'bottom',
                        scope:{
                            imgUrl:_this.musicInfo.imgUrl,
                        },
                        success(data){
                            _this.post('/api/music/add',{
                                remark:_this.item.remark?_this.item.remark:this.musicInfo.fileName,
                                filename:_this.item.filename,
                                hash:_this.item.hash,
                                sheets:data.data._id,
                            },(s)=>{
                                Toast({message:'添加成功！'})
                            })
                        }
                    })
                }
            },
            musicChoose(){
                if(this.musicList.length<2) return
                var _this = this,musicList=this.musicList,list=[]
                musicList.forEach((v)=>{
                    list.push({icon:playIcon,text:v.filename})
                })
                var musicOption =  musicOptions({
                    list:list,
                    title:'歌曲 : '+_this.musicInfo.fileName,
                    handle:function (item,index) {
                        _this.removeAction.push(_this.playStyle['remove-action'])
                        _this.index  = re_misic_audio_config.index= index
                        _this.getMusic({id:_this.musicList[_this.index].hash,bak:function () {
                            _this.removeAction=[]
                            re_misic_audio_config.audio.currentTime=0
                        }})
                    }
                })
            }
        }
    }
</script>
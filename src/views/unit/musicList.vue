<template>
    <div style="position: relative;height: 1rem;margin-left: .6rem;padding-right: .2rem;border-top: 1px solid #EDEEEF;">
        <i v-on:click="playMusic()" style="position: absolute;top: 0;height: 1rem;right: 100%;line-height: .9rem;font-size: .3rem;color: #aaa;
        text-align: center;width: .6rem;display: inline-block;font-style: normal">{{index}}</i>
        <div v-on:click="playMusic()" style="float: left;width: 75%">
            <p style="color: #000;font-size: .28rem;margin-top: .14rem;height: .32rem;overflow: hidden"><span>{{item.filename}}</span></p>
            <p style="color: #aaa;font-size: .2rem;
            padding-left: .02rem;height: .3rem;overflow: hidden;margin-top: .08rem;"><span>{{item.remark?item.remark:item.filename}}</span></p>
        </div>
        <div style="float: left;width: 25%;text-align: right;"  @click="actionsheet()">
            <p style="width: .7rem;height: .44rem;border: 1px solid #D33C33;text-align: center;border-radius: .1rem;display: inline-block;
            margin-top: .25rem;opacity: .6"><img style="width: .44rem;" src="../../image/icon/list-more-music.png" alt=""></p>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    import { musicOptions } from '../units/actionSheet'
    import { sheetAdded } from '../units/modal'
    import  Toast  from '../units/toast/index'
    import config from '../../config'
    import playIcon from '../../image/option/next-option.png'
    import addIcon from '../../image/option/add-option.png'
    import zjIcon from '../../image/option/zhanji-poption.png'
    import jiaIcon from '../../image/option/jiahao-otpin.png'
    import defaultIcon from '../../image/option/wo-xid.png'
    import deleteIcon from '../../image/option/delete.png'

    export default {
        props:['item','index','list'],
        data () {
            return {
                sheetList:[],
                musicInfo:{},
            }
        },
        methods: {
            playMusic(){
                re_misic_audio_config.musicList=this.list
                this.$router.push({name:'paly-type-id',params:{id:this.item.hash,type:"single"}})
            },
            actionsheet() {
                var _this = this,listOption
                if(!_this.item.filesize){
                    listOption = [
                        {icon:playIcon,handle:(data)=>{_this.playMusic()},text:'播放'},
                        {icon:zjIcon,text:'专辑：'+(this.item.remark?this.item.remark:this.item.filename)},
                        {icon:deleteIcon,text:'删除',handle(){
                            _this.post('/api/music/delete',{
                                hash:_this.item.hash,
                                sheets:_this.item.sheets,
                            },(s)=>{
                                _this.$emit('deleted',_this.index-1)
                            })
                        }},
                    ]
                }else {
                    listOption = [
                        {icon:playIcon,handle:(data)=>{_this.playMusic()},text:'播放'},
                        {icon:addIcon,text:'添加到歌单',handle(){
                            musicOption.removeNow();
                            var list = [{icon:jiaIcon,text:'添加新歌单',handle:()=>{
                                _this.$ajax.get(config.url.infoMusic,{params:{type:_this.item.hash}})
                                    .then(function (rst) {
                                        _this.musicInfo=rst.data
                                        sheet();
                                    })

                            }},]
                            if(_this.sheetList.length<1){
                                _this.post('/api/sheet/find',{type:2},(s)=>{
                                    s.data.forEach((v,i)=>{
                                        list.push({icon:defaultIcon,text:v.specialname,_id:v.specialid})
                                    })
                                    add()
                                })
                            }else {
                                add()
                            }
                            function add() {
                                musicOptions({
                                    list:list,
                                    title:'添加到歌单',
                                    handle:(item,index)=>{
                                        console.log(item)
                                        _this.post('/api/music/add',{
                                            remark:_this.item.remark,
                                            filename:_this.item.filename,
                                            hash:_this.item.hash,
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
                        {icon:zjIcon,text:'专辑：'+(this.item.remark?this.item.remark:this.item.filename)},
                    ]
                }
                var musicOption =  musicOptions({
                    list:listOption,
                    title:'歌曲 : '+this.item.filename,
                    handle:function (item,index) {}
                })

                function sheet() {
                    sheetAdded({
                        direction:'bottom',
                        scope:_this.musicInfo,
                        success(data){
                            _this.post('/api/music/add',{
                                remark:_this.item.remark,
                                filename:_this.item.filename,
                                hash:_this.item.hash,
                                sheets:data.data._id,
                            },(s)=>{
                                Toast({message:'添加成功！'})
                            })
                        }
                    })
                }
                return
                this.$iosActionSheet({}, [{
                    text: 'title'
                }, {
                    text: 'title1',
                }]).then(({button, selectedIndex, selectedGroupIndex}) => {
                    console.log(button,selectedIndex,selectedGroupIndex)
                })
            }
        },
        created(){

        },
        components: {}


    }
</script>


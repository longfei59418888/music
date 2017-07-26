<template>
    <div>
        <head-top title="歌单"></head-top>
        <div v-bind:class="sheets['top-box']">
            <div v-bind:class="sheets['box']">
                <div v-bind:class="sheets['left']">
                    <p style="position: absolute;right: 0;top: 0;color: #fff;text-shadow: 0 0 1px #999;width: 100%;text-align: right;
                background: rgba(0,0,0,0.1);padding-right: 0.08rem;">
                        <img style="position: relative;left: -0.04rem;top: .04rem;width: 0.28rem;" src="../image/icon/erji.png" alt="">
                        {{sheetInfo.playcount}}
                    </p>
                    <img v-bind:src="sheetInfo.imgurl |imgSetSize" alt=""></div>
                <div v-bind:class="sheets['right']">
                    <p>{{sheetInfo.specialname}}</p>
                    <div v-if="sheetInfo.username" @click="save()">
                        <p v-if="!isSave"><img src="../image/icon/jia-sheet.png" alt="">添加歌单</p>
                        <p v-if="isSave"><img src="../image/icon/duihao-con.png" alt="">移除歌单</p>
                    </div>
                    <span><img v-if="sheetInfo.username" src="../image/icon/gaunzhu-sheet.png" alt="">{{sheetInfo.username}}</span>
                </div>
            </div>
            <div v-bind:class="sheets['bg2']"></div>
            <div v-bind:style="{backgroundImage:sheetInfoBg}"
                 v-bind:class="sheets['bg']" ></div>
        </div>
        <div style="position: absolute;left: 0;top: 4.5rem;bottom: 1rem;width: 100%;">
            <scroller>
                <div style="padding: 0.2rem;margin-top: 0.2rem;border-bottom: 1px solid #f6f6f6">
                    <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>{{sheetInfo.specialname}}</p>
                </div>
                <div v-bind:class="styles['index-news']">
                    <ul>
                        <li v-for="(item,key) in musicLists">
                            <musicList v-bind:list="musicLists" v-bind:item="item" v-bind:index="key+1" @deleted="deleted"></musicList>
                        </li>
                    </ul>
                    <div style="height: .6rem;"></div>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
    import {bind_getPushMessage} from '../lib/utils/appUtil'
    import headTop from './unit/header.vue'
    import musicList from './unit/musicList.vue'
    import config from '../config/index'
    import toast from './units/toast'
    export default {
        data () {
            return {
                styles:require('../style/scss/index.scss'),
                sheets:require('../style/sheet/index.scss'),
                musicLists:[],
                isSave:false
            }
        },
        computed:{
            transitionName(){
                return this.$store.state.transitionName.nav
            },
            sheetInfo(){
                return this.$store.state.currentSheet
            },
            sheetInfoBg(){return 'url('+this.$store.state.currentSheet.imgurl.replace('{size}',400)+')'},
        },
        watch: {},
        methods:{
            deleted(index){
                this.musicLists.splice(index,1)
                toast({message:'删除成功！'})
            },
            getList(){
                var _this = this;
                var id=this.$route.params.id?this.$route.params.id:this.$route.params.type,
                    _this=this,type = this.$route.params.type
                if(type){
                    this.post('/api/music/find',{sheets:type},(rst)=>{
                        _this.musicLists = rst.data
                    })

                }else {
                    this.$ajax.get(config.url.sheetMusicList,{params:{id:id}})
                        .then(function (rst) {
                            _this.musicLists = rst.data
                        })
                }

                this.post('/api/sheet/issave',{
                    specialid:this.$route.params.id,
                },(data)=>{
                    if(data.data.isSave){
                        _this.isSave=true
                    }else {
                        _this.isSave=false
                    }
                },()=>{})
            },
            save(){
                var _this = this;
                if(!_this.isSave){
                    console.log(this.sheetInfo)
                    this.post('/api/sheet/add',{
                        specialid:this.$route.params.id,
                        imgurl:this.sheetInfo.imgurl,
                        specialname:this.sheetInfo.specialname,
                    },()=>{
                        _this.isSave=true
                        toast({message:'添加歌单成功!'})
                    },()=>{})
                }else {
                    console.log(this.$route.params.id)
                    this.post('/api/sheet/delete',{specialid:this.$route.params.id},()=>{
                        _this.isSave=false
                        toast({message:'移除歌单成功!'})
                    },()=>{})
                }
            }
        },
        created(){
            var id=this.$route.params.id?this.$route.params.id:this.$route.params.type
            if(id == this.$store.state.sheetSingleList.id){
                this.musicLists = this.$store.state.sheetSingleList.list
                return
            }
            this.getList()
        },
        components: {
            headTop,
            musicList
        }


    }
</script>



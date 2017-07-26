<template>
    <div>
        <head-top style="position: relative;z-index: 999" v-bind:class="styles['common_backgroundGradient']" title="歌曲列表"></head-top>
        <div style="position: absolute;left: 0;top: 0;bottom: 1rem;width: 100%;">
            <scroller
                    ref="my_scroller"
                    :on-infinite="finishInfiniteData">
                <div v-bind:class="styles['box-top']" style="height: 4.6rem;overflow: hidden">
                    <div v-bind:class="styles['img-box']">
                        <img style="position: relative;top: -.6rem;"
                             v-bind:src="singleInfo.imgurl | imgSetSize" alt=""></div>
                    <div v-bind:class="styles['save']">
                        <p @click="save()" v-if="!isSave"><img src="../image/icon/jia-sheet.png" alt="">关注歌手</p>
                        <p @click="save()" v-if="isSave"><img src="../image/icon/duihao-con.png" alt="">取消关注</p>
                        <p @click="goInfo()">歌手信息</p>
                    </div>
                </div>
                <div style="padding: .3rem;border-bottom: 1px solid #fafafa">
                    <p><img src="../image/icon/jieshao.png" style="width: .24rem;margin-right: .1rem;position: relative;
                    top: 0.02rem;" alt="">{{singleInfo.profile|setTextSize(60)}}</p>
                </div>
                <div v-bind:class="styles['index-news']">
                    <ul>
                        <li v-for="(item,key) in musicLists">
                            <musicList v-bind:list="musicLists" v-bind:item="item" v-bind:index="key+1"></musicList>
                        </li>
                    </ul>
                    <div style="height: .6rem;">
                    </div>
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
    export default {
        data () {
            return {
                styles:require('../style/scss/index.scss'),
                musicLists:[],
                index:1,
                isSave:false,
                singleInfo:{
                    imgurl:'',
                    profile:''
                }
            }
        },
        computed:{},
        watch: {},
        methods:{
            finishInfiniteData(done){
                var id=this.$route.params.id,_this=this;
                setTimeout(function () {
                        _this.$ajax.get('http://m.kugou.com/singer/info/?singerid='+id+'&page='+_this.index+'&json=true')
                            .then(function (rst) {
                                _this.singleInfo=rst.data.info
                                _this.musicLists = _this.musicLists.concat(rst.data.songs.list)
                                _this.index++
                                _this.$store.commit('setSingleMusicList',{
                                    index:_this.index,
                                    list:_this.musicLists,
                                    id:id,
                                    info: _this.singleInfo
                                })
                                _this.$refs.my_scroller.finishInfinite(true);
                            })  .catch(function(err){
                            if(_this.index>1){
                                _this.$refs.my_scroller.finishInfinite(true);
                                return
                            }
                            _this.$ajax.get(config.url.singleMusicList,{params:{type:id,pageIndex:_this.index}})
                                .then(function (rst) {
                                    _this.singleInfo=rst.data.info
                                    _this.musicLists = _this.musicLists.concat(rst.data.list)
                                    _this.index++
                                    _this.$store.commit('setSingleMusicList',{
                                        index:_this.index,
                                        list:_this.musicLists,
                                        id:id,
                                        info: _this.singleInfo
                                    })
                                    _this.$refs.my_scroller.finishInfinite(true);
                                })  .catch(function(err){
                                console.log(err);
                            })
                        })

                },1000)
            },
            save(){
                var _ = this;
                if(_.isSave){
                    _.post('/api/single/delete',{singerid:this.$route.params.id},(s)=>{
                        _.isSave=0
                    })
                }else {
                    _.post('/api/single/add',{
                        singername:_.singleInfo.singername,
                        imgurl:_.singleInfo.imgurl,
                        singerid:this.$route.params.id
                    },(s)=>{
                        _.isSave=1
                    })
                }
            },
            goInfo(){
                this.$router.push({name:'_single-id',params:{id:this.singleInfo.singerid}})
            }
        },
        created(){
            var _this = this;
            this.post('/api/single/issave',{singerid:this.$route.params.id},(rst)=>{
                _this.isSave=rst.data.isSave
            })
            if(this.$store.state.singleMusicList.id !=this.$route.params.id ){
                this.musicLists=[],this.index=1
                return
            }
            if(this.$store.state.singleMusicList.list.length>0){
                this.musicLists=this.$store.state.singleMusicList.list
                this.index=this.$store.state.singleMusicList.index
                this.singleInfo=this.$store.state.singleMusicList.info
            }
        },
        components: {
            headTop,
            musicList
        }


    }
</script>



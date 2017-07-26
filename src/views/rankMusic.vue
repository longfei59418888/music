<template>
    <div>
        <head-top title="排行榜"></head-top>
        <div v-bind:class="sheets['top-box']">
            <div v-bind:class="sheets['box']">
                <div v-bind:class="sheets['left']">
                    <img v-bind:src="sheetInfo.imgurl" alt="" style="border-radius: .1rem;"></div>
                <div v-bind:class="sheets['right']" style="padding-top: .2rem;">
                    <span style="height: auto;display: block" v-for="item in typeInfo">{{item}}</span>
                </div>
            </div>
            <div v-bind:class="sheets['bg2']"></div>
            <div v-bind:style="{backgroundImage:sheetInfoBg}"
                 v-bind:class="sheets['bg']" ></div>
        </div>
        <div style="position: absolute;left: 0;top: 4.5rem;bottom: 1rem;width: 100%;">
            <scroller
                ref="my_scroller"
                :on-infinite="getLists"
            >
                <div style="padding: 0.2rem;margin-top: 0.2rem;border-bottom: 1px solid #f6f6f6">
                    <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>{{sheetInfo.title}}</p>
                </div>
                <div v-bind:class="styles['index-news']">
                    <ul>
                        <li v-for="(item,key) in sList">
                            <musicList v-bind:item="item" v-bind:list="sList" v-bind:index="key+1"></musicList>
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
                sheets:require('../style/sheet/index.scss'),
                typeInfo:[],
                sList:[],
                index:1,
                sheetInfo:{}
            }
        },
        computed:{
            sheetInfoBg(){return 'url('+this.sheetInfo.imgurl+')'},
        },
        watch: {},
        methods:{
            getLists(done){
                var id=this.$route.params.id,_this=this
                var rankList = this.$store.state.rankList;
                rankList.forEach((v,i)=>{if(v.id==id){this.sheetInfo = v;}})
                setTimeout(() => {
                    _this.$ajax.get(config.url.musicList,{params:{type:id,pageIndex:_this.index}})
                        .then(function (rst) {
                            _this.typeInfo = _this.setInfo(rst.data.info.intro)
                            _this.sList = _this.sList.concat(rst.data.songs.list)
                            _this.index++
                            _this.$store.commit('setRankMusicList',{
                                list:_this.sList,
                                index:_this.index,
                                id:id,
                                typeInfo:_this.typeInfo,
                                sheetInfo:_this.sheetInfo,
                            })
                            done()
                        })
                }, 500)
            },
            setInfo(info){
                var list = []
                var index = info.indexOf('排序方式');
                var index2 = info.indexOf('更新周期');
                list.push(info.slice(0,index))
                list.push(info.slice(index2))
                list.push(info.slice(index,index2))
                return list
            }
        },
        created(){
            if(this.$store.state.rankMusicList.id != this.$route.params.id){
                this.sList=[],this.index=1
                return
            }
            console.log(this.$store.state.rankMusicList.list)
            if(this.$store.state.rankMusicList.list.length>0){
                this.sList=this.$store.state.rankMusicList.list
                this.index=this.$store.state.rankMusicList.index
                this.typeInfo=this.$store.state.rankMusicList.typeInfo
                this.sheetInfo=this.$store.state.rankMusicList.sheetInfo
            }

        },
        components: {
            headTop,
            musicList
        }


    }
</script>




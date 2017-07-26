<template>
    <div>
        <head-top style="background-color: #D33C33" title="歌手信息" right="true"></head-top>
        <div  v-bind:class="list['list-top']">
            <p><img v-bind:src="singleInfo.imgurl | imgSetSize" alt=""></p>
            <div>
                <p><img src="../image/icon/jingping-index.png" alt="">歌手信息</p>
                <span>{{singleInfo.singername}}</span>
            </div>
        </div>
        <div style="font-size: .28rem;color: #666;padding: 0 .3rem;margin: .2rem 0;">
            <div v-html="singleInfo.intro"></div>
        </div>
    </div>
</template>
<script>
    import {bind_getPushMessage} from '../lib/utils/appUtil'
    import headTop from './unit/header.vue'
    import config from '../config/index'
    export default {
        data () {
            return {
                styles: require('../style/scss/index.scss'),
                list:require('../style/find/sheetList.scss'),
                singleInfo:{
                    singername:'xuzhiq',
                    imgurl:'',
                    intro:''
                }
            }
        },
        computed: {},
        watch: {},
        methods: {
            getInfo(){
                var id=this.$route.params.id,_this=this;
                _this.$ajax.get('http://m.kugou.com/singer/info/?singerid='+id+'&page=1&json=true')
                    .then(function (rst) {
                        _this.singleInfo=rst.data.info
                        _this.singleInfo.intro=_this.singleInfo.intro.replace(/\n/g,'<br>');
                    }).catch(function(err){
                    _this.$ajax.get(config.url.singleMusicList,{params:{type:id,pageIndex:1}})
                        .then(function (rst) {
                            _this.singleInfo=rst.data.info
                            _this.singleInfo.intro=_this.singleInfo.intro.replace(/\n/g,'<br>');
                        })  .catch(function(err){
                        console.log(err);
                    })
                })
            }
        },
        created(){
            if(this.$route.params.id != this.$store.state.singleMusicList.id){
                this.getInfo()
                return
            }
            if(this.$store.state.singleMusicList.list.length>0){
                this.singleInfo=this.$store.state.singleMusicList.info
                this.singleInfo.intro=this.singleInfo.intro.replace(/\n/g,'<br>');
            }
        },
        components: {
            headTop
        }
    }
</script>

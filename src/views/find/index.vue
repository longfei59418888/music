<template>
    <div v-bind:class="styles['scroller']">
        <scroller >
            <div v-bind:class="styles['banner']">
                <div v-bind:class="styles['bg']" ></div>
                <carousel-3d
                        @after-slide-change="onAfterSlideChange"
                        :autoplay-timeout="5000"
                        :autoplay="true"
                        :width="320"
                        :height="125">
                    <slide v-for="(slide,key) in slides" :index="key" :key="slide">
                        <img style="height:100%;" v-bind:src="slide">
                    </slide>
                </carousel-3d>
                <div v-bind:class="styles['dots']">
                    <span v-bind:class="[slideIndex==key  ? styles['active'] : '']" :key="slide" v-for="(slide,key) in slides"></span>
                </div>
            </div>
            <div v-bind:class="styles['banner-nav']">
                <div>
                    <router-link :to="{name:'rank-music-id',params:{id:27}}">
                        <div v-bind:class="styles['banner-nav-box']">
                            <div><img src="../../image/icon/index-new.png" alt=""></div>
                            <p>华语新歌榜</p>
                        </div>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'single-music-id',params:{id:88}}">
                        <div v-bind:class="styles['banner-nav-box']">
                            <div><img src="../../image/icon/index-renmen.png" alt=""></div>
                            <p>最热歌手榜</p>
                        </div>
                    </router-link>
                </div>
                <div>
                    <router-link :to="{name:'rank-music-id',params:{id:6666}}">
                        <div v-bind:class="styles['banner-nav-box']">
                            <div><img src="../../image/icon/biaosheng_index.png" alt=""></div>
                            <p>音乐飙升榜</p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div v-bind:class="styles['index-gedan']">
                <top  title="推荐歌单" url="/find/sheet" v-bind:img="imgUrl_1"></top>
                <ul>
                    <li v-for="item in indexSheetList">
                        <sheetList
                                v-bind:imgurl="item.imgurl"
                                v-bind:num="item.playcount"
                                v-bind:sid="item.specialid"
                                v-bind:item="item"
                                v-bind:title="item.specialname">
                        </sheetList>
                    </li>
                </ul>
            </div>
            <div v-bind:class="styles['index-news']">
                <top style="padding: 0 .2rem;" title="最新歌曲" v-bind:url="{name:'rank-music-id',params:{id:27}}" v-bind:img="imgUrl_2"></top>
                <ul>
                    <li v-for="(item,key) in indexNewList">
                        <musicList v-bind:item="item" v-bind:list="indexNewList" v-bind:index="key"></musicList>
                    </li>
                </ul>
                <div v-bind:class="styles['index-news-more']">
                    <router-link to="/find/rank"><p>更多精彩，一起去看排行榜吧！</p></router-link>
                </div>
            </div>
        </scroller>
    </div>
</template>

<script>
    import cheerio from 'cheerio'
    import config from '../../config/index'
    import {bind_getPushMessage} from '../..//lib/utils/appUtil'
    import { Carousel3d, Slide } from 'vue-carousel-3d';
    import findNav from '../unit/findNav.vue'
    import Top from '../unit/indexTop.vue'
    import sheetList from '../unit/songSheet.vue'
    import musicList from '../unit/musicList.vue'
    import imgUrl_1 from '../../image/icon/index-gedan.png'
    import imgUrl_2 from '../../image/icon/index-guangpan.png'
    export default {
        data () {
            return {
                styles:require('../../style/scss/index.scss'),
                imgUrl_1:imgUrl_1,
                imgUrl_2:imgUrl_2,
                slideIndex:0
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='_find_index'){
                    this.$store.commit('setGobalNavIndex_1',1)
                }
            }
        },
        computed:{
            slides(){
                return this.$store.state.indexBannerList_1
            },
            indexSheetList(){
                return this.$store.state.indexSheetList_1
            },
            indexNewList(){
                return this.$store.state.indexNewList_1
            }
        },
        methods:{
            onAfterSlideChange(index){
                this.slideIndex = index;
            },
            refresh (done) {
                var _this = this;
                setTimeout(() => {
                    console.log(_this)
                    //重新可以无限滚动
                    _this.$refs.my_scroller.finishInfinite(false)
                    done();
                }, 1500)
            },
            infinite (done) {
                var _this = this;
                setTimeout(() => {
                    //重新禁止滚动
                    _this.$refs.my_scroller.finishInfinite(true)
                }, 1500)
            }
        },
        created(){
            var _this = this;
            _this.$ajax.get(config.url.sheetList,{params:{pageIndex:1}})
                    .then(function (response) {
                        _this.$store.commit('getIndexSheetList_1',response.data.plist.list.info)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            _this.$ajax.get(config.url.musicList,{params:{pageIndex:1,type:27}})
                    .then(function (response) {
                        _this.$store.commit('getIndexNewList_1',response.data.songs.list)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            _this.$ajax.get(config.url.findIndexBanner)
                    .then(function (response) {
                        _this.$store.commit('setIndexBannerList_1',response.data)
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        },
        components: {
            Carousel3d,
            Slide,
            findNav,
            Top,
            musicList,
            sheetList
        }


    }
</script>
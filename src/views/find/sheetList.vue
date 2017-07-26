<template>
    <div v-bind:class="styles['scroller']">
        <scroller
            ref="my_scroller"
            :on-infinite="finishInfiniteData">
            <div v-on:click="goSheet()" v-bind:class="list['list-top']">
                <p><img v-bind:src="firstItem.imgurl | imgSetSize" alt=""></p>
                <div>
                    <p><img src="../../image/icon/jingping-index.png" alt="">最热歌单</p>
                    <span>{{firstItem.specialname}}</span>
                    <div><img src="../../image/icon/jiantou-right.png" alt=""></div>
                </div>
            </div>
            <div v-bind:class="list['index-gedan']">
                <ul>
                    <li v-for="item in lists">
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
        </scroller>
    </div>
</template>
<style>

</style>
<script>
    var data = {
        styles:require('../../style/scss/index.scss'),
        list:require('../../style/find/sheetList.scss'),
        firstItem:{imgurl:'http://imge.kugou.com/soft/collection/400/20170614/20170614102329868873.jpg'}
    }
    import sheetList from '../unit/songSheet.vue'
    import config from '../../config/index'
    export default {
        name: 'app',
        data: function () {
            return data;
        },
            components: {
            sheetList
        },
        computed:{
            lists(){
                return this.$store.state.findSheetList.list;
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='_find_sheet'){
                    this.$store.commit('setGobalNavIndex_1',2)
                }
            }
        },
        created(){
            this.$store.commit('setGobalNavIndex_1',2)
        },
        methods: {
            goSheet(){
                this.$store.commit('setCurrentSheet',this.firstItem)
                this.$router.push({ name: 'sheet-info-id', params: { id: this.firstItem.specialid }})
            },
            finishInfiniteData(done){
                var index = this.$store.state.findSheetList.pageIndex,_this = this;
                setTimeout(() => {
                    _this.$ajax.get(config.url.sheetList,{params:{pageIndex:index}})
                            .then(function (response) {
                                var data= response.data.plist.list.info;
                                if(index==1){
                                    _this.firstItem=data[0]
                                    data = data.slice(2)
                                }
                                _this.$store.commit('setFindSheetList',data)
                                _this.$refs.my_scroller.finishInfinite(true);
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                }, 500)


            }
        }
    }
</script>
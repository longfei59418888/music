<template>
    <div v-bind:class="styles['scroller']">
        <head-top :title="title" style="background: #D33C33;position: relative;z-index: 999;"></head-top>
        <div style="padding: 0.2rem;border-bottom: 1px solid #f6f6f6">
            <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>{{singleItem.title}}</p>
        </div>
        <scroller style="top: 2.25rem;"
                  ref="my_scroller"
                  :on-infinite="finishInfiniteData">
            <div v-bind:class="list['index-gedan']">
                <ul>
                    <li v-for="item in sList">
                        <sheetList
                                v-bind:imgurl="item.imgurl"
                                v-bind:sid="item.singerid"
                                v-bind:num="item.playcount"
                                v-bind:title="item.singername">
                        </sheetList>
                    </li>
                </ul>
            </div>
            <div style="height: .8rem;"></div>
        </scroller>
    </div>
</template>
<style>

</style>
<script>
    import sheetList from './unit/songSheet.vue'
    import config from '../config/index'
    import headTop from './unit/header.vue'
    export default {
        name: 'app',
        components: {
            sheetList,
            headTop
        },
        data: function () {
            return {
                styles:require('../style/scss/index.scss'),
                list:require('../style/find/sheetList.scss'),
                sList:[],
                index:1
            };
        },
        computed:{
            singleItem(){
                if(!this.$route.params.id){
                    return {title:'音乐'}
                }
                var item = {}
                this.$store.state.singleType.forEach((v)=>{
                    if(v.id == this.$route.params.id){
                        item = v
                    }
                })
                return item
            },
            title(){
                return this.$route.params.id ? '歌手':'关注歌手'
            }
        },
        watch: {},
        created(){
            if(!this.$route.params.id){
                return
            }
            if(this.$route.params.id != this.$store.state.singleList.id){
                this.sList=[],this.index=1
                return
            }
            if(this.$store.state.singleList.list.length>0){
                this.sList=this.$store.state.singleList.list,this.index=this.$store.state.singleList.pageIndex
            }
        },
        methods: {
            finishInfiniteData(done){
                var _this = this;
                if(!this.$route.params.id){
                    setTimeout(function () {
                        _this.post('/api/single/find',{},(s)=>{
                            console.log(s)
                            _this.sList = _this.sList.concat(s.data)
                            _this.index ++ ;
                            if(s.data.length<20){
                                _this.$refs.my_scroller.finishInfinite(true)
                            }else {
                                _this.$refs.my_scroller.finishInfinite(false)
                            }
                        })
                    },1000)
                    return
                }
                if(_this.index>1){
                    this.$refs.my_scroller.finishInfinite(true);
                    return
                }
                setTimeout(function () {
                    _this.$ajax.get(config.url.singleList,{params:{type:_this.$route.params.id,pageIndex:_this.index}})
                        .then(function (response) {
                            _this.sList=_this.sList.concat(response.data.singers.list.info);
                            _this.index++
                            _this.$store.commit('setSingleList',{
                                list:_this.sList,
                                pageIndex:_this.index,
                                id:_this.$route.params.id
                            })
                            done()
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                },1000)
            }
        }
    }
</script>
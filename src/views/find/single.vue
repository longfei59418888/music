<template>
    <div v-bind:class="styles['scroller']">
        <scroller>
           <div v-bind:class="list['single-type']">
               <ul>
                   <li v-for="item in lists">
                       <router-link
                       :to="{ name: 'single-music-id', params: { id: item.id }}">
                           <img v-bind:src="item.imgurl" alt="">
                           <p>{{item.title}}</p>
                       </router-link>
                   </li>
               </ul>
           </div>
            <div style="padding: 0.2rem;margin-top: 0.6rem;border-bottom: 1px solid #f6f6f6">
                <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>热门歌手</p>
            </div>
            <div v-bind:class="list['index-gedan']">
                <ul>
                    <li v-for="item in sList">
                        <sheetList
                                v-bind:imgurl="item.imgurl"
                                v-bind:sid="item.singerid"
                                v-bind:title="item.singername">
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
    import sheetList from '../unit/songSheet.vue'
    import config from '../../config/index'
    export default {
        name: 'app',
        components: {
            sheetList
        },
        data: function () {
            return {
                styles:require('../../style/scss/index.scss'),
                list:require('../../style/find/sheetList.scss'),
                sList:[],
            };
        },
        computed:{
            lists(){
                return  this.$store.state.singleType;
            }
        },
        watch: {
            '$route' (to, from) {
                if(to.name=='_find_single'){
                    this.$store.commit('setGobalNavIndex_1',4)
                }
            }
        },
        created(){
            var _this = this;
            this.$store.commit('setGobalNavIndex_1',4)
            _this.$ajax.get(config.url.singleList,{params:{type:88,pageIndex:1}})
                    .then(function (response) {
                        _this.sList=response.data.singers.list.info.slice(0,20);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
        },
        methods: {}
    }
</script>
<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div  v-bind:class="styles['h-scan']"></div>
            <div v-bind:class="styles['title']">我的音乐</div>
            <div v-bind:class="[styles['h-i']]" @click="edit()" style="color: #fff">新建歌单</div>
        </div>
        <div v-bind:class="list['single-type']">
            <ul>
                <li style="width: 33.33%">
                    <router-link :to="{name:'_mine_music-list-type',params:{type:1}}">
                        <img :src="allIcon" alt="">
                        <p>全部歌曲</p>
                    </router-link>
                </li>
                <li style="width: 33.33%">
                    <router-link :to="{name:'_mine_music-list-type',params:{type:2}}">
                        <img :src="saveIcon" alt="">
                        <p>我喜欢</p>
                    </router-link>
                </li>
                <li style="width: 33.33%">
                    <router-link :to="{name:'_mine_single-list'}">
                        <img :src="nearIcon" alt="">
                        <p>关注歌手</p>
                    </router-link>
                </li>
            </ul>
        </div>

        <div style="padding: 0.2rem;margin-top: 0.2rem;">
            <p style="font-size: .32rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
                margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>我的歌单</p>
            <ul style="margin-top: .1rem;padding-top: .2rem;">
                <li v-for="(item,key) in sheetList">
                    <items @deleted="deleted" :item="key">
                        <sheetLists v-bind:item="item"  v-bind:index="key"></sheetLists>
                    </items>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import allIcon from '../../image/icon/music22.png'
    import saveIcon from '../../image/icon/music-save.png'
    import nearIcon from '../../image/icon_rank/geshou_1.png'
    import sheetLists from '../unit/mineSheet.vue'
    import { Confirm } from '../units/popup'
    import  items  from '../units/item.vue'
    import  { sheetAdded }  from '../units/modal'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                list:require('../../style/find/sheetList.scss'),
                nearIcon:nearIcon,
                saveIcon:saveIcon,
                allIcon:allIcon,
                sheetList:[]
            }
        },
        computed: {},
        watch: {},
        methods: {
            getList(){
                this.post('/api/sheet/find',{},(s)=>{
                    this.sheetList=s.data.slice(1)
                })
            },
            deleted(index){
                var _this = this;
                Confirm({
                    message:'是否要删除该歌单？',
                    success:function () {
                        _this.post('/api/sheet/delete',{specialid:_this.sheetList[index].specialid},(s)=>{
                            _this.sheetList.splice(index,1)
                        })
                    }
                })
            },
            edit(){
                var _this = this;
                sheetAdded({
                    direction:'bottom',
                    scope:{},
                    success(data){
                        _this.post('/api/sheet/find',{},(s)=>{
                            _this.sheetList=s.data.slice(1)
                        })
                    }
                })
            }
        },
        created(){
            this.$store.commit('setGobalNavIndex_2',2)
            this.getList()
        },
        components: {
            sheetLists,
            items
        }
    }
</script>

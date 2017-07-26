<template>
    <div>
        <div v-bind:class="styles['header-index']">
            <div v-on:click="back()"  v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['search']">
                <div style="background-color: #fff;border-radius: .05rem;margin-top: .17rem;height: .56rem;margin-right: .2rem;overflow: hidden;
                    padding-left: .6rem;position: relative;padding-right: .8rem;">
                    <img style="position: absolute;left: .15rem;top: .12rem;
                " src="../image/icon/h-search.png" alt="">
                    <input v-model="keyword" style="width: 100%;height: .56rem;line-height: .56rem;border: none;" type="text">
                    <span @click="search" style="position: absolute;right: 0;height: .56rem;border-left:1px solid  #D33C33;top: 0;margin: 0;border-radius: .05rem;
                    width: .8rem;color: #666;">搜索</span>
                </div>
            </div>
        </div>
        <div style="position: absolute;top: 1.4rem;bottom: 0;width: 100%;">
            <scroller>
                <div v-bind:class="styles['index-news']">
                    <ul>
                        <li v-for="(item,key) in list">
                            <musicList v-bind:item="item" v-bind:list="list" v-bind:index="key"></musicList>
                        </li>
                    </ul>
                </div>
            </scroller>
        </div>
    </div>
</template>
<script>
    import musicList from './unit/musicList.vue'
    export default {
        data () {
            return {
                styles: require('../style/scss/index.scss'),
                keyword:'',
                index:1,
                list:[]
            }
        },
        computed: {},
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            search(){
                var _this = this;
                this.post('/search',{
                    keyword:_this.keyword,
                    page:_this.index
                },(s)=>{
                    _this.list=eval(s.data).data.info
                })
                function kgJSONP872909246(data) {
                    return data
                }
            }
        },
        created(){

        },
        components: {
            musicList
        }
    }
</script>

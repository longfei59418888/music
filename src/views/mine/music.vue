<template>
    <div>
        <div style="background:#D33C33" v-bind:class="styles['header-index']">
            <div v-on:click="back" v-bind:class="styles['h-scan']">
                <img style="width: .48rem;" src="../../image/icon/jiantou-left.png" alt="">
            </div>
            <div v-bind:class="styles['title']">{{title}}</div>
            <div v-bind:class="[styles['h-i']]" style="color: #fff"></div>
        </div>
        <p style="font-size: .32rem;padding: 0 .2rem;margin-top: .2rem;"><i style="height: .30rem;display: inline-block;width: .1rem;
        margin-right: 0.1rem;background-color: #D33C33;position: relative;top: 0.03rem;"></i>音乐</p>
        <div style="position: absolute;left: 0;top: 2.23rem;bottom: 1rem;width: 100%;">
            <scroller
                    ref="my_scroller"
                    :on-infinite="getLists"
            >
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
    import musicList from '../unit/musicList.vue'
    import Toast from '../units/toast'
    export default {
        data () {
            return {
                styles: require('../../style/scss/index.scss'),
                musicLists:[],
                index:1,
            }
        },
        computed: {
            title(){
                return this.$route.params.type == 1 ? '全部音乐':'我喜欢'
            }
        },
        watch: {},
        methods: {
            back(){
                this.$router.back();
            },
            deleted(index){
                this.musicLists.splice(index,1)
                Toast({message:'删除成功！'})
            },
            getLists(done){
                var _this =  this;
                setTimeout(() => {
                    var data = {page:_this.index}
                    if(_this.$route.params.type==2){
                        data['sheets']='100000000000'
                    }
                    _this.post('/api/music/find',data,(s)=>{
                        _this.musicLists = _this.musicLists.concat(s.data)
                        _this.index ++ ;
                        if(s.data.length<20){
                            _this.$refs.my_scroller.finishInfinite(true)
                        }else {
                            _this.$refs.my_scroller.finishInfinite(false)
                        }
                    })
                }, 500)
            }
        },
        created(){
        },
        components: {
            musicList
        }
    }
</script>

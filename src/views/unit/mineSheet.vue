<template>
    <div style="position: relative;height: 1.2rem;margin-left: 1.3rem;
    padding-right: .2rem;border-bottom: 1px solid #EDEEEF;" :style="{borderTop:index==0?'1px solid #EDEEEF':''}" v-on:click="playMusic()">
        <i  style="position: absolute;top: 0;height: 1rem;right: 100%;line-height: .9rem;font-size: .3rem;color: #aaa;
        width: 1.3rem;display: inline-block;font-style: normal;">
            <img style="width: 1.10rem;margin-bottom: .05rem" :src="item.imgurl | imgSetSize" alt="">
        </i>
        <div  style="float: left;width: 75%">
            <p style="color: #000;font-size: .28rem;margin-top: .14rem;height: .32rem;overflow: hidden"><span>{{item.specialname}}</span></p>
            <p style="color: #aaa;font-size: .2rem;
            padding-left: .02rem;height: .3rem;overflow: hidden;margin-top: .08rem;"><span>我的歌单</span></p>
        </div>
        <div style="float: left;width: 25%;text-align: right;">
            <p style="width: .7rem;height: .44rem;text-align: center;border-radius: .1rem;display: inline-block;
            margin-top: .3rem;opacity: .6"><img style="width: .44rem;" src="../../image/option/jiantou-left.png" alt=""></p>
        </div>
        <div style="clear: both"></div>
    </div>
</template>

<script>
    export default {
        props:['item','index'],
        data () {
            return {
                sheetList:[],
                musicInfo:{},
            }
        },
        methods: {
            playMusic(){
                this.$store.commit('setCurrentSheet',this.item)
                if(this.item.type==2){
                    this.$router.push({ name: '_mine_sheet-info', params: { type: this.item.specialid }})
                }else {
                    this.$router.push({ name: 'sheet-info-id', params: { id: this.item.specialid }})
                }

            },
        },
        created(){},
        components: {}


    }
</script>


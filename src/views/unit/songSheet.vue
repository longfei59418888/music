<template>
    <div>
        <div v-on:click="goInfo()">
            <div v-bind:style="{position:'relative',height:height?height:'auto',overflow:'hidden'}">
                <img v-bind:src="imgurl | imgSetSize" style="width:100%;" alt="">
                <p v-if="num" style="position: absolute;right: 0;top: 0;color: #fff;text-shadow: 0 0 1px #999;width: 100%;text-align: right;
                background: rgba(0,0,0,0.1);padding-right: 0.08rem;">
                    <img style="position: relative;left: -0.04rem;top: .04rem;width: 0.28rem;" src="../../image/icon/erji.png" alt="">
                    {{num?(num.length>10000?parseInt(num/1000)/10:num):0}}
                </p>
            </div>
            <p style="font-size:.24rem;color: #000;height: .64rem;overflow: hidden;left: .32rem;">{{title}}</p>
        </div>
    </div>
</template>

<script>

    export default {
        props:['num','title','height','imgurl','sid','item'],
        data () {
            return {}
        },
        methods: {
            goInfo(){
                if(!this.item){
                    this.$router.push({ name: 'single-music-list-id', params: { id: this.sid }})
                    return
                }
                this.$store.commit('setCurrentSheet',this.item)
                this.$router.push({ name: 'sheet-info-id', params: { id: this.sid }})
            }
        },
        created(){

        },
        components: {}
    }
</script>


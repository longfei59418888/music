<template>
    <div  @click="goInfo" style="overflow: hidden;padding: .2rem 0;border-bottom: 1px solid #efefef;margin: 0 .2rem;">
        <div v-if="type" style="width: 27%;height: 1.5rem;float: left">
            <img :src="item.imgsrc" style="width: 100%;" alt="">
        </div>
        <div style="width:72%;float: left;padding-left: .2rem;" :style="{width:type?'72%':'100%'}">
            <p style="font-size: .32rem;color: #666;">{{item.title | setTextSize(120)}}</p>
            <p style="color: #aaa;overflow: hidden;margin-top: .12rem;">{{item.ptime}}
                <span style="float: right"><img style="width: .32rem;position: relative;top: .04rem;left: -.1rem;" :src="yueIcon" alt="">{{item.commentCount}}</span></p>
        </div>
    </div>
</template>
<script>
    import yueIcon from '../../image/icon/yeudu.png'
    export default {
        props:['item','index'],
        data () {
            return {yueIcon:yueIcon}
        },
        computed: {
            type(){
                return this.item.imgsrc.length>0?true:false
            }
        },
        watch: {},
        methods: {
            goInfo(){
                this.$store.commit('setCurrentNews',Object.assign({},{index:this.index},this.item))
                this.$router.push({name:'_news_info'})
            }
        },
        created(){

        },
        components: {
        }
    }
</script>

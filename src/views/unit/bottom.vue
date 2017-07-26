/**
* Created by DELL on 2017/6/6.
*/
<template>
        <div  v-bind:class="styles.tab">
            <div  v-bind:class="styles.bg"></div>
            <div v-bind:class="styles['tab-box']">
                <div  v-bind:class="[styles['tab-index'],currentIndex==1?styles['active']:'']" >
                    <a href="/#/find/index"><i></i><p>发现音乐</p></a></div>
                <div v-bind:class="[styles['tab-mine'],currentIndex==2?styles['active']:'']" >
                    <a href="/#/mine/index"><i></i><p>我的音乐</p></a></div>
                <div v-bind:class="[styles['tab-info'],currentIndex==3?styles['active']:'']">
                    <a href="/#/news/index"><i></i><p>音乐资讯</p></a>
                </div>
                <div v-bind:class="[styles['tab-setting'],currentIndex==4?styles['active']:'']">
                    <a href="/#/setting/index"><i></i><p>账户</p></a></div>
            </div>
        </div>
</template>
<script>
    export default {
        data () {
            return {
                styles:require('../../style/music.scss')
            }
        },
       computed:{
           currentIndex(){
               return this.$store.state.gobalNavIndex_2
           }
       }
    }
</script>

